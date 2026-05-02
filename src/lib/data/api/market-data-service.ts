import type { PriceHistory, OHLCVCandle } from "@/types/market";
import type { Firm } from "@/types/firm";
import { computeRSI } from "@/lib/indicators/rsi";
import { TTLCache } from "./cache";
import { CACHE_TTL, MAX_CONCURRENCY, BATCH_DELAY_MS, DATA_SOURCE } from "./config";
import { fetchQuote, fetchHistorical, fetchFundamentals, fetchNews } from "./yahoo-finance-client";
import type { YFQuote, YFFundamentals, YFNewsItem } from "./yahoo-finance-client";
import { getSecAnnualRevenue } from "./sec-revenue";

// ── Caches ──────────────────────────────────────────────
const quoteCache = new TTLCache<YFQuote>(CACHE_TTL.quote);
const historicalCache = new TTLCache<OHLCVCandle[]>(CACHE_TTL.historical);
const fundamentalsCache = new TTLCache<YFFundamentals>(CACHE_TTL.fundamentals);
const priceHistoryCache = new TTLCache<PriceHistory>(CACHE_TTL.historical);
const newsCache = new TTLCache<YFNewsItem[]>(CACHE_TTL.historical); // 1 hour

// ── Concurrency limiter ─────────────────────────────────
async function withConcurrency<T>(
  tasks: (() => Promise<T>)[],
  limit: number,
  delayMs: number,
): Promise<T[]> {
  const results: T[] = [];
  for (let i = 0; i < tasks.length; i += limit) {
    const batch = tasks.slice(i, i + limit);
    const batchResults = await Promise.all(batch.map((fn) => fn()));
    results.push(...batchResults);
    if (i + limit < tasks.length) {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  return results;
}

// ── Public: get live quote (cached) ─────────────────────
export async function getQuote(ticker: string): Promise<YFQuote | null> {
  if (DATA_SOURCE === "mock") return null;

  const cached = quoteCache.get(ticker);
  if (cached) return cached;

  const quote = await fetchQuote(ticker);
  if (quote) quoteCache.set(ticker, quote);
  return quote;
}

// ── Public: get live candles (cached) ───────────────────
export async function getCandles(ticker: string): Promise<OHLCVCandle[] | null> {
  if (DATA_SOURCE === "mock") return null;

  const cached = historicalCache.get(ticker);
  if (cached) return cached;

  const raw = await fetchHistorical(ticker, 90);
  if (raw) {
    const candles: OHLCVCandle[] = raw.map((c) => ({
      date: c.date,
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
      volume: c.volume,
    }));
    historicalCache.set(ticker, candles);
    return candles;
  }
  return null;
}

// ── Public: get live fundamentals (cached) ──────────────
export async function getFundamentals(ticker: string): Promise<YFFundamentals | null> {
  if (DATA_SOURCE === "mock") return null;

  const cached = fundamentalsCache.get(ticker);
  if (cached) return cached;

  const data = await fetchFundamentals(ticker);
  if (data) fundamentalsCache.set(ticker, data);
  return data;
}

// ── Public: build full PriceHistory from live data ──────
export async function getLivePriceHistory(
  firmId: string,
  ticker: string,
): Promise<PriceHistory | null> {
  if (DATA_SOURCE === "mock") return null;

  const cached = priceHistoryCache.get(firmId);
  if (cached) return cached;

  const [candles, quote] = await Promise.all([
    getCandles(ticker),
    getQuote(ticker),
  ]);

  if (!candles || candles.length < 2) return null;

  const closes = candles.map((c) => c.close);
  const rsi = computeRSI(closes);
  const currentPrice = quote?.price ?? closes[closes.length - 1];
  const len = closes.length;

  const priceHistory: PriceHistory = {
    firmId,
    ticker,
    candles,
    rsi,
    currentPrice: +currentPrice.toFixed(2),
    priceChange1D: len >= 2 ? +((closes[len - 1] / closes[len - 2] - 1)).toFixed(4) : 0,
    priceChange1W: len >= 6 ? +((closes[len - 1] / closes[len - 6] - 1)).toFixed(4) : 0,
    priceChange1M: len >= 22 ? +((closes[len - 1] / closes[len - 22] - 1)).toFixed(4) : 0,
  };

  priceHistoryCache.set(firmId, priceHistory);
  return priceHistory;
}

// ── Public: get live news (cached) ──────────────────────
export async function getLiveNews(ticker: string): Promise<YFNewsItem[] | null> {
  if (DATA_SOURCE === "mock") return null;

  const cached = newsCache.get(ticker);
  if (cached) return cached;

  const news = await fetchNews(ticker);
  if (news && news.length > 0) {
    newsCache.set(ticker, news);
    return news;
  }
  return null;
}

// ── Public: overlay live market data onto a firm ────────
export async function getMarketFirmOverlay(
  ticker: string,
): Promise<{ marketCapUSD: number; revenueGrowthYoY: number; grossMargin: number } | null> {
  if (DATA_SOURCE === "mock") return null;

  const [quote, fundamentals] = await Promise.all([
    getQuote(ticker),
    getFundamentals(ticker),
  ]);

  // Yahoo fundamentals 부재 시 SEC EDGAR fallback (미국 firm만 — 한국 ticker는
  // SEC에 매핑 없음). marketCap은 yahoo가 전적으로 책임 (SEC는 quote 안 줌).
  let revGrowth = fundamentals?.revenueGrowthYoY ?? 0;
  if (!fundamentals?.revenueGrowthYoY) {
    const sec = await getSecAnnualRevenue(ticker);
    if (sec && Number.isFinite(sec.growthYoY)) revGrowth = sec.growthYoY;
  }

  if (!quote && !fundamentals && revGrowth === 0) return null;

  return {
    marketCapUSD: quote ? +(quote.marketCap / 1_000_000_000).toFixed(1) : 0,
    revenueGrowthYoY: revGrowth,
    grossMargin: fundamentals?.grossMargin ?? 0,
  };
}

// ── Public: hydrate a firm with live data ───────────────
export function hydrateFirm(
  firm: Firm,
  overlay: { marketCapUSD: number; revenueGrowthYoY: number; grossMargin: number },
): Firm {
  return {
    ...firm,
    marketCapUSD: overlay.marketCapUSD || firm.marketCapUSD,
    revenueGrowthYoY: overlay.revenueGrowthYoY || firm.revenueGrowthYoY,
    grossMargin: overlay.grossMargin || firm.grossMargin,
  };
}

// ── Public: prefetch all data for a list of firms ───────
export async function prefetchAllMarketData(
  firms: Firm[],
): Promise<void> {
  if (DATA_SOURCE === "mock") return;

  console.log(`[MarketData] prefetching ${firms.length} tickers...`);
  const start = Date.now();

  // Prefetch quotes + fundamentals in parallel batches
  const tasks = firms.map((f) => async () => {
    await Promise.all([
      getQuote(f.ticker),
      getFundamentals(f.ticker),
      getCandles(f.ticker),
    ]);
  });

  await withConcurrency(tasks, MAX_CONCURRENCY, BATCH_DELAY_MS);

  console.log(`[MarketData] prefetch done in ${Date.now() - start}ms`);
}
