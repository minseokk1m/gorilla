/**
 * Product Category model — ecosystem.layer 안에 들어가는 실제 제품 카테고리.
 *
 * 같은 layer(예: AI > memory-storage)도 안에 여러 제품 카테고리(HBM, DRAM,
 * NAND, HDD)가 공존하고 각 카테고리마다:
 *  - 별도 leader/challenger 구조 (HBM은 SK Gorilla / Micron Prince)
 *  - 별도 lifecycle phase (HBM은 Tornado / DRAM은 Maturing Main Street)
 *  - 다른 firm이 다른 강도(매출 비중)로 참여
 *
 * 이 모델 위에 매도/리밸런싱 신호(Stage F)와 Investment Funnel(Stage G)이
 * 올라간다. DRAM 쇠퇴 → 모든 DRAM-heavy firm sell signal, HBM 부상 → SK매수
 * 같은 카테고리-수준 전략을 자동 표현하기 위한 토대.
 */

import type { EcosystemId } from "./ecosystem";

/**
 * 카테고리 자체의 lifecycle phase. firm-수준 MarketPhase와 별개로 카테고리 자체가
 * 어디 단계인지 표시 (Moore 8-phase 모델 그대로 차용 + Emerging 추가).
 */
export type ProductCategoryPhase =
  | "Emerging"               // 아직 표준 정착 전, 초기 시장
  | "Bowling Alley"          // 니치별 PMF 확보 단계
  | "Tornado"                // 폭발적 채택, 표준 결정
  | "Thriving Main Street"   // 성장 메인
  | "Maturing Main Street"   // 성숙 메인 (캐시카우 정점)
  | "Declining Main Street"  // 쇠퇴 메인
  | "Fault Line"             // 단층선 — 신 카테고리에 자리 내어주기 시작
  | "End of Life";           // 수명 종료

/** 카테고리 안에서 한 firm이 차지하는 위치. */
export type FirmCategoryRole =
  | "Gorilla"          // 독점 표준 — 카테고리당 1개
  | "King"             // 1위(독점은 아님) — open 시장의 dominant
  | "Prince"           // 2위 도전자
  | "Challenger"       // 3위 이하 의미있는 참여자
  | "Niche";           // 작은 niche/legacy 참여

export interface FirmCategoryParticipation {
  firmId: string;
  /** Category에서의 위치 */
  role: FirmCategoryRole;
  /** firm 전체 매출 중 이 카테고리가 차지하는 대략 비중 (0..1). 모르면 undefined. */
  revenueWeight?: number;
  /** 토론·근거 (optional) */
  rationale?: string;
}

export interface ProductCategory {
  id: string;                  // unique within layer (e.g. "hbm")
  name: string;                // e.g. "HBM"
  nameKo: string;              // 한국어 표시명
  ecosystemId: EcosystemId;
  layerId: string;             // parent layer
  description: string;         // 한 줄 설명
  phase: ProductCategoryPhase;
  /** Why phase is set this way (수명주기 판정 근거) */
  phaseRationale?: string;
  /** 카테고리 안 firm 참여 목록 (Gorilla/King/Prince/Challenger/Niche). */
  participants: FirmCategoryParticipation[];
  /** 카테고리를 뒤따르는 신 카테고리(있으면) — DRAM → HBM 같은 substitution path. */
  successorCategoryId?: string;
}
