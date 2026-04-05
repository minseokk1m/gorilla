import type { Firm } from "@/types/firm";
import type { ClassificationScores } from "@/types/classification";

/**
 * Gorilla Game scoring engine — aligned with Geoffrey Moore's 6 criteria:
 * 1. Proprietary Architecture (architectureControl)
 * 2. Switching Costs (switchingCosts)
 * 3. Category Dominance (marketShare)
 * 4. Increasing Returns / Network Effects (networkEffects)
 * 5. Tornado Stage Winner (implied by scores + revenueGrowth)
 * 6. Ecosystem Control (ecosystemControl)
 */

export function scoreMarketShare(firm: Firm): number {
  const share = firm.classificationSignals.estimatedNicheMarketShare;
  if (share >= 0.8) return 95 + Math.min(5, (share - 0.8) * 25);
  if (share >= 0.6) return 85 + (share - 0.6) * 50;
  if (share >= 0.4) return 65 + (share - 0.4) * 100;
  if (share >= 0.25) return 45 + (share - 0.25) * 133;
  if (share >= 0.1) return 20 + (share - 0.1) * 167;
  return share * 200;
}

export function scoreSwitchingCosts(firm: Firm): number {
  const nrr = firm.classificationSignals.netRevenueRetention;
  const proprietary = firm.classificationSignals.hasProprietaryProtocol;
  let score = 0;

  // NRR is a direct proxy for switching costs
  if (nrr >= 1.3) score = 75;
  else if (nrr >= 1.15) score = 55;
  else if (nrr >= 1.0) score = 35;
  else score = 15;

  // Proprietary protocol significantly raises switching costs
  if (proprietary) score = Math.min(100, score + 20);

  // De facto standard means ultimate switching costs (e.g., ASML — no alternative exists)
  if (firm.classificationSignals.isDefactoStandard && proprietary) {
    score = Math.max(score, 90);
  }

  return score;
}

export function scoreArchitectureControl(firm: Firm): number {
  const { isDefactoStandard, hasProprietaryProtocol } = firm.classificationSignals;
  let score = 0;

  // De facto standard is the core gorilla criterion
  if (isDefactoStandard) score += 60;

  // Proprietary protocol strengthens architecture lock-in
  if (hasProprietaryProtocol) score += 25;

  // Bonus for both
  if (isDefactoStandard && hasProprietaryProtocol) score += 15;

  return Math.min(100, score);
}

/** NEW: Network effects / increasing returns scoring */
export function scoreNetworkEffects(firm: Firm): number {
  const ne = firm.classificationSignals.networkEffects;
  // Direct 0-1 signal mapped to 0-100
  return Math.min(100, Math.round(ne * 100));
}

/** NEW: Ecosystem control — based on partner count + standard status */
export function scoreEcosystemControl(firm: Firm): number {
  const { ecosystemPartnerCount, isDefactoStandard } = firm.classificationSignals;
  let score = 0;

  // Partner ecosystem scale
  if (ecosystemPartnerCount >= 10000) score = 80;
  else if (ecosystemPartnerCount >= 5000) score = 65;
  else if (ecosystemPartnerCount >= 1000) score = 50;
  else if (ecosystemPartnerCount >= 100) score = 30;
  else if (ecosystemPartnerCount >= 10) score = 15;
  else score = 5;

  // De facto standard amplifies ecosystem control
  if (isDefactoStandard) score = Math.min(100, score + 20);

  return score;
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

  // Monopoly or near-monopoly (ASML, TSMC at leading edge)
  if (competitors <= 1 && share >= 0.8) return 100;
  if (competitors <= 2 && share >= 0.5) return 85;
  if (competitors <= 3) return 65;
  if (competitors <= 5) return 45;
  if (competitors <= 8) return 30;
  return 15;
}

export function computeScores(firm: Firm): ClassificationScores {
  return {
    marketShare: Math.min(100, Math.round(scoreMarketShare(firm))),
    switchingCosts: Math.min(100, Math.round(scoreSwitchingCosts(firm))),
    architectureControl: Math.min(100, Math.round(scoreArchitectureControl(firm))),
    networkEffects: Math.min(100, Math.round(scoreNetworkEffects(firm))),
    ecosystemControl: Math.min(100, Math.round(scoreEcosystemControl(firm))),
    revenueGrowth: Math.min(100, Math.round(scoreRevenueGrowth(firm))),
    marketConcentration: Math.min(100, Math.round(scoreMarketConcentration(firm))),
  };
}

/**
 * Weighted total score — aligned with Moore's 6 gorilla criteria:
 * Architecture + Switching costs + Market share are the core triad.
 * Network effects and ecosystem control are strong amplifiers.
 * Revenue growth and market concentration are supporting signals.
 */
export function computeTotalScore(scores: ClassificationScores): number {
  return Math.round(
    scores.architectureControl * 0.22 +
    scores.switchingCosts * 0.20 +
    scores.marketShare * 0.18 +
    scores.networkEffects * 0.15 +
    scores.ecosystemControl * 0.13 +
    scores.revenueGrowth * 0.06 +
    scores.marketConcentration * 0.06
  );
}
