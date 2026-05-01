/**
 * Ecosystem model — 거시 테마 × value-chain layer 분류
 *
 * Moore의 'whole product' 사상을 데이터 모델로 옮긴 것. 평면 Sector(예: Semiconductors,
 * Cloud Infrastructure)는 한 기업이 더 큰 기술 흐름의 어디에 위치하는지 보여주지 못한다.
 * Ecosystem(예: AI)을 도입하고 그 안에 upstream→downstream Layer를 정의해, 같은 ecosystem
 * 안에서 카테고리당 고릴라가 하나라는 Moore 원칙이 자동 검증되게 한다.
 *
 * 기업 ↔ ecosystem 관계는 별도 registry(FirmEcosystemMembership[])로 둔다.
 * 대부분 1:1(primary), 소수의 cross-cutting 기업은 1:N(primary + secondary).
 */

export type EcosystemId =
  | "ai"
  | "energy-transition"
  | "defense"
  | "korean-industrial"
  | "crypto"
  | "biotech"
  | "auto-ev-battery"
  | "space";

export interface EcosystemLayer {
  /** Slug-style id, unique within parent ecosystem (e.g. "compute"). */
  id: string;
  name: string;
  nameKo: string;
  /** value-chain 위치 한 줄 설명 (예: "AI 모델 학습용 GPU·가속기 공급") */
  description: string;
  /** Upstream → downstream 순서 (1부터). 같은 ecosystem 안에서 정렬용. */
  position: number;
}

export interface Ecosystem {
  id: EcosystemId;
  slug: string;
  name: string;
  nameKo: string;
  /** 한 줄 정의 (목록 카드용) */
  tagline: string;
  /** 왜 이 ecosystem이 의미 있는 단위인가 (테제) */
  thesis: string;
  layers: EcosystemLayer[];
}

export type MembershipRole = "primary" | "secondary";

export interface FirmEcosystemMembership {
  firmId: string;
  ecosystemId: EcosystemId;
  /** EcosystemLayer.id (parent ecosystem 안에서 unique) */
  layerId: string;
  role: MembershipRole;
  /** 왜 이 layer인가 — 토론·검증용 (optional) */
  rationale?: string;
}
