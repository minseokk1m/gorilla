/**
 * SEC EDGAR 매출·매출 성장률 wrapper.
 *
 * 미국 상장사의 latest FY 매출과 직전 FY 대비 YoY 성장률을 SEC 공시에서 추출.
 * Yahoo fundamentals가 실패하거나 일시적 글리치(예: CFLT) 발생 시 보완.
 *
 * 회사마다 us-gaap revenue tag가 달라 fallback chain으로 처리.
 * 같은 fy에 cumulative quarter 데이터가 섞여 들어오므로 max val을 full year로 채택.
 */

import { getCompanyConcept } from "./sec-edgar-client";

const REVENUE_TAG_CANDIDATES: ReadonlyArray<string> = [
  // 가장 최신 us-gaap (ASC 606 적용)
  "RevenueFromContractWithCustomerExcludingAssessedTax",
  // 일반 매출
  "Revenues",
  // 일부 firm (legacy)
  "SalesRevenueNet",
  "SalesRevenueGoodsNet",
];

export interface SECRevenueData {
  ticker: string;
  fy: number;
  revenueUSD: number;
  prevFy: number;
  prevRevenueUSD: number;
  /** Decimal — e.g. 0.114 = +11.4% */
  growthYoY: number;
  /** us-gaap concept tag used */
  tagUsed: string;
  /** Latest 10-K filed date (YYYY-MM-DD) */
  filed: string;
}

/**
 * Latest FY revenue + YoY growth, 또는 null (SEC 공시 없는 firm·외국 firm).
 *
 * 모든 candidate tag를 다 시도해 latest fy가 가장 큰 결과를 선택.
 * (NVDA는 RevenueFromContract에 FY2022까지만, Revenues에 FY2026까지 — 두 tag
 * 모두 valid 데이터가 있으나 사용 추세가 firm마다 다름.)
 */
export async function getSecAnnualRevenue(ticker: string): Promise<SECRevenueData | null> {
  let best: SECRevenueData | null = null;
  for (const tag of REVENUE_TAG_CANDIDATES) {
    const concept = await getCompanyConcept(ticker, "us-gaap", tag);
    if (!concept?.units?.USD) continue;

    // fp=FY + 10-K + start-end ~365일 (full year)만 채택.
    // SEC fy 필드는 firm마다 reporting fy vs data fy로 의미 갈림 — end 일자 기준
    // 으로 그룹핑/정렬하는 게 안전.
    const annual = concept.units.USD.filter((v) => {
      if (v.fp !== "FY" || v.form !== "10-K" || !v.start) return false;
      const days =
        (new Date(v.end).getTime() - new Date(v.start).getTime()) /
        (1000 * 60 * 60 * 24);
      return days >= 350 && days <= 380;
    });
    if (annual.length === 0) continue;

    // end year별 dedupe — 같은 fiscal year end 일자 묶음, 최신 filed 우선.
    const byEndYear = new Map<number, (typeof annual)[number]>();
    for (const v of annual) {
      const endYear = parseInt(v.end.slice(0, 4), 10);
      const existing = byEndYear.get(endYear);
      if (!existing || v.filed > existing.filed) byEndYear.set(endYear, v);
    }

    const sorted = [...byEndYear.values()].sort(
      (a, b) => new Date(b.end).getTime() - new Date(a.end).getTime(),
    );
    if (sorted.length < 2) continue;

    const latest = sorted[0];
    const prev = sorted[1];
    if (prev.val === 0) continue;

    const candidate: SECRevenueData = {
      ticker,
      fy: parseInt(latest.end.slice(0, 4), 10),
      revenueUSD: latest.val,
      prevFy: parseInt(prev.end.slice(0, 4), 10),
      prevRevenueUSD: prev.val,
      growthYoY: (latest.val - prev.val) / prev.val,
      tagUsed: tag,
      filed: latest.filed,
    };

    if (!best || new Date(latest.end).getTime() > new Date(`${best.fy}-12-31`).getTime() - 365 * 24 * 60 * 60 * 1000) {
      // Compare by end-date: prefer the candidate whose latest fiscal-year-end is more recent.
      if (!best || candidate.fy > best.fy ||
          (candidate.fy === best.fy && candidate.revenueUSD > best.revenueUSD)) {
        best = candidate;
      }
    }
  }
  return best;
}
