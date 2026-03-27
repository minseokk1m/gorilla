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

// Pre-compute all classifications (server-side)
let _cache: Map<string, ClassificationResult> | null = null;

export async function getAllClassifications(): Promise<Map<string, ClassificationResult>> {
  if (_cache) return _cache;
  const results = await Promise.all(MOCK_FIRMS.map((f) => classifyFirm(f)));
  _cache = new Map(results.map((r) => [r.firmId, r]));
  return _cache;
}

export async function getClassification(firmId: string): Promise<ClassificationResult | null> {
  const map = await getAllClassifications();
  return map.get(firmId) ?? null;
}

export async function getFirmsByTier(tier: ClassificationTier): Promise<{ firm: Firm; classification: ClassificationResult }[]> {
  const all = await getAllClassifications();
  return MOCK_FIRMS
    .filter((f) => all.get(f.id)?.tier === tier)
    .map((f) => ({ firm: f, classification: all.get(f.id)! }));
}
