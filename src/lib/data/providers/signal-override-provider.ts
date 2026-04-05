import type { ClassificationSignals } from "@/types/firm";
import { getSupabase } from "@/lib/supabase/admin";
import { TTLCache } from "../api/cache";

// Cache overrides for 1 minute (short TTL so edits appear quickly)
const overrideCache = new TTLCache<Map<string, Partial<ClassificationSignals>>>(60_000);
const CACHE_KEY = "all";

/**
 * Fetch all signal overrides from Supabase.
 * Returns a map of firmId → partial ClassificationSignals.
 * Missing fields mean "use default from firms.ts".
 */
export async function getAllSignalOverrides(): Promise<Map<string, Partial<ClassificationSignals>>> {
  const cached = overrideCache.get(CACHE_KEY);
  if (cached) return cached;

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("signal_overrides")
      .select("*");

    if (error) {
      console.warn("[SignalOverride] fetch failed:", error.message);
      return new Map();
    }

    const map = new Map<string, Partial<ClassificationSignals>>();
    for (const row of data ?? []) {
      const signals: Partial<ClassificationSignals> = {};
      if (row.estimated_niche_market_share != null) signals.estimatedNicheMarketShare = Number(row.estimated_niche_market_share);
      if (row.net_revenue_retention != null) signals.netRevenueRetention = Number(row.net_revenue_retention);
      if (row.ecosystem_partner_count != null) signals.ecosystemPartnerCount = Number(row.ecosystem_partner_count);
      if (row.is_defacto_standard != null) signals.isDefactoStandard = Boolean(row.is_defacto_standard);
      if (row.competitor_count != null) signals.competitorCount = Number(row.competitor_count);
      if (row.has_proprietary_protocol != null) signals.hasProprietaryProtocol = Boolean(row.has_proprietary_protocol);
      map.set(row.firm_id, signals);
    }

    overrideCache.set(CACHE_KEY, map);
    return map;
  } catch (e) {
    console.warn("[SignalOverride] error:", (e as Error).message);
    return new Map();
  }
}

/**
 * Invalidate the override cache (call after accepting a proposal).
 */
export function invalidateOverrideCache(): void {
  overrideCache.clear();
}

/**
 * Apply signal overrides onto a firm's classificationSignals.
 */
export function applyOverrides(
  base: ClassificationSignals,
  overrides: Partial<ClassificationSignals>,
): ClassificationSignals {
  return { ...base, ...overrides };
}
