/**
 * Data source configuration.
 *
 * 임시: vercel function timeout (free tier 10s 한도)으로 'live' 사용 시 cold
 * start에 ecosystem detail 페이지가 22초+ → 500. 정공법(Suspense streaming +
 * lazy yahoo) 적용 전까지 default를 'mock'으로 회귀. Vercel env에서 'live'로
 * override 가능.
 *
 * "mock"   – 모든 데이터 mock. 가격은 결정적 시드 기반 가짜. 분류·매도·funnel·
 *            substitution 등 핵심 비전은 모두 작동.
 * "live"   – Yahoo Finance 실데이터. 단 cold start에 timeout 위험.
 * "hybrid" – 호환용. live와 동일.
 */
export const DATA_SOURCE = (process.env.DATA_SOURCE ?? "mock") as
  | "mock"
  | "live"
  | "hybrid";

/** Cache TTLs in milliseconds */
export const CACHE_TTL = {
  quote: 5 * 60 * 1000,         // 5 minutes – current price, market cap
  historical: 60 * 60 * 1000,   // 1 hour – 90-day OHLCV candles
  fundamentals: 24 * 60 * 60 * 1000, // 24 hours – revenue growth, gross margin
} as const;

/** Max concurrent Yahoo Finance requests (yahoo는 ~10/sec까지 견딤) */
export const MAX_CONCURRENCY = 10;

/** Delay between batches (ms) to avoid throttling */
export const BATCH_DELAY_MS = 100;
