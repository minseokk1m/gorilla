import type { Firm } from "@/types/firm";
import type { ClassificationTier, Signal, MarketPhase, ClassificationResult } from "@/types/classification";
import { computeScores, computeTotalScore } from "./rules";
import { StubAIAdapter, type AIClassificationAdapter } from "./ai-adapter";
import en from "../../../messages/en.json";
import ko from "../../../messages/ko.json";

const MESSAGES = { en, ko } as const;
type Locale = keyof typeof MESSAGES;

const aiAdapter: AIClassificationAdapter = new StubAIAdapter();

/**
 * Tier resolution aligned with expert gorilla criteria:
 * - Gorilla: dominant architecture + high switching costs + high market share + network effects
 * - Potential Gorilla: strong architecture play, still consolidating
 * - King: market leader without architecture lock-in
 * - Chimpanzee: competed for gorilla but lost
 * - Monkey: commodity player, no architecture
 * - In Chasm: pre-mainstream
 */
function resolveTier(
  totalScore: number,
  scores: { marketShare: number; architectureControl: number; switchingCosts: number; networkEffects: number; ecosystemControl: number },
): ClassificationTier {
  // Gorilla: strong across all core dimensions
  if (
    totalScore >= 75 &&
    scores.architectureControl >= 80 &&
    scores.switchingCosts >= 70 &&
    scores.marketShare >= 60
  ) {
    return "Gorilla";
  }

  // Potential Gorilla: strong architecture play, building dominance
  if (
    totalScore >= 60 &&
    scores.architectureControl >= 60 &&
    (scores.switchingCosts >= 50 || scores.networkEffects >= 50)
  ) {
    return "Potential Gorilla";
  }

  // King: market leader but without full architecture lock-in
  if (totalScore >= 50 && scores.marketShare >= 40 && scores.switchingCosts >= 40) {
    return "King";
  }

  // Two-track split based on architecture control:
  // High arch → proprietary market (Chimp/Monkey), Low arch → open market (Prince/Serf)

  // Chimpanzee: lost the architecture war but had a proprietary play
  if (totalScore >= 35 && scores.architectureControl >= 40) return "Chimpanzee";

  // Prince: credible competitor in an open market (no proprietary standard)
  if (totalScore >= 35) return "Prince";

  // Monkey: clones the gorilla architecture at a discount
  if (totalScore >= 20 && scores.architectureControl >= 30) return "Monkey";

  // Serf: undifferentiated small player in an open market
  if (totalScore >= 20) return "Serf";

  return "In Chasm";
}

function resolveSignal(tier: ClassificationTier): Signal {
  switch (tier) {
    case "Gorilla": return "BUY";
    case "Potential Gorilla": return "BUY";
    case "King": return "WATCH";
    case "Prince": return "WATCH";
    case "Serf": return "AVOID";
    case "Chimpanzee": return "SELL";
    case "Monkey": return "AVOID";
    case "In Chasm": return "AVOID";
  }
}

function resolveMarketPhase(firm: Firm, tier: ClassificationTier): MarketPhase {
  const growth = firm.revenueGrowthYoY;
  if (growth >= 0.4 && (tier === "Gorilla" || tier === "Potential Gorilla")) return "Tornado";
  if (growth >= 0.2 && tier !== "In Chasm") return "Bowling Alley";
  if (growth >= 0.08) return "Main Street";
  if (tier === "In Chasm") return "Early Market";
  return "Main Street";
}

function buildNarrative(
  firm: Firm,
  tier: ClassificationTier,
  totalScore: number,
  marketShare: number,
  architectureControl: number,
  switchingCosts: number,
  locale: Locale = "en",
): string {
  const sharePercent = Math.round(firm.classificationSignals.estimatedNicheMarketShare * 100);
  const growthPercent = Math.round(firm.revenueGrowthYoY * 100);
  const nrr = Math.round(firm.classificationSignals.netRevenueRetention * 100);

  const template = MESSAGES[locale].narratives[tier as keyof typeof MESSAGES[typeof locale]["narratives"]];
  return template
    .replace("{name}", firm.name)
    .replace("{sharePercent}", String(sharePercent))
    .replace("{growthPercent}", String(growthPercent))
    .replace("{nrr}", String(nrr))
    .replace("{architectureControl}", String(architectureControl));
}

export async function classifyFirm(firm: Firm, locale: Locale = "en"): Promise<ClassificationResult> {
  const ruleScores = computeScores(firm);

  let finalScores = { ...ruleScores };
  let classifiedBy: "rules" | "ai" | "hybrid" = "rules";

  if (aiAdapter.isEnabled()) {
    const aiOverride = await aiAdapter.scoreOverride(firm, ruleScores);
    if (aiOverride) {
      finalScores = { ...ruleScores, ...aiOverride };
      classifiedBy = "hybrid";
    }
  }

  const totalScore = computeTotalScore(finalScores);
  const tier = resolveTier(totalScore, finalScores);
  const signal = resolveSignal(tier);
  const marketPhase = resolveMarketPhase(firm, tier);

  const partialResult = {
    firmId: firm.id,
    tier,
    signal,
    scores: finalScores,
    totalScore,
    confidence: aiAdapter.isEnabled() ? 0.85 : 0.70,
    marketPhase,
    classifiedAt: new Date().toISOString(),
    classifiedBy,
  };

  let narrative: string;
  if (aiAdapter.isEnabled()) {
    const aiNarrative = await aiAdapter.generateNarrative(firm, partialResult);
    narrative = aiNarrative ?? buildNarrative(firm, tier, totalScore, finalScores.marketShare, finalScores.architectureControl, finalScores.switchingCosts, locale);
  } else {
    narrative = buildNarrative(firm, tier, totalScore, finalScores.marketShare, finalScores.architectureControl, finalScores.switchingCosts, locale);
  }

  return { ...partialResult, narrative };
}
