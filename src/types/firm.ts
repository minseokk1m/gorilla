export type Sector =
  | "Cloud Infrastructure"
  | "Enterprise Software"
  | "Semiconductors"
  | "AI/ML Platform"
  | "Cybersecurity"
  | "Developer Tools"
  | "Data & Analytics"
  | "Consumer Tech"
  | "Networking"
  | "Fintech"
  | "Digital Advertising"
  | "Social Media"
  | "E-Commerce"
  | "Semiconductor Equipment"
  | "Foundry"
  | "Chip Architecture/IP";

/** Gorilla Game Principle 1 & 2: category type determines buy timing */
export type CategoryType = "application" | "enabling";

export interface ClassificationSignals {
  estimatedNicheMarketShare: number;   // 0–1
  netRevenueRetention: number;         // e.g. 1.30 = 130%
  ecosystemPartnerCount: number;
  isDefactoStandard: boolean;
  competitorCount: number;
  hasProprietaryProtocol: boolean;
  /** Network effects / increasing returns strength (0–1) */
  networkEffects: number;
}

export interface Firm {
  id: string;
  slug: string;
  name: string;
  ticker: string;
  sector: Sector;
  categoryType: CategoryType;
  marketCapUSD: number;           // billions
  revenueGrowthYoY: number;       // decimal e.g. 0.32
  grossMargin: number;            // decimal
  founded: number;
  description: string;
  competitors: string[];          // slugs
  website: string;
  classificationSignals: ClassificationSignals;
}
