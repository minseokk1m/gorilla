/**
 * Sentiment-Driven Profile — 어느 firm이 펀더멘털보다 심리(narrative·뉴스·
 * 하입)에 의해 가격이 움직이는지 식별.
 *
 * 유 회장님 비전: 'AI 에이전트가 시장 상황·뉴스·회사 상황을 긁어서 특정 회사가
 * 심리적인 요인에 영향을 많이 받는 주식인지 아닌지' 자동 판단.
 *
 * 4 factor 가중 평균(0-100):
 *  - priceVolatility: 1개월 가격 절댓값 (가격이 얼마나 흔들렸나)
 *  - newsSentimentIntensity: layer 뉴스 sentiment 절댓값 × 100
 *  - hypeCycleMembership: hype cycle 후보 여부 (binary 100)
 *  - narrativeValuation: low growth + 큰 시총 또는 hype 후보 → 서사 가격 proxy
 */

export type SentimentLevel = "Low" | "Moderate" | "High" | "Very High";

export interface SentimentDrivenFactors {
  priceVolatility: number;        // 0-100
  newsSentimentIntensity: number; // 0-100
  hypeCycleMembership: boolean;
  narrativeValuation: number;     // 0-100
}

export interface SentimentDrivenProfile {
  firmId: string;
  /** 0-100 — higher means more sentiment-driven, less fundamentals-driven. */
  score: number;
  level: SentimentLevel;
  factors: SentimentDrivenFactors;
  /** Top contributing drivers, ranked. */
  topDriversKo: string[];
  topDriversEn: string[];
}
