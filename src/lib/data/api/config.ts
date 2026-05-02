/**
 * Data source configuration.
 *
 * "mock"   – 모든 데이터 mock (dev 환경 전용; Yahoo 호출 부담 회피).
 * "live"   – Yahoo Finance 실데이터만 사용. price/news는 yahoo 실패 시 빈 값.
 *            firms.ts의 base 필드(marketCap·revenueGrowth 등)는 yahoo가 못
 *            덮을 때 firms.ts 값 그대로 분류 엔진 입력으로 사용 (다음 단계에서
 *            'mock-fallback' marker 추가 예정).
 * "hybrid" – 호환용. 동작은 live와 동일 (mock fallback 제거됨).
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

/** Max concurrent Yahoo Finance requests */
export const MAX_CONCURRENCY = 5;

/** Delay between batches (ms) to avoid throttling */
export const BATCH_DELAY_MS = 200;
