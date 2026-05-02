import type { Firm } from "@/types/firm";
import type { ClassificationTier, ClassificationResult } from "@/types/classification";
import { MOCK_FIRMS } from "../mock/firms";
import { classifyFirm } from "@/lib/classification/engine";
import { DATA_SOURCE } from "../api/config";
import { getMarketFirmOverlay, hydrateFirm } from "../api/market-data-service";
import { getAllSignalOverrides, applyOverrides, invalidateOverrideCache } from "./signal-override-provider";

// ── Hydrated firms cache ────────────────────────────────
let _hydratedFirms: Firm[] | null = null;
let _hydrationTimestamp = 0;
const HYDRATION_TTL = 5 * 60 * 1000; // 5 minutes

// Per-firm hydrate cache (scoped fetch용 — 한 페이지가 ecosystem 30 firm만
// 필요하면 145 yahoo 호출을 30으로 축소). 하위 getMarketFirmOverlay도 TTL
// dedupe돼 있어 getHydratedFirms와 호출 중복 시 중복 yahoo 호출 없음.
const _firmCache = new Map<string, Firm>();
let _firmCacheTimestamp = 0;

async function hydrateOneFirm(firmId: string): Promise<Firm | null> {
  const now = Date.now();
  if (now - _firmCacheTimestamp >= HYDRATION_TTL) {
    _firmCache.clear();
    _firmCacheTimestamp = now;
  }
  const cached = _firmCache.get(firmId);
  if (cached) return cached;

  const base = MOCK_FIRMS.find((f) => f.id === firmId);
  if (!base) return null;

  let firm: Firm = base;

  // Layer 2: yahoo overlay (lazy, per-firm)
  if (DATA_SOURCE !== "mock") {
    const overlay = await getMarketFirmOverlay(firm.yahooTicker ?? firm.ticker);
    if (overlay) firm = hydrateFirm(firm, overlay);
  }

  // Layer 3: supabase override
  const overrides = await getAllSignalOverrides();
  const override = overrides.get(firm.id);
  if (override) {
    firm = {
      ...firm,
      classificationSignals: applyOverrides(firm.classificationSignals, override),
    };
  }

  _firmCache.set(firmId, firm);
  return firm;
}

async function getHydratedFirms(): Promise<Firm[]> {
  const now = Date.now();
  if (_hydratedFirms && now - _hydrationTimestamp < HYDRATION_TTL) {
    return _hydratedFirms;
  }

  // Layer 1: base firms from mock data
  let firms = [...MOCK_FIRMS];

  // Layer 2: overlay live market data (prices, revenue, market cap)
  // prefetchAllMarketData(145 ticker) 제거 — vercel function timeout 회피.
  // getMarketFirmOverlay가 in-flight dedupe + 5분 cache로 lazy 호출. 같은 firm
  // 중복 fetch 자동 회피.
  if (DATA_SOURCE !== "mock") {
    firms = await Promise.all(
      firms.map(async (firm) => {
        const overlay = await getMarketFirmOverlay(firm.yahooTicker ?? firm.ticker);
        if (overlay) return hydrateFirm(firm, overlay);
        return firm;
      }),
    );
  }

  // Layer 3: apply signal overrides from Supabase (human-edited values)
  const overrides = await getAllSignalOverrides();
  firms = firms.map((firm) => {
    const override = overrides.get(firm.id);
    if (override) {
      return {
        ...firm,
        classificationSignals: applyOverrides(firm.classificationSignals, override),
      };
    }
    return firm;
  });

  _hydratedFirms = firms;
  _hydrationTimestamp = now;
  _classificationCaches = {};

  return firms;
}

/** Invalidate all caches (call after signal override changes). */
export function invalidateFirmCaches(): void {
  _hydratedFirms = null;
  _hydrationTimestamp = 0;
  _firmCache.clear();
  _firmCacheTimestamp = 0;
  _classificationCaches = {};
  _classificationByFirm.clear();
  _classificationByFirmTimestamp = 0;
  invalidateOverrideCache();
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

// ── Scoped fetch (ecosystem detail 등 부분 페이지용) ──────
// 한 페이지가 30 firm만 필요하면 145 yahoo overlay를 30으로 축소 → cold start
// 시간 단축. 하위 yahoo 호출은 ticker 단위 TTL dedupe돼 있어 다른 페이지 캐시
// 와도 자연 공유.

/** Hydrate only the requested firm ids. */
export async function getFirmsByIds(ids: string[]): Promise<Firm[]> {
  const results = await Promise.all(ids.map((id) => hydrateOneFirm(id)));
  return results.filter((f): f is Firm => f !== null);
}

const _classificationByFirm = new Map<string, ClassificationResult>(); // key: `${id}:${locale}`
let _classificationByFirmTimestamp = 0;

/** Classify only the requested firm ids (subset). */
export async function getClassificationsByIds(
  ids: string[],
  locale = "en",
): Promise<Map<string, ClassificationResult>> {
  const now = Date.now();
  if (now - _classificationByFirmTimestamp >= HYDRATION_TTL) {
    _classificationByFirm.clear();
    _classificationByFirmTimestamp = now;
  }

  const firms = await getFirmsByIds(ids);
  const result = new Map<string, ClassificationResult>();

  await Promise.all(
    firms.map(async (firm) => {
      const key = `${firm.id}:${locale}`;
      let cls = _classificationByFirm.get(key);
      if (!cls) {
        cls = await classifyFirm(firm, locale as "en" | "ko");
        _classificationByFirm.set(key, cls);
      }
      result.set(firm.id, cls);
    }),
  );

  return result;
}
