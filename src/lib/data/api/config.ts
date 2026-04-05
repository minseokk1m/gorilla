/**
 * Data source configuration.
 *
 * "mock"   – all mock data (original behavior)
 * "hybrid" – try live API, fall back to mock on failure (recommended)
 * "live"   – live API only, throws on failure
 */
export const DATA_SOURCE = (process.env.DATA_SOURCE ?? "hybrid") as
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
