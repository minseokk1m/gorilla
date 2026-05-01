/**
 * Sentiment-driven profile engine — 4 factor 가중 평균으로 firm을
 * fundamentals-driven vs sentiment-driven 스펙트럼에 배치.
 */

import type {
  SentimentDrivenProfile,
  SentimentLevel,
} from "@/types/sentiment-driven";
import { getAllFirms } from "./firm-provider";
import { getPriceHistory } from "./price-provider";
import { getCachedLayerMomentum } from "./layer-momentum";
import { getFirmPrimaryEcosystem } from "./ecosystem-provider";
import { HYPE_TECHNOLOGIES } from "../mock/hype-technologies";
import type { Firm } from "@/types/firm";

const TTL_MS = 5 * 60 * 1000;
let _cache: { ts: number; map: Map<string, SentimentDrivenProfile> } | null = null;

function levelFromScore(score: number): SentimentLevel {
  if (score >= 70) return "Very High";
  if (score >= 50) return "High";
  if (score >= 30) return "Moderate";
  return "Low";
}

/**
 * Narrative valuation proxy:
 *  - hype cycle 후보면 80
 *  - 매출 성장 < 5% + 시총 > $100B면 50 (메가캡 stagnant — multiple expansion 의존)
 *  - revenueGrowthYoY > 50% + 시총 > $20B면 60 (high-growth premium)
 *  - else 20
 */
function narrativeValuationScore(firm: Firm, isHype: boolean): number {
  if (isHype) return 80;
  if (firm.revenueGrowthYoY > 0.50 && firm.marketCapUSD > 20) return 60;
  if (firm.revenueGrowthYoY < 0.05 && firm.marketCapUSD > 100) return 50;
  return 20;
}

export async function detectAllSentimentProfiles(): Promise<Map<string, SentimentDrivenProfile>> {
  if (_cache && Date.now() - _cache.ts < TTL_MS) return _cache.map;

  const firms = await getAllFirms();
  const hypeFirmIds = new Set<string>();
  for (const h of HYPE_TECHNOLOGIES) for (const id of h.firmIds) hypeFirmIds.add(id);

  // Pre-compute layer momentum for primary layers
  const layerNewsCache = new Map<string, number | null>();
  const neededLayers = new Set<string>();
  for (const f of firms) {
    const m = getFirmPrimaryEcosystem(f.id);
    if (m) neededLayers.add(`${m.ecosystemId}:${m.layerId}`);
  }
  await Promise.all(
    Array.from(neededLayers).map(async (k) => {
      const [ecoId, layerId] = k.split(":");
      const lm = await getCachedLayerMomentum(ecoId as Parameters<typeof getCachedLayerMomentum>[0], layerId);
      layerNewsCache.set(k, lm.newsSentiment);
    }),
  );

  const result = new Map<string, SentimentDrivenProfile>();
  for (const firm of firms) {
    const price = await getPriceHistory(firm.id);
    const move1M = price ? Math.abs(price.priceChange1M) : 0;
    // Normalise: 30%+ move = max sentiment-driven
    const priceVolatility = Math.min(100, Math.round((move1M / 0.30) * 100));

    const primaryMem = getFirmPrimaryEcosystem(firm.id);
    const sentiment = primaryMem
      ? layerNewsCache.get(`${primaryMem.ecosystemId}:${primaryMem.layerId}`) ?? 0
      : 0;
    const newsSentimentIntensity = Math.min(100, Math.round(Math.abs(sentiment) * 100));

    const hypeCycleMembership = hypeFirmIds.has(firm.id);
    const narrativeValuation = narrativeValuationScore(firm, hypeCycleMembership);

    const score = Math.round(
      priceVolatility * 0.35 +
        newsSentimentIntensity * 0.25 +
        (hypeCycleMembership ? 100 : 0) * 0.25 +
        narrativeValuation * 0.15,
    );

    // Top drivers — only include those that meaningfully contribute
    const drivers: { ko: string; en: string; weight: number }[] = [];
    if (priceVolatility >= 40) {
      drivers.push({
        ko: `1개월 가격 변동 ±${(move1M * 100).toFixed(1)}% — 기초 매출 변동(${(firm.revenueGrowthYoY * 100).toFixed(0)}%)을 크게 초과`,
        en: `1M price ±${(move1M * 100).toFixed(1)}% — far above revenue growth (${(firm.revenueGrowthYoY * 100).toFixed(0)}%)`,
        weight: priceVolatility,
      });
    }
    if (newsSentimentIntensity >= 40) {
      drivers.push({
        ko: `Layer 뉴스 sentiment ${sentiment.toFixed(2)} — 강도 큰 한 방향 흐름`,
        en: `Layer news sentiment ${sentiment.toFixed(2)} — strong directional flow`,
        weight: newsSentimentIntensity,
      });
    }
    if (hypeCycleMembership) {
      const hyper = HYPE_TECHNOLOGIES.find((h) => h.firmIds.includes(firm.id));
      drivers.push({
        ko: `하입사이클 ${hyper?.peakStatus === "rising" ? "오르막" : "꺾임"}: ${hyper?.nameKo ?? "—"}`,
        en: `Hype cycle ${hyper?.peakStatus ?? "—"}: ${hyper?.name ?? "—"}`,
        weight: 100,
      });
    }
    if (narrativeValuation >= 50 && !hypeCycleMembership) {
      drivers.push({
        ko: `시총 $${firm.marketCapUSD.toFixed(0)}B + 성장 ${(firm.revenueGrowthYoY * 100).toFixed(0)}% — 서사·multiple expansion 의존`,
        en: `MCap $${firm.marketCapUSD.toFixed(0)}B + growth ${(firm.revenueGrowthYoY * 100).toFixed(0)}% — narrative/multiple dependent`,
        weight: narrativeValuation,
      });
    }
    drivers.sort((a, b) => b.weight - a.weight);

    result.set(firm.id, {
      firmId: firm.id,
      score,
      level: levelFromScore(score),
      factors: {
        priceVolatility,
        newsSentimentIntensity,
        hypeCycleMembership,
        narrativeValuation,
      },
      topDriversKo: drivers.map((d) => d.ko),
      topDriversEn: drivers.map((d) => d.en),
    });
  }

  _cache = { ts: Date.now(), map: result };
  return result;
}

export async function getSentimentProfileForFirm(firmId: string): Promise<SentimentDrivenProfile | null> {
  const all = await detectAllSentimentProfiles();
  return all.get(firmId) ?? null;
}

/** Top N most sentiment-driven firms (score desc). */
export async function getTopSentimentDrivenFirms(limit = 5): Promise<SentimentDrivenProfile[]> {
  const all = await detectAllSentimentProfiles();
  return Array.from(all.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
