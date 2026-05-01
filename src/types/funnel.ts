/**
 * Investment Funnel — 매수 의사결정의 4단계 깔때기.
 *
 *  Candidate (모든 firm)
 *    ↓ 카테고리 phase가 Tornado/BA + role ≥ Prince
 *  Potential (잠재 후보)
 *    ↓ 가격이 실제로 검증 (12w 모멘텀 양수)
 *  Confirmed (가격 검증된 잠재 고릴라)
 *    ↓ tier ∈ {Gorilla, Pot Gorilla} + 카테고리 Gorilla/King role
 *  Hold (장기 보유 대상)
 *
 * 각 단계는 누적: Hold ⊂ Confirmed ⊂ Potential ⊂ Candidate.
 * 유 회장님 비전: "처음에 모든 회사를 깔때기에 넣었다가, 가격이 실제로 오르면
 * 고릴라로 판정해 장기 보유" — 이 흐름을 자동으로 분류·시각화.
 */

export type FunnelStage = "Candidate" | "Potential" | "Confirmed" | "Hold";

export const FUNNEL_STAGES: FunnelStage[] = ["Candidate", "Potential", "Confirmed", "Hold"];

export interface FunnelPosition {
  firmId: string;
  /** Highest stage this firm satisfies (Hold > Confirmed > Potential > Candidate). */
  stage: FunnelStage;
  /** 한국어 진단 이유 */
  reasonsKo: string[];
  reasonsEn: string[];
  /** 다음 stage로 가려면 부족한 점 */
  blockersKo: string[];
  blockersEn: string[];
}
