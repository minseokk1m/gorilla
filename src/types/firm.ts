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
  | "Fintech";

export interface ClassificationSignals {
  estimatedNicheMarketShare: number;   // 0–1
  netRevenueRetention: number;         // e.g. 1.30 = 130%
  ecosystemPartnerCount: number;
  isDefactoStandard: boolean;
  competitorCount: number;
  hasProprietaryProtocol: boolean;
}

export interface Firm {
  id: string;
  slug: string;
  name: string;
  ticker: string;
  sector: Sector;
  marketCapUSD: number;           // billions
  revenueGrowthYoY: number;       // decimal e.g. 0.32
  grossMargin: number;            // decimal
  founded: number;
  description: string;
  competitors: string[];          // slugs
  website: string;
  classificationSignals: ClassificationSignals;
}
