import type { Firm } from "@/types/firm";
import type { ClassificationScores } from "@/types/classification";

export function scoreMarketShare(firm: Firm): number {
  const share = firm.classificationSignals.estimatedNicheMarketShare;
  if (share >= 0.6) return 90 + (share - 0.6) * 25; // up to 100
  if (share >= 0.4) return 70 + (share - 0.4) * 100;
  if (share >= 0.25) return 50 + (share - 0.25) * 133;
  if (share >= 0.1) return 25 + (share - 0.1) * 167;
  return share * 250;
}

export function scoreSwitchingCosts(firm: Firm): number {
  const nrr = firm.classificationSignals.netRevenueRetention;
  const proprietary = firm.classificationSignals.hasProprietaryProtocol;
  let score = 0;
  if (nrr >= 1.3) score = 75;
  else if (nrr >= 1.15) score = 55;
  else if (nrr >= 1.0) score = 35;
  else score = 15;
  if (proprietary) score = Math.min(100, score + 20);
  return score;
}

export function scoreArchitectureControl(firm: Firm): number {
  const { isDefactoStandard, ecosystemPartnerCount, hasProprietaryProtocol } = firm.classificationSignals;
  let score = 0;
  if (isDefactoStandard) score += 50;
  if (hasProprietaryProtocol) score += 20;
  if (ecosystemPartnerCount >= 10000) score += 30;
  else if (ecosystemPartnerCount >= 1000) score += 20;
  else if (ecosystemPartnerCount >= 100) score += 10;
  else score += 2;
  return Math.min(100, score);
}

export function scoreRevenueGrowth(firm: Firm): number {
  const growth = firm.revenueGrowthYoY;
  if (growth >= 0.4) return 85 + Math.min(15, (growth - 0.4) * 50);
  if (growth >= 0.25) return 65 + (growth - 0.25) * 133;
  if (growth >= 0.15) return 45 + (growth - 0.15) * 200;
  if (growth >= 0.05) return 25 + (growth - 0.05) * 200;
  return Math.max(0, growth * 500);
}

export function scoreMarketConcentration(firm: Firm): number {
  const competitors = firm.classificationSignals.competitorCount;
  const share = firm.classificationSignals.estimatedNicheMarketShare;
  let score = 0;
  if (competitors <= 2 && share >= 0.5) score = 85;
  else if (competitors <= 4) score = 60;
  else if (competitors <= 8) score = 40;
  else score = 20;
  return score;
}

export function computeScores(firm: Firm): ClassificationScores {
  return {
    marketShare: Math.min(100, Math.round(scoreMarketShare(firm))),
    switchingCosts: Math.min(100, Math.round(scoreSwitchingCosts(firm))),
    architectureControl: Math.min(100, Math.round(scoreArchitectureControl(firm))),
    revenueGrowth: Math.min(100, Math.round(scoreRevenueGrowth(firm))),
    marketConcentration: Math.min(100, Math.round(scoreMarketConcentration(firm))),
  };
}

export function computeTotalScore(scores: ClassificationScores): number {
  return Math.round(
    scores.marketShare * 0.30 +
    scores.switchingCosts * 0.25 +
    scores.architectureControl * 0.25 +
    scores.revenueGrowth * 0.10 +
    scores.marketConcentration * 0.10
  );
}
