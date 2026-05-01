import type { Ecosystem, EcosystemId, EcosystemLayer, FirmEcosystemMembership } from "@/types/ecosystem";
import type { Firm } from "@/types/firm";
import type { ClassificationResult, ClassificationTier } from "@/types/classification";
import { ECOSYSTEMS, findEcosystem } from "../mock/ecosystems";
import { ECOSYSTEM_MEMBERSHIPS, UNCATEGORIZED_FIRM_IDS } from "../mock/ecosystem-memberships";
import { getAllFirms, getAllClassifications } from "./firm-provider";

// ── Read-only registry queries (no async — pure data) ──────────────

export function listEcosystems(): Ecosystem[] {
  return ECOSYSTEMS;
}

export function getEcosystem(slugOrId: string): Ecosystem | null {
  return findEcosystem(slugOrId) ?? null;
}

export function getLayer(ecosystemId: EcosystemId, layerId: string): EcosystemLayer | null {
  const eco = ECOSYSTEMS.find((e) => e.id === ecosystemId);
  return eco?.layers.find((l) => l.id === layerId) ?? null;
}

/** A firm's ecosystem memberships (primary + secondary). */
export function getFirmEcosystems(firmId: string): FirmEcosystemMembership[] {
  return ECOSYSTEM_MEMBERSHIPS.filter((m) => m.firmId === firmId);
}

/** A firm's primary ecosystem membership, if any. */
export function getFirmPrimaryEcosystem(firmId: string): FirmEcosystemMembership | null {
  return ECOSYSTEM_MEMBERSHIPS.find((m) => m.firmId === firmId && m.role === "primary") ?? null;
}

/** All firm-ids (primary + secondary) attached to a given layer. */
export function getLayerMemberships(
  ecosystemId: EcosystemId,
  layerId: string,
): FirmEcosystemMembership[] {
  return ECOSYSTEM_MEMBERSHIPS.filter(
    (m) => m.ecosystemId === ecosystemId && m.layerId === layerId,
  );
}

export function isUncategorized(firmId: string): boolean {
  return UNCATEGORIZED_FIRM_IDS.includes(firmId);
}

// ── Hydrated queries (cross with classification) ──────────────

export interface LayerFirmRow {
  firm: Firm;
  classification: ClassificationResult;
  membership: FirmEcosystemMembership;
}

/**
 * Get all firms in a layer, hydrated with their classification.
 * Sorted by tier weight (Gorilla first), then by score desc.
 */
export async function getLayerFirms(
  ecosystemId: EcosystemId,
  layerId: string,
  locale: "en" | "ko" = "ko",
): Promise<LayerFirmRow[]> {
  const memberships = getLayerMemberships(ecosystemId, layerId);
  if (memberships.length === 0) return [];

  const [firms, classifications] = await Promise.all([
    getAllFirms(),
    getAllClassifications(locale),
  ]);
  const firmById = new Map(firms.map((f) => [f.id, f]));

  const rows: LayerFirmRow[] = [];
  for (const m of memberships) {
    const firm = firmById.get(m.firmId);
    const classification = classifications.get(m.firmId);
    if (!firm || !classification) continue;
    rows.push({ firm, classification, membership: m });
  }

  rows.sort((a, b) => {
    const dt = TIER_WEIGHT[a.classification.tier] - TIER_WEIGHT[b.classification.tier];
    if (dt !== 0) return dt;
    return b.classification.totalScore - a.classification.totalScore;
  });

  return rows;
}

/** Same as getLayerFirms but for a whole ecosystem, grouped by layer. */
export async function getEcosystemMatrix(
  ecosystemId: EcosystemId,
  locale: "en" | "ko" = "ko",
): Promise<{ layer: EcosystemLayer; rows: LayerFirmRow[] }[]> {
  const eco = ECOSYSTEMS.find((e) => e.id === ecosystemId);
  if (!eco) return [];

  return Promise.all(
    eco.layers.map(async (layer) => ({
      layer,
      rows: await getLayerFirms(ecosystemId, layer.id, locale),
    })),
  );
}

// ── Moore conflict detection ──────────────────────────────────────
// Moore 원칙: 한 카테고리(=한 layer) 안의 고릴라는 단 하나.
// 같은 layer에 Gorilla 등급이 둘 이상이면 "ecosystem 충돌" 경고.
// Potential Gorilla까지 포함하면 더 민감한 경고도 가능.

export interface MooreConflict {
  ecosystemId: EcosystemId;
  ecosystemName: string;
  layerId: string;
  layerName: string;
  /** "gorilla-collision" — Gorilla가 둘 이상. "succession-pressure" — Gorilla 1 + Potential Gorilla 1+. */
  kind: "gorilla-collision" | "succession-pressure";
  firmIds: string[];
}

export async function detectMooreConflicts(
  locale: "en" | "ko" = "ko",
): Promise<MooreConflict[]> {
  const conflicts: MooreConflict[] = [];
  const classifications = await getAllClassifications(locale);

  for (const eco of ECOSYSTEMS) {
    for (const layer of eco.layers) {
      const memberships = getLayerMemberships(eco.id, layer.id);
      // Only count *primary* memberships for conflict — secondary firms have a primary
      // home elsewhere and don't violate Moore's "one gorilla per category".
      const primaries = memberships.filter((m) => m.role === "primary");
      if (primaries.length < 2) continue;

      const tiers = primaries.map((m) => ({
        firmId: m.firmId,
        tier: classifications.get(m.firmId)?.tier,
      }));

      const gorillas = tiers.filter((t) => t.tier === "Gorilla");
      const potentials = tiers.filter((t) => t.tier === "Potential Gorilla");

      if (gorillas.length >= 2) {
        conflicts.push({
          ecosystemId: eco.id,
          ecosystemName: locale === "ko" ? eco.nameKo : eco.name,
          layerId: layer.id,
          layerName: locale === "ko" ? layer.nameKo : layer.name,
          kind: "gorilla-collision",
          firmIds: gorillas.map((g) => g.firmId),
        });
      } else if (gorillas.length === 1 && potentials.length >= 1) {
        conflicts.push({
          ecosystemId: eco.id,
          ecosystemName: locale === "ko" ? eco.nameKo : eco.name,
          layerId: layer.id,
          layerName: locale === "ko" ? layer.nameKo : layer.name,
          kind: "succession-pressure",
          firmIds: [...gorillas.map((g) => g.firmId), ...potentials.map((p) => p.firmId)],
        });
      }
    }
  }

  return conflicts;
}

// ── Constants ──────────────

const TIER_WEIGHT: Record<ClassificationTier, number> = {
  Gorilla: 0,
  "Potential Gorilla": 1,
  King: 2,
  Prince: 3,
  Chimpanzee: 4,
  Monkey: 5,
  Serf: 6,
  "In Chasm": 7,
};
