/**
 * Sell signal rule engine — 카테고리 phase + firm role + 가격·뉴스 모멘텀 +
 * Moore 충돌을 결합해 EXIT/REBALANCE/WARN 신호 생성.
 *
 * 매수 중심에서 매도·리밸런싱·관찰 뷰로 확장 (유 회장님 비전 C).
 */

import type {
  SellSignal,
  SellSignalKind,
  SellSignalSeverity,
} from "@/types/sell-signal";
import {
  getFirmCategories,
  getCategoryById,
} from "./product-category-provider";
import { getCachedLayerMomentum } from "./layer-momentum";
import { getPriceHistory } from "./price-provider";
import { getAllFirms, getAllClassifications } from "./firm-provider";
import {
  getFirmPrimaryEcosystem,
  detectMooreConflicts,
} from "./ecosystem-provider";
import type { ProductCategoryPhase } from "@/types/product-category";
import type { Firm } from "@/types/firm";
import type { ClassificationResult } from "@/types/classification";

const DECLINING_PHASES: ReadonlySet<ProductCategoryPhase> = new Set<ProductCategoryPhase>([
  "Declining Main Street",
  "Fault Line",
  "End of Life",
]);

const MAINSTREET_EXIT_PHASES = new Set([
  "Declining Main Street",
  "Maturing Main Street",
  "Fault Line",
  "End of Life",
]);

/** Severity → ordering weight (lower = stronger signal). */
const SEVERITY_RANK: Record<SellSignalSeverity, number> = {
  "EXIT": 0,
  "REBALANCE": 1,
  "WARN": 2,
};

const KIND_PRIORITY: Record<SellSignalKind, number> = {
  "EXIT-CATEGORY-DECLINE": 0,
  "EXIT-MAINSTREET-EXIT": 1,
  "REBALANCE-SUCCESSOR-MISS": 2,
  "WARN-MOMENTUM-CRASH": 3,
  "WARN-CONFLICT": 4,
};

function rankSignal(s: SellSignal): number {
  return SEVERITY_RANK[s.severity] * 10 + KIND_PRIORITY[s.kind];
}

// ── Detection per firm ────────────────────────────────────────────

interface DetectInput {
  firm: Firm;
  classification: ClassificationResult;
  /** Pre-computed layer momentum keyed by `${ecoId}:${layerId}` */
  layerMomentumCache: Map<string, { p4w: number | null; p12w: number | null; news: number | null }>;
  /** Pre-computed conflict carrier set: firmId in any Moore-collision firmIds. */
  conflictCarrierFirmIds: Set<string>;
}

async function detectForFirm(input: DetectInput): Promise<SellSignal[]> {
  const { firm, classification, layerMomentumCache, conflictCarrierFirmIds } = input;
  const out: SellSignal[] = [];
  const cats = getFirmCategories(firm.id);

  // Rule 1: EXIT-CATEGORY-DECLINE — declining 카테고리에 의미있는 매출 비중
  for (const { category, participation } of cats) {
    const w = participation.revenueWeight ?? 0;
    if (DECLINING_PHASES.has(category.phase) && w >= 0.30) {
      out.push({
        firmId: firm.id,
        kind: "EXIT-CATEGORY-DECLINE",
        severity: "EXIT",
        reasonKo: `매출 비중 ${Math.round(w * 100)}%인 '${category.nameKo}' 카테고리가 ${category.phase} 단계 — 카테고리 쇠퇴로 매도 후보.`,
        reasonEn: `${Math.round(w * 100)}% revenue category '${category.name}' is in ${category.phase} — exit candidate as the category declines.`,
        evidence: {
          categoryId: category.id,
          categoryName: category.nameKo,
          categoryPhase: category.phase,
          revenueWeight: w,
          successorCategoryId: category.successorCategoryId,
        },
      });
    }
  }

  // Rule 2: REBALANCE-SUCCESSOR-MISS — declining 참여하면서 successor에 참여 안함
  const participatedIds = new Set(cats.map((c) => c.category.id));
  for (const { category, participation } of cats) {
    if (!DECLINING_PHASES.has(category.phase)) continue;
    if (!category.successorCategoryId) continue;
    if (participatedIds.has(category.successorCategoryId)) continue; // 이미 successor에 들어감
    const successor = getCategoryById(category.successorCategoryId);
    if (!successor) continue;
    out.push({
      firmId: firm.id,
      kind: "REBALANCE-SUCCESSOR-MISS",
      severity: "REBALANCE",
      reasonKo: `'${category.nameKo}' 쇠퇴 + 후계 카테고리 '${successor.nameKo}'에 참여 없음 — ${successor.nameKo} 강자로 리밸런싱 검토.`,
      reasonEn: `'${category.name}' declining + no participation in successor '${successor.name}' — consider rebalancing into ${successor.name} leaders.`,
      evidence: {
        categoryId: category.id,
        categoryName: category.nameKo,
        categoryPhase: category.phase,
        revenueWeight: participation.revenueWeight,
        successorCategoryId: successor.id,
        successorCategoryName: successor.nameKo,
      },
    });
  }

  // Rule 3: EXIT-MAINSTREET-EXIT — 메인스트리트 후반 + 가격 음수
  // (자기 firm 1M 가격은 priceHistory에서, 12w는 layer momentum cache에서 추정)
  if (
    MAINSTREET_EXIT_PHASES.has(classification.marketPhase) &&
    firm.revenueGrowthYoY < 0.05
  ) {
    const price = await getPriceHistory(firm.id);
    if (price && price.priceChange1M < -0.05) {
      out.push({
        firmId: firm.id,
        kind: "EXIT-MAINSTREET-EXIT",
        severity: "EXIT",
        reasonKo: `메인스트리트 후반(${classification.marketPhase}, 성장 ${Math.round(firm.revenueGrowthYoY * 100)}%) + 4주 가격 ${(price.priceChange1M * 100).toFixed(1)}% — 끝물 매도 후보.`,
        reasonEn: `Late main street (${classification.marketPhase}, growth ${Math.round(firm.revenueGrowthYoY * 100)}%) + 4w price ${(price.priceChange1M * 100).toFixed(1)}% — exit candidate.`,
        evidence: {
          pricePct4w: price.priceChange1M,
        },
      });
    }
  }

  // Rule 4: WARN-MOMENTUM-CRASH — 4w 가격 -10% 이하 + 뉴스 sentiment 음수
  // primary layer momentum로 검사
  const primaryMem = getFirmPrimaryEcosystem(firm.id);
  if (primaryMem) {
    const k = `${primaryMem.ecosystemId}:${primaryMem.layerId}`;
    const lm = layerMomentumCache.get(k);
    if (lm) {
      const price = await getPriceHistory(firm.id);
      const myPrice4w = price?.priceChange1M ?? 0;
      if (myPrice4w <= -0.10 && (lm.news ?? 0) <= -0.3) {
        out.push({
          firmId: firm.id,
          kind: "WARN-MOMENTUM-CRASH",
          severity: "WARN",
          reasonKo: `4주 가격 ${(myPrice4w * 100).toFixed(1)}% + layer 뉴스 sentiment ${lm.news?.toFixed(2)} — 급변 경고, 등급은 유지하되 관찰.`,
          reasonEn: `4w price ${(myPrice4w * 100).toFixed(1)}% + layer news sentiment ${lm.news?.toFixed(2)} — sharp move warning, hold rating but watch.`,
          evidence: {
            pricePct4w: myPrice4w,
            sentimentScore: lm.news ?? undefined,
          },
        });
      }
    }
  }

  // Rule 5: WARN-CONFLICT — Moore 충돌 carrier
  if (conflictCarrierFirmIds.has(firm.id)) {
    out.push({
      firmId: firm.id,
      kind: "WARN-CONFLICT",
      severity: "WARN",
      reasonKo: `같은 layer에 Gorilla 등급 firm 다수 — Moore 카테고리당 1 고릴라 원칙 위반, 등급·sub-카테고리 검증 필요.`,
      reasonEn: `Layer has multiple Gorilla-tier firms — violates Moore's "one gorilla per category" principle; verify scoring or sub-category split.`,
      evidence: {},
    });
  }

  return out.sort((a, b) => rankSignal(a) - rankSignal(b));
}

// ── Public API ────────────────────────────────────────────────────

let _cache: { ts: number; map: Map<string, SellSignal[]> } | null = null;
const TTL_MS = 5 * 60 * 1000;

export async function detectAllSellSignals(): Promise<Map<string, SellSignal[]>> {
  if (_cache && Date.now() - _cache.ts < TTL_MS) return _cache.map;

  const [firms, cls] = await Promise.all([
    getAllFirms(),
    getAllClassifications("ko"),
  ]);

  // Pre-compute layer momentums needed (only primary layers)
  const neededLayers = new Set<string>();
  for (const f of firms) {
    const m = getFirmPrimaryEcosystem(f.id);
    if (m) neededLayers.add(`${m.ecosystemId}:${m.layerId}`);
  }
  const layerMomentumCache = new Map<string, { p4w: number | null; p12w: number | null; news: number | null }>();
  await Promise.all(
    Array.from(neededLayers).map(async (k) => {
      const [ecoId, layerId] = k.split(":");
      const m = await getCachedLayerMomentum(ecoId as Parameters<typeof getCachedLayerMomentum>[0], layerId);
      layerMomentumCache.set(k, {
        p4w: m.priceMomentumByTimeframe["4w"],
        p12w: m.priceMomentumByTimeframe["12w"],
        news: m.newsSentiment,
      });
    }),
  );

  // Conflict carriers
  const conflicts = await detectMooreConflicts("ko");
  const conflictCarrierFirmIds = new Set<string>();
  for (const c of conflicts) for (const id of c.firmIds) conflictCarrierFirmIds.add(id);

  const result = new Map<string, SellSignal[]>();
  for (const firm of firms) {
    const c = cls.get(firm.id);
    if (!c) continue;
    const sigs = await detectForFirm({
      firm,
      classification: c,
      layerMomentumCache,
      conflictCarrierFirmIds,
    });
    if (sigs.length > 0) result.set(firm.id, sigs);
  }

  _cache = { ts: Date.now(), map: result };
  return result;
}

export async function getSellSignalsForFirm(firmId: string): Promise<SellSignal[]> {
  const all = await detectAllSellSignals();
  return all.get(firmId) ?? [];
}

export interface SellCandidate {
  firmId: string;
  signals: SellSignal[];
  /** Highest-priority signal (smallest rank). */
  topSignal: SellSignal;
}

/** Top sell candidates sorted by severity (EXIT > REBALANCE > WARN). */
export async function getTopSellCandidates(limit = 6): Promise<SellCandidate[]> {
  const all = await detectAllSellSignals();
  const candidates: SellCandidate[] = [];
  for (const [firmId, signals] of all) {
    const top = signals[0];
    if (top) candidates.push({ firmId, signals, topSignal: top });
  }
  candidates.sort((a, b) => rankSignal(a.topSignal) - rankSignal(b.topSignal));
  return candidates.slice(0, limit);
}

/** Group sell candidates by severity for separate hero cards. */
export async function getGroupedSellCandidates(): Promise<{
  exit: SellCandidate[];
  rebalance: SellCandidate[];
  warn: SellCandidate[];
}> {
  const all = await detectAllSellSignals();
  const out = { exit: [] as SellCandidate[], rebalance: [] as SellCandidate[], warn: [] as SellCandidate[] };
  for (const [firmId, signals] of all) {
    const top = signals[0];
    if (!top) continue;
    const cand = { firmId, signals, topSignal: top };
    if (top.severity === "EXIT") out.exit.push(cand);
    else if (top.severity === "REBALANCE") out.rebalance.push(cand);
    else out.warn.push(cand);
  }
  // Sort each by signal count desc then by rank asc
  for (const k of ["exit", "rebalance", "warn"] as const) {
    out[k].sort((a, b) => b.signals.length - a.signals.length || rankSignal(a.topSignal) - rankSignal(b.topSignal));
  }
  return out;
}
