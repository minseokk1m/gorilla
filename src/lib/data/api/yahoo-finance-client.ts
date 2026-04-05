import YahooFinance from "yahoo-finance2";

/**
 * Low-level Yahoo Finance API wrapper (yahoo-finance2 v3).
 * Each function returns null on failure — callers handle fallback.
 */

// Singleton instance
const yf = new YahooFinance({
  suppressNotices: ["yahooSurvey", "ripHistorical"],
});

export interface YFQuote {
  price: number;
  previousClose: number;
  marketCap: number; // raw USD (not billions)
  currency: string;
}

export interface YFCandle {
  date: string; // YYYY-MM-DD
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface YFFundamentals {
  revenueGrowthYoY: number; // decimal e.g. 0.32
  grossMargin: number; // decimal e.g. 0.69
}

export async function fetchQuote(ticker: string): Promise<YFQuote | null> {
  try {
    const q = await yf.quote(ticker);
    if (!q || !q.regularMarketPrice) return null;
    return {
      price: q.regularMarketPrice,
      previousClose: q.regularMarketPreviousClose ?? q.regularMarketPrice,
      marketCap: q.marketCap ?? 0,
      currency: q.currency ?? "USD",
    };
  } catch (e) {
    console.warn(`[YF] quote failed for ${ticker}:`, (e as Error).message);
    return null;
  }
}

export async function fetchHistorical(
  ticker: string,
  days = 90,
): Promise<YFCandle[] | null> {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days - 10); // buffer for weekends/holidays

    const result = await yf.historical(ticker, {
      period1: startDate,
      period2: endDate,
      interval: "1d",
    });

    if (!result || result.length === 0) return null;

    const candles: YFCandle[] = result
      .map((r) => ({
        date:
          r.date instanceof Date
            ? r.date.toISOString().split("T")[0]
            : String(r.date).split("T")[0],
        open: +(r.open ?? 0).toFixed(2),
        high: +(r.high ?? 0).toFixed(2),
        low: +(r.low ?? 0).toFixed(2),
        close: +(r.close ?? 0).toFixed(2),
        volume: Math.round(r.volume ?? 0),
      }))
      .filter((c) => c.close > 0);

    // Return last `days` trading days
    return candles.slice(-days);
  } catch (e) {
    console.warn(`[YF] historical failed for ${ticker}:`, (e as Error).message);
    return null;
  }
}

export interface YFNewsItem {
  uuid: string;
  title: string;
  publisher: string;
  link: string;
  publishedAt: string; // ISO string
  relatedTickers: string[];
}

export async function fetchNews(
  ticker: string,
): Promise<YFNewsItem[] | null> {
  try {
    const result = await yf.search(ticker, { newsCount: 8 });
    if (!result?.news || result.news.length === 0) return null;

    return result.news
      .filter((n) => n.type === "STORY")
      .map((n) => ({
        uuid: n.uuid ?? crypto.randomUUID(),
        title: n.title ?? "",
        publisher: n.publisher ?? "Yahoo Finance",
        link: n.link ?? "#",
        publishedAt:
          n.providerPublishTime instanceof Date
            ? n.providerPublishTime.toISOString()
            : typeof n.providerPublishTime === "number"
              ? new Date(n.providerPublishTime * 1000).toISOString()
              : new Date().toISOString(),
        relatedTickers: (n.relatedTickers ?? []) as string[],
      }));
  } catch (e) {
    console.warn(`[YF] news failed for ${ticker}:`, (e as Error).message);
    return null;
  }
}

export async function fetchFundamentals(
  ticker: string,
): Promise<YFFundamentals | null> {
  try {
    const summary = await yf.quoteSummary(ticker, {
      modules: ["financialData"],
    });

    const fd = summary?.financialData;
    if (!fd) return null;

    return {
      revenueGrowthYoY: fd.revenueGrowth ?? 0,
      grossMargin: fd.grossMargins ?? 0,
    };
  } catch (e) {
    console.warn(`[YF] fundamentals failed for ${ticker}:`, (e as Error).message);
    return null;
  }
}
