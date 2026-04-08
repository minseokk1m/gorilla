export type ClassificationTier =
  | "Gorilla"
  | "Potential Gorilla"
  | "King"
  | "Prince"
  | "Serf"
  | "Chimpanzee"
  | "Monkey"
  | "In Chasm";

export type Signal = "BUY" | "WATCH" | "SELL" | "AVOID";

export type MarketPhase =
  | "Early Market"
  | "Bowling Alley"
  | "Tornado"
  | "Main Street"
  | "End of Life";

export interface ClassificationScores {
  marketShare: number;          // 0–100
  switchingCosts: number;       // 0–100
  architectureControl: number;  // 0–100
  networkEffects: number;       // 0–100 (NEW: increasing returns / network effects)
  ecosystemControl: number;     // 0–100 (NEW: ecosystem dominance)
  revenueGrowth: number;        // 0–100
  marketConcentration: number;  // 0–100
}

/** Peak of Inflated Expectations — the only hype phase we track for investment signals */
export type PeakStatus = "rising" | "falling";

export interface HypeTechnology {
  id: string;
  name: string;
  nameKo: string;
  peakStatus: PeakStatus;
  description: string;
  descriptionKo: string;
  firmIds: string[];
}

export interface ClassificationResult {
  firmId: string;
  tier: ClassificationTier;
  signal: Signal;
  scores: ClassificationScores;
  totalScore: number;
  confidence: number;           // 0–1
  narrative: string;
  marketPhase: MarketPhase;
  classifiedAt: string;
  classifiedBy: "rules" | "ai" | "hybrid";
}
