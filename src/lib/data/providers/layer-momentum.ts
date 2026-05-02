/**
 * Layer Momentum — ecosystem layer 단위로 가격·뉴스 모멘텀을 집계.
 *
 * 두 신호를 분리해서 보여준다 (Moore caveat: sentiment ≠ structure):
 * - priceMomentum: layer 안 primary firm들의 1개월 가격 변동률 평균.
 *   Yahoo Finance가 hybrid/live 모드에서 실시간 데이터 공급. mock 모드면
 *   결정적 mock으로 fallback.
 * - newsSentiment: 같은 firm들의 최근 뉴스 헤드라인 sentiment 평균(-1..1).
 *   현재 MOCK_NEWS + keyword heuristic. 추후 실제 뉴스 API 또는 LLM 분석.
 *
 * Phase 자체는 흔들지 않는다 — momentum은 phase 내부 위치 가시화·토론
 * 트리거용일 뿐, 분류 등급에는 영향 없음.
 */

import type { NewsArticle } from "@/types/news";
import type { EcosystemId } from "@/types/ecosystem";
import type { OHLCVCandle, PriceHistory } from "@/types/market";
import { getFirmsByIds } from "./firm-provider";
import { getPriceHistoriesByIds } from "./price-provider";
import { getNewsByFirmId } from "./news-provider";
import { getLayerMemberships } from "./ecosystem-provider";
import { ECOSYSTEMS } from "../mock/ecosystems";

export type Timeframe = "1w" | "4w" | "12w";
export const TIMEFRAMES: Timeframe[] = ["1w", "4w", "12w"];
const TIMEFRAME_DAYS: Record<Timeframe, number> = { "1w": 5, "4w": 21, "12w": 60 };

export interface LayerMomentum {
  ecosystemId: EcosystemId;
  layerId: string;
  /** Default 4-week change averaged over primary firms — kept for back-compat. */
  priceMomentum: number | null;
  /** Multi-timeframe price momentum (1w / 4w / 12w) for UI toggling. */
  priceMomentumByTimeframe: Record<Timeframe, number | null>;
  /** Layer-average normalised price index, last ~60 trading days, base 100. */
  priceSparkline: number[] | null;
  /** Average news sentiment from -1 (all negative) to +1 (all positive). null if no data. */
  newsSentiment: number | null;
  sampleSize: { price: number; news: number };
  /** Per-firm 1M price change for tooltips & detail views. */
  firmPriceChanges: { firmId: string; ticker: string; name: string; change1M: number }[];
  /** Most recent 3 headlines across the layer. */
  recentHeadlines: NewsArticle[];
}

function changeOverDays(candles: OHLCVCandle[], days: number): number | null {
  if (candles.length < days + 1) return null;
  const last = candles[candles.length - 1];
  const past = candles[candles.length - 1 - days];
  if (!last || !past || past.close === 0) return null;
  return (last.close - past.close) / past.close;
}

function avgChangeAcrossFirms(prices: PriceHistory[], days: number): number | null {
  const changes = prices
    .map((p) => changeOverDays(p.candles, days))
    .filter((c): c is number => c !== null && Number.isFinite(c));
  if (changes.length === 0) return null;
  return changes.reduce((a, b) => a + b, 0) / changes.length;
}

/**
 * Layer-average normalised price index, last `days` trading days, base 100.
 * Skips firms with insufficient candles.
 */
function computeSparkline(prices: PriceHistory[], days = 60): number[] | null {
  const usable = prices.filter((p) => p.candles.length >= days + 1);
  if (usable.length === 0) return null;

  const result: number[] = [];
  for (let i = 0; i <= days; i++) {
    let sum = 0;
    let n = 0;
    for (const p of usable) {
      const baseIdx = p.candles.length - days - 1;
      const baseClose = p.candles[baseIdx]?.close;
      const cur = p.candles[baseIdx + i]?.close;
      if (baseClose && cur) {
        sum += (cur / baseClose) * 100;
        n += 1;
      }
    }
    if (n > 0) result.push(Number((sum / n).toFixed(2)));
  }
  return result.length > 0 ? result : null;
}

const NEWS_LOOKBACK_MS = 90 * 24 * 60 * 60 * 1000; // 90 days; mock data spans ~1y so this is loose

export async function getLayerMomentum(
  ecosystemId: EcosystemId,
  layerId: string,
): Promise<LayerMomentum> {
  const memberships = getLayerMemberships(ecosystemId, layerId).filter(
    (m) => m.role === "primary",
  );

  // Scoped fetch — only this layer's firms (5-15 typical), not all 145
  const layerIds = memberships.map((m) => m.firmId);
  const [firms, prices] = await Promise.all([
    getFirmsByIds(layerIds),
    getPriceHistoriesByIds(layerIds),
  ]);
  const firmById = new Map(firms.map((f) => [f.id, f]));
  const priceById = new Map(prices.map((p) => [p.firmId, p]));

  // Price momentum (per-firm sample + multi-timeframe averages)
  const layerPrices: PriceHistory[] = [];
  const firmPriceChanges: LayerMomentum["firmPriceChanges"] = [];
  for (const m of memberships) {
    const firm = firmById.get(m.firmId);
    const price = priceById.get(m.firmId);
    if (!firm || !price) continue;
    layerPrices.push(price);
    firmPriceChanges.push({
      firmId: firm.id,
      ticker: firm.ticker,
      name: firm.name,
      change1M: price.priceChange1M,
    });
  }

  const priceMomentumByTimeframe: Record<Timeframe, number | null> = {
    "1w": avgChangeAcrossFirms(layerPrices, TIMEFRAME_DAYS["1w"]),
    "4w": avgChangeAcrossFirms(layerPrices, TIMEFRAME_DAYS["4w"]),
    "12w": avgChangeAcrossFirms(layerPrices, TIMEFRAME_DAYS["12w"]),
  };
  // Backward-compat default
  const priceMomentum = priceMomentumByTimeframe["4w"];

  const priceSparkline = computeSparkline(layerPrices, TIMEFRAME_DAYS["12w"]);

  // News sentiment — fetch in parallel
  const newsArrays = await Promise.all(
    memberships.map((m) => getNewsByFirmId(m.firmId)),
  );
  const cutoffMs = Date.now() - NEWS_LOOKBACK_MS;
  // mock news 는 실시간이 아니라 cutoff 통과 못 할 수 있음 — 빈 layer는 모든 시기 뉴스 fallback
  let allNews = newsArrays.flat().filter((n) => {
    const ts = new Date(n.publishedAt).getTime();
    return Number.isFinite(ts) && ts >= cutoffMs;
  });
  if (allNews.length === 0) {
    allNews = newsArrays.flat();
  }

  // Prefer continuous sentimentScore (computed by news-provider via weighted
  // keyword + negation heuristic). Fall back to categorical mapping for any
  // legacy article missing the score.
  const sentimentScores: number[] = allNews.map((n) => {
    if (typeof n.sentimentScore === "number") return n.sentimentScore;
    return n.sentiment === "Positive" ? 1 : n.sentiment === "Negative" ? -1 : 0;
  });
  const newsSentiment =
    sentimentScores.length > 0
      ? sentimentScores.reduce((a, b) => a + b, 0) / sentimentScores.length
      : null;

  const recentHeadlines = [...allNews]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 3);

  return {
    ecosystemId,
    layerId,
    priceMomentum,
    priceMomentumByTimeframe,
    priceSparkline,
    newsSentiment,
    sampleSize: { price: firmPriceChanges.length, news: allNews.length },
    firmPriceChanges,
    recentHeadlines,
  };
}

/** Cache key */
function key(ecoId: EcosystemId, layerId: string) {
  return `${ecoId}:${layerId}`;
}

const TTL_MS = 5 * 60 * 1000;
const _cache = new Map<string, { data: LayerMomentum; ts: number }>();

export async function getCachedLayerMomentum(
  ecosystemId: EcosystemId,
  layerId: string,
): Promise<LayerMomentum> {
  const k = key(ecosystemId, layerId);
  const hit = _cache.get(k);
  if (hit && Date.now() - hit.ts < TTL_MS) return hit.data;
  const data = await getLayerMomentum(ecosystemId, layerId);
  _cache.set(k, { data, ts: Date.now() });
  return data;
}

/** Compute momentum for every layer in every ecosystem. */
export async function getAllLayerMomentums(): Promise<LayerMomentum[]> {
  const tasks: Promise<LayerMomentum>[] = [];
  for (const eco of ECOSYSTEMS) {
    for (const layer of eco.layers) {
      tasks.push(getCachedLayerMomentum(eco.id, layer.id));
    }
  }
  return Promise.all(tasks);
}

/**
 * Find layers with the most extreme price momentum (Hot / Cold).
 * Used by the dashboard widget.
 */
export async function getHotColdLayers(top = 3): Promise<{
  hot: LayerMomentum[];
  cold: LayerMomentum[];
}> {
  const all = await getAllLayerMomentums();
  // Require at least 2 firms in the price sample to avoid noise from singleton layers
  const usable = all.filter(
    (m) => m.priceMomentum !== null && m.sampleSize.price >= 2,
  );
  const sorted = [...usable].sort(
    (a, b) => (b.priceMomentum ?? 0) - (a.priceMomentum ?? 0),
  );
  return {
    hot: sorted.slice(0, top),
    cold: sorted.slice(-top).reverse(),
  };
}

// ── Ecosystem-level (macro) momentum ──────────────────────────────────

export interface EcosystemMomentumLayerMover {
  layerId: string;
  layerName: string;
  layerNameKo: string;
  change: number;
}

export interface EcosystemMomentum {
  ecosystemId: EcosystemId;
  /** Default 4w (= priceMomentumByTimeframe["4w"]). */
  priceMomentum: number | null;
  priceMomentumByTimeframe: Record<Timeframe, number | null>;
  priceSparkline: number[] | null;
  newsSentiment: number | null;
  sampleSize: { firms: number; news: number; layers: number };
  /** Layers with the strongest positive 4w move (top 3). */
  topMovers: EcosystemMomentumLayerMover[];
  /** Layers with the strongest negative 4w move (bottom 3, sorted ascending). */
  bottomMovers: EcosystemMomentumLayerMover[];
}

/**
 * Compute macro momentum for one ecosystem — averages every PRIMARY firm
 * across all of its layers. Top/Bottom movers come from per-layer 4w averages
 * so users can drill down to the layer driving the move.
 */
export async function getEcosystemMomentum(
  ecosystemId: EcosystemId,
): Promise<EcosystemMomentum | null> {
  const eco = ECOSYSTEMS.find((e) => e.id === ecosystemId);
  if (!eco) return null;

  // Pull all primary firm ids in this ecosystem (de-duped — a firm
  // can only be primary once by construction)
  const firmIds = new Set<string>();
  for (const layer of eco.layers) {
    for (const m of getLayerMemberships(ecosystemId, layer.id)) {
      if (m.role === "primary") firmIds.add(m.firmId);
    }
  }

  // Scoped fetch — only this ecosystem's firms (~30 typical), not all 145
  const idArr = Array.from(firmIds);
  const ecosystemPrices = await getPriceHistoriesByIds(idArr);

  const priceMomentumByTimeframe: Record<Timeframe, number | null> = {
    "1w": avgChangeAcrossFirms(ecosystemPrices, TIMEFRAME_DAYS["1w"]),
    "4w": avgChangeAcrossFirms(ecosystemPrices, TIMEFRAME_DAYS["4w"]),
    "12w": avgChangeAcrossFirms(ecosystemPrices, TIMEFRAME_DAYS["12w"]),
  };
  const priceSparkline = computeSparkline(ecosystemPrices, TIMEFRAME_DAYS["12w"]);

  // News sentiment (across all primary firms of the ecosystem)
  const newsArrays = await Promise.all(
    Array.from(firmIds).map((id) => getNewsByFirmId(id)),
  );
  const allNews = newsArrays.flat();
  const sentimentScores: number[] = allNews.map((n) => {
    if (typeof n.sentimentScore === "number") return n.sentimentScore;
    return n.sentiment === "Positive" ? 1 : n.sentiment === "Negative" ? -1 : 0;
  });
  const newsSentiment =
    sentimentScores.length > 0
      ? sentimentScores.reduce((a, b) => a + b, 0) / sentimentScores.length
      : null;

  // Layer movers — recompute per-layer 4w (cheap; uses cache when warm)
  const perLayer = await Promise.all(
    eco.layers.map(async (l) => {
      const m = await getCachedLayerMomentum(ecosystemId, l.id);
      return {
        layerId: l.id,
        layerName: l.name,
        layerNameKo: l.nameKo,
        change: m.priceMomentumByTimeframe["4w"],
        sample: m.sampleSize.price,
      };
    }),
  );
  const usableLayers = perLayer.filter(
    (l): l is typeof l & { change: number } => l.change !== null && l.sample > 0,
  );
  const sortedDesc = [...usableLayers].sort((a, b) => b.change - a.change);
  const sortedAsc = [...usableLayers].sort((a, b) => a.change - b.change);

  const layerOnlyFields = ({ layerId, layerName, layerNameKo, change }: typeof usableLayers[number]) =>
    ({ layerId, layerName, layerNameKo, change });

  return {
    ecosystemId,
    priceMomentum: priceMomentumByTimeframe["4w"],
    priceMomentumByTimeframe,
    priceSparkline,
    newsSentiment,
    sampleSize: { firms: ecosystemPrices.length, news: allNews.length, layers: eco.layers.length },
    topMovers: sortedDesc.slice(0, 3).map(layerOnlyFields),
    bottomMovers: sortedAsc.slice(0, 3).map(layerOnlyFields),
  };
}

const _ecoCache = new Map<EcosystemId, { data: EcosystemMomentum; ts: number }>();

export async function getCachedEcosystemMomentum(
  ecosystemId: EcosystemId,
): Promise<EcosystemMomentum | null> {
  const hit = _ecoCache.get(ecosystemId);
  if (hit && Date.now() - hit.ts < TTL_MS) return hit.data;
  const data = await getEcosystemMomentum(ecosystemId);
  if (data) _ecoCache.set(ecosystemId, { data, ts: Date.now() });
  return data;
}

export async function getAllEcosystemMomentums(): Promise<EcosystemMomentum[]> {
  const tasks = ECOSYSTEMS.map((e) => getCachedEcosystemMomentum(e.id));
  const results = await Promise.all(tasks);
  return results.filter((m): m is EcosystemMomentum => m !== null);
}
