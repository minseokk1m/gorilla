/**
 * Investment Funnel rule engine — 카테고리·tier·가격 모멘텀 결합으로 firm을
 * Candidate → Potential → Confirmed → Hold 4단계에 자동 배치.
 */

import type { FunnelPosition, FunnelStage } from "@/types/funnel";
import { getAllFirms, getAllClassifications } from "./firm-provider";
import { getFirmCategories } from "./product-category-provider";
import { getCachedLayerMomentum } from "./layer-momentum";
import { getFirmPrimaryEcosystem } from "./ecosystem-provider";
import { getPriceHistory } from "./price-provider";
import type { ProductCategoryPhase, FirmCategoryRole } from "@/types/product-category";
import type { ClassificationTier } from "@/types/classification";

const HOT_PHASES: ReadonlySet<ProductCategoryPhase> = new Set(["Tornado", "Bowling Alley"]);
const STRONG_ROLES: ReadonlySet<FirmCategoryRole> = new Set(["Gorilla", "King", "Prince"]);
const TOP_TIERS: ReadonlySet<ClassificationTier> = new Set(["Gorilla", "Potential Gorilla"]);
const POT_PRINCE_TIERS: ReadonlySet<ClassificationTier> = new Set(["Gorilla", "Potential Gorilla", "King", "Prince"]);
const HOLD_PHASES: ReadonlySet<ProductCategoryPhase> = new Set(["Tornado", "Thriving Main Street"]);

const STAGE_RANK: Record<FunnelStage, number> = {
  "Candidate": 0,
  "Potential": 1,
  "Confirmed": 2,
  "Hold": 3,
};

let _cache: { ts: number; map: Map<string, FunnelPosition> } | null = null;
const TTL_MS = 5 * 60 * 1000;

export async function detectAllFunnelPositions(): Promise<Map<string, FunnelPosition>> {
  if (_cache && Date.now() - _cache.ts < TTL_MS) return _cache.map;

  const [firms, cls] = await Promise.all([
    getAllFirms(),
    getAllClassifications("ko"),
  ]);

  // Pre-compute layer momentum for primary layers
  const layerMomCache = new Map<string, { p4w: number | null; p12w: number | null }>();
  const neededLayers = new Set<string>();
  for (const f of firms) {
    const m = getFirmPrimaryEcosystem(f.id);
    if (m) neededLayers.add(`${m.ecosystemId}:${m.layerId}`);
  }
  await Promise.all(
    Array.from(neededLayers).map(async (k) => {
      const [ecoId, layerId] = k.split(":");
      const lm = await getCachedLayerMomentum(ecoId as Parameters<typeof getCachedLayerMomentum>[0], layerId);
      layerMomCache.set(k, {
        p4w: lm.priceMomentumByTimeframe["4w"],
        p12w: lm.priceMomentumByTimeframe["12w"],
      });
    }),
  );

  const result = new Map<string, FunnelPosition>();
  for (const firm of firms) {
    const c = cls.get(firm.id);
    if (!c) continue;

    const reasonsKo: string[] = [];
    const reasonsEn: string[] = [];
    const blockersKo: string[] = [];
    const blockersEn: string[] = [];

    // Stage 1: Candidate (모든 firm)
    let stage: FunnelStage = "Candidate";
    reasonsKo.push("145개 후보군 중 하나 — 카테고리·tier·가격 검증 단계 진입 대기.");
    reasonsEn.push("One of 145 candidates — awaiting category/tier/price validation.");

    // Stage 2: Potential — Tornado/BA 카테고리에 strong role 참여 OR top tier
    const cats = getFirmCategories(firm.id);
    const hotParticipations = cats.filter(
      (e) => HOT_PHASES.has(e.category.phase) && STRONG_ROLES.has(e.participation.role),
    );
    const isPotByCategory = hotParticipations.length > 0;
    const isPotByTier = POT_PRINCE_TIERS.has(c.tier);

    if (isPotByCategory || isPotByTier) {
      stage = "Potential";
      if (isPotByCategory) {
        const top = hotParticipations[0];
        reasonsKo.push(
          `${top.category.nameKo}(${top.category.phase}) 카테고리에 ${top.participation.role}로 참여 — 잠재 후보.`,
        );
        reasonsEn.push(
          `Plays ${top.participation.role} in ${top.category.name} (${top.category.phase}) — potential candidate.`,
        );
      }
      if (isPotByTier) {
        reasonsKo.push(`Tier=${c.tier} (Prince 이상) — 잠재 후보.`);
        reasonsEn.push(`Tier=${c.tier} (Prince+) — potential candidate.`);
      }
    } else {
      blockersKo.push("Tornado/Bowling Alley 카테고리 강자(Prince+) 진입 OR Tier Prince 이상 필요.");
      blockersEn.push("Need strong role (Prince+) in Tornado/BA category OR Tier ≥ Prince.");
    }

    // Stage 3: Confirmed — Potential + 가격 검증 (12w 가격 양수)
    const primaryMem = getFirmPrimaryEcosystem(firm.id);
    const lm = primaryMem ? layerMomCache.get(`${primaryMem.ecosystemId}:${primaryMem.layerId}`) : null;
    const price = await getPriceHistory(firm.id);
    const ownPrice12w = price ? changeOver(price, 60) : null;
    const layerPrice12w = lm?.p12w ?? null;
    // 가격 검증: firm 자체 12w > 0% OR layer 평균 12w > 5%
    const priceValidated = (ownPrice12w !== null && ownPrice12w > 0) || (layerPrice12w !== null && layerPrice12w > 0.05);

    if (stage === "Potential" && priceValidated) {
      stage = "Confirmed";
      if (ownPrice12w !== null && ownPrice12w > 0) {
        reasonsKo.push(`12주 가격 ${(ownPrice12w * 100).toFixed(1)}% — 시장 검증.`);
        reasonsEn.push(`12W price ${(ownPrice12w * 100).toFixed(1)}% — market validated.`);
      } else if (layerPrice12w !== null) {
        reasonsKo.push(`Layer 12주 모멘텀 ${(layerPrice12w * 100).toFixed(1)}% — 카테고리 시장 검증.`);
        reasonsEn.push(`Layer 12W momentum ${(layerPrice12w * 100).toFixed(1)}% — category validated.`);
      }
    } else if (stage === "Potential") {
      blockersKo.push(
        `12주 가격이 검증 안 됨 (firm ${ownPrice12w !== null ? (ownPrice12w * 100).toFixed(1) + "%" : "—"}, layer ${layerPrice12w !== null ? (layerPrice12w * 100).toFixed(1) + "%" : "—"}).`,
      );
      blockersEn.push(
        `Price not validated yet (firm ${ownPrice12w !== null ? (ownPrice12w * 100).toFixed(1) + "%" : "—"}, layer ${layerPrice12w !== null ? (layerPrice12w * 100).toFixed(1) + "%" : "—"}).`,
      );
    }

    // Stage 4: Hold — Confirmed + tier ∈ {Gorilla, Pot Gorilla} + 카테고리 Gorilla/King + 카테고리 phase ∈ {Tornado, Thriving}
    const tierOk = TOP_TIERS.has(c.tier);
    const dominantCat = cats.find(
      (e) => (e.participation.role === "Gorilla" || e.participation.role === "King") && HOLD_PHASES.has(e.category.phase),
    );

    if (stage === "Confirmed" && tierOk && dominantCat) {
      stage = "Hold";
      reasonsKo.push(
        `${dominantCat.category.nameKo}(${dominantCat.category.phase})의 ${dominantCat.participation.role} + Tier=${c.tier} — 장기 보유 대상.`,
      );
      reasonsEn.push(
        `${dominantCat.participation.role} of ${dominantCat.category.name} (${dominantCat.category.phase}) + Tier=${c.tier} — long-term hold.`,
      );
    } else if (stage === "Confirmed") {
      const missing: string[] = [];
      const missingEn: string[] = [];
      if (!tierOk) {
        missing.push(`Tier ${c.tier} → Gorilla/Potential Gorilla 필요`);
        missingEn.push(`Tier ${c.tier} → need Gorilla/Pot Gorilla`);
      }
      if (!dominantCat) {
        missing.push("Tornado/Thriving 카테고리에 Gorilla/King 미보유");
        missingEn.push("No Gorilla/King in Tornado/Thriving category");
      }
      blockersKo.push(`Hold 진입 부족: ${missing.join(", ")}`);
      blockersEn.push(`Hold blocked: ${missingEn.join(", ")}`);
    }

    result.set(firm.id, { firmId: firm.id, stage, reasonsKo, reasonsEn, blockersKo, blockersEn });
  }

  _cache = { ts: Date.now(), map: result };
  return result;
}

function changeOver(price: { candles: { close: number }[] }, days: number): number | null {
  if (price.candles.length < days + 1) return null;
  const last = price.candles[price.candles.length - 1].close;
  const past = price.candles[price.candles.length - 1 - days].close;
  if (!past) return null;
  return (last - past) / past;
}

export async function getFunnelPositionForFirm(firmId: string): Promise<FunnelPosition | null> {
  const all = await detectAllFunnelPositions();
  return all.get(firmId) ?? null;
}

export async function getFunnelCounts(): Promise<Record<FunnelStage, number>> {
  const all = await detectAllFunnelPositions();
  // 누적 카운트: stage가 Hold인 firm은 Confirmed/Potential/Candidate에도 포함됨
  const counts: Record<FunnelStage, number> = { Candidate: 0, Potential: 0, Confirmed: 0, Hold: 0 };
  for (const p of all.values()) {
    const r = STAGE_RANK[p.stage];
    if (r >= 0) counts.Candidate++;
    if (r >= 1) counts.Potential++;
    if (r >= 2) counts.Confirmed++;
    if (r >= 3) counts.Hold++;
  }
  return counts;
}

/**
 * Firms whose CURRENT (highest) stage equals the given stage. Sorted by firm score desc.
 * Uses classification.totalScore as a stable secondary ordering.
 */
export async function getFirmsAtStage(stage: FunnelStage): Promise<FunnelPosition[]> {
  const all = await detectAllFunnelPositions();
  const cls = await getAllClassifications("ko");
  const list = Array.from(all.values()).filter((p) => p.stage === stage);
  list.sort((a, b) => (cls.get(b.firmId)?.totalScore ?? 0) - (cls.get(a.firmId)?.totalScore ?? 0));
  return list;
}
