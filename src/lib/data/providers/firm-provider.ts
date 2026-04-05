import type { Firm } from "@/types/firm";
import type { ClassificationTier, ClassificationResult } from "@/types/classification";
import { MOCK_FIRMS } from "../mock/firms";
import { classifyFirm } from "@/lib/classification/engine";
import { DATA_SOURCE } from "../api/config";
import { getMarketFirmOverlay, hydrateFirm, prefetchAllMarketData } from "../api/market-data-service";

// ── Hydrated firms cache ────────────────────────────────
let _hydratedFirms: Firm[] | null = null;
let _hydrationTimestamp = 0;
const HYDRATION_TTL = 5 * 60 * 1000; // 5 minutes

async function getHydratedFirms(): Promise<Firm[]> {
  if (DATA_SOURCE === "mock") return MOCK_FIRMS;

  const now = Date.now();
  if (_hydratedFirms && now - _hydrationTimestamp < HYDRATION_TTL) {
    return _hydratedFirms;
  }

  // Prefetch all market data (batched with concurrency limit)
  await prefetchAllMarketData(MOCK_FIRMS);

  const hydrated = await Promise.all(
    MOCK_FIRMS.map(async (firm) => {
      const overlay = await getMarketFirmOverlay(firm.ticker);
      if (overlay) return hydrateFirm(firm, overlay);
      if (DATA_SOURCE === "hybrid") return firm; // fallback to mock values
      return firm;
    }),
  );

  _hydratedFirms = hydrated;
  _hydrationTimestamp = now;

  // Invalidate classification caches since firm data changed
  _classificationCaches = {};

  return hydrated;
}

// ── Provider interface ──────────────────────────────────
export interface FirmDataProvider {
  getAllFirms(): Promise<Firm[]>;
  getFirmBySlug(slug: string): Promise<Firm | null>;
}

export class HybridFirmProvider implements FirmDataProvider {
  async getAllFirms(): Promise<Firm[]> {
    return getHydratedFirms();
  }
  async getFirmBySlug(slug: string): Promise<Firm | null> {
    const firms = await getHydratedFirms();
    return firms.find((f) => f.slug === slug) ?? null;
  }
}

// Singleton provider
const provider = new HybridFirmProvider();

export async function getAllFirms(): Promise<Firm[]> {
  return provider.getAllFirms();
}

export async function getFirmBySlug(slug: string): Promise<Firm | null> {
  return provider.getFirmBySlug(slug);
}

// ── Classification cache (keyed by locale) ──────────────
let _classificationCaches: Partial<Record<string, Map<string, ClassificationResult>>> = {};

export async function getAllClassifications(locale = "en"): Promise<Map<string, ClassificationResult>> {
  if (_classificationCaches[locale]) return _classificationCaches[locale]!;

  const firms = await getHydratedFirms();
  const results = await Promise.all(
    firms.map((f) => classifyFirm(f, locale as "en" | "ko")),
  );
  _classificationCaches[locale] = new Map(results.map((r) => [r.firmId, r]));
  return _classificationCaches[locale]!;
}

export async function getClassification(firmId: string, locale = "en"): Promise<ClassificationResult | null> {
  const map = await getAllClassifications(locale);
  return map.get(firmId) ?? null;
}

export async function getFirmsByTier(tier: ClassificationTier, locale = "en"): Promise<{ firm: Firm; classification: ClassificationResult }[]> {
  const [firms, classifications] = await Promise.all([
    getHydratedFirms(),
    getAllClassifications(locale),
  ]);
  return firms
    .filter((f) => classifications.get(f.id)?.tier === tier)
    .map((f) => ({ firm: f, classification: classifications.get(f.id)! }));
}
