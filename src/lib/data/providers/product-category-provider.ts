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
