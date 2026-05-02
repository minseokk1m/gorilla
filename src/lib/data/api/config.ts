/**
 * Data source configuration.
 *
 * "mock"   – 모든 데이터 mock (dev 환경 전용; Yahoo 호출 부담 회피).
 * "live"   – Yahoo Finance 실데이터만 사용. 페이지별 scoped fetch + Suspense
 *            streaming으로 cold start에 ecosystem detail (50 firm)도 ~10s 안에
 *            완료. firms.ts 의 base 필드(marketCap·revenueGrowth 등)는 yahoo 가
 *            못 덮을 때 fallback.
 * "hybrid" – 호환용. 동작은 live와 동일.
 */
export const DATA_SOURCE = (process.env.DATA_SOURCE ?? "live") as
  | "mock"
  | "live"
  | "hybrid";

/** Cache TTLs in milliseconds */
export const CACHE_TTL = {
  quote: 5 * 60 * 1000,         // 5 minutes – current price, market cap
  historical: 60 * 60 * 1000,   // 1 hour – 90-day OHLCV candles
  fundamentals: 24 * 60 * 60 * 1000, // 24 hours – revenue growth, gross margin
} as const;

/** Max concurrent Yahoo Finance requests. Yahoo는 short burst 25-30까지 견딤
 * — ecosystem detail 페이지 cold start (50 firm × 4 yahoo call = 200) timeout
 * 회피용 상향. 평소엔 TTL cache가 막아 throttle 위험 낮음. */
export const MAX_CONCURRENCY = 25;

/** Delay between batches (ms) to avoid throttling */
export const BATCH_DELAY_MS = 50;
