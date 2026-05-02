import type { EcosystemId } from "@/types/ecosystem";
import type { ProductCategory, FirmCategoryParticipation } from "@/types/product-category";
import { PRODUCT_CATEGORIES } from "../mock/product-categories";

export function listProductCategories(): ProductCategory[] {
  return PRODUCT_CATEGORIES;
}

export function getCategoryById(id: string): ProductCategory | null {
  return PRODUCT_CATEGORIES.find((c) => c.id === id) ?? null;
}

export function getCategoriesByLayer(
  ecosystemId: EcosystemId,
  layerId: string,
): ProductCategory[] {
  return PRODUCT_CATEGORIES.filter(
    (c) => c.ecosystemId === ecosystemId && c.layerId === layerId,
  );
}

/** 한 firm이 참여하는 모든 카테고리(다 layer 합쳐) + 그 안에서의 role/weight. */
export interface FirmCategoryEntry {
  category: ProductCategory;
  participation: FirmCategoryParticipation;
}

export function getFirmCategories(firmId: string): FirmCategoryEntry[] {
  const out: FirmCategoryEntry[] = [];
  for (const c of PRODUCT_CATEGORIES) {
    const p = c.participants.find((x) => x.firmId === firmId);
    if (p) out.push({ category: c, participation: p });
  }
  return out;
}

/** 카테고리 안 firm participation 정렬(Gorilla → Niche). */
const ROLE_ORDER: Record<FirmCategoryParticipation["role"], number> = {
  "Gorilla": 0,
  "King": 1,
  "Prince": 2,
  "Challenger": 3,
  "Niche": 4,
};

export function getCategoryFirms(categoryId: string): FirmCategoryParticipation[] {
  const c = getCategoryById(categoryId);
  if (!c) return [];
  return [...c.participants].sort(
    (a, b) => ROLE_ORDER[a.role] - ROLE_ORDER[b.role],
  );
}

// ── Substitution paths ────────────────────────────────────────────

export interface SubstitutionPath {
  from: ProductCategory;
  to: ProductCategory;
  /** firm-ids that face risk: heavy weight (≥0.30) in `from` + not participating in `to`. */
  atRiskFirmIds: string[];
  /** firm-ids that are positioned for the transition: in both `from` and `to`. */
  positionedFirmIds: string[];
  /** firm-ids that are pure successor plays: only in `to`. */
  pureSuccessorFirmIds: string[];
}

/**
 * 모든 카테고리 substitution path (`successorCategoryId`가 정의된 것만).
 * 각 path마다 현재 어느 firm이 risk이고 누가 잘 자리잡고 있고 누가 신규 강자인지 표시.
 */
export function getSubstitutionPaths(): SubstitutionPath[] {
  const paths: SubstitutionPath[] = [];
  for (const from of PRODUCT_CATEGORIES) {
    if (!from.successorCategoryId) continue;
    const to = getCategoryById(from.successorCategoryId);
    if (!to) continue;

    const fromIds = new Set(from.participants.map((p) => p.firmId));
    const toIds = new Set(to.participants.map((p) => p.firmId));

    const atRiskFirmIds: string[] = [];
    const positionedFirmIds: string[] = [];
    const pureSuccessorFirmIds: string[] = [];

    for (const p of from.participants) {
      if (toIds.has(p.firmId)) {
        positionedFirmIds.push(p.firmId);
      } else if ((p.revenueWeight ?? 0) >= 0.30) {
        atRiskFirmIds.push(p.firmId);
      }
    }
    for (const p of to.participants) {
      if (!fromIds.has(p.firmId)) pureSuccessorFirmIds.push(p.firmId);
    }

    paths.push({ from, to, atRiskFirmIds, positionedFirmIds, pureSuccessorFirmIds });
  }
  return paths;
}
