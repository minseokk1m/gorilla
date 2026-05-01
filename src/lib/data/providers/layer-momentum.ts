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
import { getAllFirms } from "./firm-provider";
import { getAllPriceHistories } from "./price-provider";
import { getNewsByFirmId } from "./news-provider";
import { getLayerMemberships } from "./ecosystem-provider";
import { ECOSYSTEMS } from "../mock/ecosystems";

export interface LayerMomentum {
  ecosystemId: EcosystemId;
  layerId: string;
  /** Decimal 1M change averaged over primary firms (e.g. 0.082 = +8.2%). null if no data. */
  priceMomentum: number | null;
  /** Average news sentiment from -1 (all negative) to +1 (all positive). null if no data. */
  newsSentiment: number | null;
  sampleSize: { price: number; news: number };
  /** Per-firm 1M price change for tooltips & detail views. */
  firmPriceChanges: { firmId: string; ticker: string; name: string; change1M: number }[];
  /** Most recent 3 headlines across the layer. */
  recentHeadlines: NewsArticle[];
}

const NEWS_LOOKBACK_MS = 90 * 24 * 60 * 60 * 1000; // 90 days; mock data spans ~1y so this is loose

export async function getLayerMomentum(
  ecosystemId: EcosystemId,
  layerId: string,
): Promise<LayerMomentum> {
  const memberships = getLayerMemberships(ecosystemId, layerId).filter(
    (m) => m.role === "primary",
  );

  const [firms, prices] = await Promise.all([getAllFirms(), getAllPriceHistories()]);
  const firmById = new Map(firms.map((f) => [f.id, f]));
  const priceById = new Map(prices.map((p) => [p.firmId, p]));

  // Price momentum
  const firmPriceChanges = memberships
    .map((m) => {
      const firm = firmById.get(m.firmId);
      const price = priceById.get(m.firmId);
      if (!firm || !price) return null;
      return {
        firmId: firm.id,
        ticker: firm.ticker,
        name: firm.name,
        change1M: price.priceChange1M,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const priceMomentum =
    firmPriceChanges.length > 0
      ? firmPriceChanges.reduce((sum, x) => sum + x.change1M, 0) / firmPriceChanges.length
      : null;

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
