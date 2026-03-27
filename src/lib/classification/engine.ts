import type { Firm } from "@/types/firm";
import type { ClassificationTier, Signal, MarketPhase, ClassificationResult } from "@/types/classification";
import { computeScores, computeTotalScore } from "./rules";
import { StubAIAdapter, type AIClassificationAdapter } from "./ai-adapter";
import en from "../../../messages/en.json";
import ko from "../../../messages/ko.json";

const MESSAGES = { en, ko } as const;
type Locale = keyof typeof MESSAGES;

const aiAdapter: AIClassificationAdapter = new StubAIAdapter();

function resolveTier(totalScore: number, marketShare: number, architectureControl: number, switchingCosts: number): ClassificationTier {
  if (totalScore >= 80 && marketShare >= 70 && architectureControl >= 80) return "Gorilla";
  if (totalScore >= 65 && marketShare >= 40 && architectureControl >= 60) return "Potential Gorilla";
  if (totalScore >= 55 && switchingCosts >= 60) return "King";
  if (totalScore >= 40) return "Chimpanzee";
  if (totalScore >= 25) return "Monkey";
  return "In Chasm";
}

function resolveSignal(tier: ClassificationTier): Signal {
  switch (tier) {
    case "Gorilla": return "BUY";
    case "Potential Gorilla": return "BUY";
    case "King": return "WATCH";
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

function buildNarrative(firm: Firm, tier: ClassificationTier, totalScore: number, marketShare: number, architectureControl: number, switchingCosts: number, locale: Locale = "en"): string {
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
  const tier = resolveTier(totalScore, finalScores.marketShare, finalScores.architectureControl, finalScores.switchingCosts);
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
