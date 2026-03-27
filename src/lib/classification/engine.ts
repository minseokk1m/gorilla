import type { Firm } from "@/types/firm";
import type { ClassificationTier, Signal, MarketPhase, ClassificationResult } from "@/types/classification";
import { computeScores, computeTotalScore } from "./rules";
import { StubAIAdapter, type AIClassificationAdapter } from "./ai-adapter";

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

function buildNarrative(firm: Firm, tier: ClassificationTier, totalScore: number, marketShare: number, architectureControl: number, switchingCosts: number): string {
  const sharePercent = Math.round(firm.classificationSignals.estimatedNicheMarketShare * 100);
  const growthPercent = Math.round(firm.revenueGrowthYoY * 100);
  const nrr = Math.round(firm.classificationSignals.netRevenueRetention * 100);

  const tierDescriptions: Record<ClassificationTier, string> = {
    "Gorilla": `${firm.name} is classified as a **Gorilla** — the dominant force in its technology category. With an estimated ${sharePercent}% niche market share and strong architecture control (score: ${architectureControl}/100), it defines the standard that competitors must conform to. Geoffrey Moore's framework identifies gorillas as the primary investment target: their switching costs are prohibitively high (Net Revenue Retention: ${nrr}%), and they are the last company standing after the tornado. Buy and hold.`,
    "Potential Gorilla": `${firm.name} is a **Potential Gorilla** — currently competing in a tornado-phase market where the dominant standard is still being decided. With ${sharePercent}% niche share and ${growthPercent}% revenue growth, it has a credible path to gorilla status. Per Moore's framework, this is the optimal entry point before market consolidation locks in the winner. The risk: another competitor could take the architecture standard instead.`,
    "King": `${firm.name} is classified as a **King** — a strong market leader in a category without a single dominant proprietary standard. Kings enjoy scale advantages and brand recognition (NRR: ${nrr}%) but lack the switching cost moat that defines a true Gorilla. Moore's framework treats Kings as solid but not exceptional investments: they generate steady returns but won't compound like Gorillas because competitors can credibly challenge them.`,
    "Chimpanzee": `${firm.name} is classified as a **Chimpanzee** — a company that competed for gorilla status but did not win the architecture standard. It survives in niche segments where its proprietary approach retains loyal customers, but it cannot expand aggressively into the mainstream. Per Moore's framework, chimpanzees face a shrinking addressable market as gorilla standards absorb more of the customer base. This is a sell signal for long-term investors.`,
    "Monkey": `${firm.name} is classified as a **Monkey** — a commodity clone that competes on price against the gorilla's architecture without offering architectural differentiation. Monkeys generate revenue during tornado phases by undercutting the gorilla, but have no sustainable moat. The gorilla can reclaim their customers at will. Moore's framework recommends avoiding monkey stocks for long-term portfolios.`,
    "In Chasm": `${firm.name} is classified as **In Chasm** — it has captured early adopter enthusiasm but has not yet crossed to the pragmatist early majority. This is the most dangerous stage of the Technology Adoption Life Cycle: many companies never cross. Until ${firm.name} demonstrates a clear beachhead niche domination and a whole product strategy for pragmatists, the investment thesis remains unproven. Avoid.`,
  };

  return tierDescriptions[tier];
}

export async function classifyFirm(firm: Firm): Promise<ClassificationResult> {
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
    narrative = aiNarrative ?? buildNarrative(firm, tier, totalScore, finalScores.marketShare, finalScores.architectureControl, finalScores.switchingCosts);
  } else {
    narrative = buildNarrative(firm, tier, totalScore, finalScores.marketShare, finalScores.architectureControl, finalScores.switchingCosts);
  }

  return { ...partialResult, narrative };
}
