import type { Firm } from "@/types/firm";
import type { ClassificationTier } from "@/types/classification";
import type { ClassificationResult } from "@/types/classification";
import { MOCK_FIRMS } from "../mock/firms";
import { classifyFirm } from "@/lib/classification/engine";

export interface FirmDataProvider {
  getAllFirms(): Promise<Firm[]>;
  getFirmBySlug(slug: string): Promise<Firm | null>;
}

export class MockFirmProvider implements FirmDataProvider {
  async getAllFirms(): Promise<Firm[]> {
    return MOCK_FIRMS;
  }
  async getFirmBySlug(slug: string): Promise<Firm | null> {
    return MOCK_FIRMS.find((f) => f.slug === slug) ?? null;
  }
}

// Pre-compute all classifications (server-side), keyed by locale
const _caches: Partial<Record<string, Map<string, ClassificationResult>>> = {};

export async function getAllClassifications(locale = "en"): Promise<Map<string, ClassificationResult>> {
  if (_caches[locale]) return _caches[locale]!;
  const results = await Promise.all(MOCK_FIRMS.map((f) => classifyFirm(f, locale as "en" | "ko")));
  _caches[locale] = new Map(results.map((r) => [r.firmId, r]));
  return _caches[locale]!;
}

export async function getClassification(firmId: string, locale = "en"): Promise<ClassificationResult | null> {
  const map = await getAllClassifications(locale);
  return map.get(firmId) ?? null;
}

export async function getFirmsByTier(tier: ClassificationTier, locale = "en"): Promise<{ firm: Firm; classification: ClassificationResult }[]> {
  const all = await getAllClassifications(locale);
  return MOCK_FIRMS
    .filter((f) => all.get(f.id)?.tier === tier)
    .map((f) => ({ firm: f, classification: all.get(f.id)! }));
}
