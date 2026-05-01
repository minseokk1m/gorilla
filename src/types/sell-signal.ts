/**
 * Sell / Rebalance signals — 매수 중심 분석 위에 매도·리밸런싱 뷰 추가.
 *
 * 룰 5종:
 *  - EXIT-CATEGORY-DECLINE: firm 매출 비중이 큰 카테고리(≥30%)가
 *    Declining/Fault Line/EoL → 매도. 핵심 케이스: HDD-heavy firm(STX/WDC),
 *    enterprise network switching(CSCO 일부), RPA(PATH).
 *  - EXIT-MAINSTREET-EXIT: classification phase가 Maturing/Declining +
 *    revenueGrowth < 5% + 12w 가격 음수 → 메인스트리트 끝물 매도.
 *  - REBALANCE-SUCCESSOR-MISS: firm 참여 카테고리에 successor 카테고리가 있고
 *    firm이 그 successor에 참여 안 함 → 후계 강자로 리밸런싱.
 *    예: HDD firm은 NAND/SSD에 참여 안 하면 매도 + NAND 강자 매수.
 *  - WARN-MOMENTUM-CRASH: 4w 가격 -10% 이하 + 뉴스 sentiment ≤ -0.3 →
 *    급변 경고. tier·매수 신호 그대로 두고 관찰만.
 *  - WARN-CONFLICT: Moore 충돌 carrier (현재 layer에 등급 충돌 발생 firm) →
 *    데이터·이론 검증 필요.
 */

export type SellSignalSeverity = "EXIT" | "REBALANCE" | "WARN";

export type SellSignalKind =
  | "EXIT-CATEGORY-DECLINE"
  | "EXIT-MAINSTREET-EXIT"
  | "REBALANCE-SUCCESSOR-MISS"
  | "WARN-MOMENTUM-CRASH"
  | "WARN-CONFLICT";

export interface SellSignal {
  firmId: string;
  kind: SellSignalKind;
  severity: SellSignalSeverity;
  /** 한 줄 한국어 이유 */
  reasonKo: string;
  /** 한 줄 영문 이유 */
  reasonEn: string;
  /** 토론·검증용 evidence */
  evidence: {
    categoryId?: string;
    categoryName?: string;
    categoryPhase?: string;
    revenueWeight?: number;
    pricePct4w?: number;
    pricePct12w?: number;
    sentimentScore?: number;
    successorCategoryId?: string;
    successorCategoryName?: string;
  };
}
