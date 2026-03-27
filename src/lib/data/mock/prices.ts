import type { PriceHistory, OHLCVCandle } from "@/types/market";
import { computeRSI } from "@/lib/indicators/rsi";
import { MOCK_FIRMS } from "./firms";

// Approximate base prices for realistic charts
const BASE_PRICES: Record<string, number> = {
  microsoft: 415, nvidia: 875, salesforce: 280, servicenow: 820, amazon: 195,
  snowflake: 148, datadog: 128, crowdstrike: 335, mongodb: 410, hubspot: 560,
  "palo-alto": 305, workday: 240, palantir: 24,
  oracle: 130, sap: 195, adobe: 480, intuit: 625, cisco: 48, ibm: 185,
  twilio: 58, okta: 92, splunk: 155, zendesk: 74, newrelic: 70,
  hashicorp: 35, elastic: 105, dynatrace: 56, fortinet: 60, docusign: 62,
  sentinelone: 22, jfrog: 28, aspentech: 200,
  box: 28, dropbox: 24, zoom: 68, ringcentral: 30, fivebelow: 18,
  sprinklr: 9, liveperson: 3, appfolio: 220, amplitude: 9, braze: 36,
  c3ai: 25, asana: 18, uipath: 14, veeva: 200, tradedesk: 87,
  gitlab: 52, confluent: 28, intapp: 32,
};

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash);
}

export function generateMockPriceHistory(firmId: string, ticker: string, slug: string, growthYoY: number): PriceHistory {
  const basePrice = BASE_PRICES[slug] ?? 50;
  const rand = seededRandom(hashString(ticker));
  const volatility = 0.015 + rand() * 0.02;
  const drift = growthYoY > 0.3 ? 0.001 : growthYoY > 0.1 ? 0.0003 : -0.0002;

  const candles: OHLCVCandle[] = [];
  let price = basePrice * (0.85 + rand() * 0.1);
  const now = new Date();

  for (let i = 89; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    const change = (rand() - 0.5) * 2 * volatility + drift;
    const open = price;
    const close = Math.max(0.5, price * (1 + change));
    const high = Math.max(open, close) * (1 + rand() * 0.008);
    const low = Math.min(open, close) * (1 - rand() * 0.008);
    const volume = Math.round(1000000 + rand() * 9000000);

    candles.push({ date: dateStr, open: +open.toFixed(2), high: +high.toFixed(2), low: +low.toFixed(2), close: +close.toFixed(2), volume });
    price = close;
  }

  const closes = candles.map((c) => c.close);
  const rsi = computeRSI(closes);
  const currentPrice = closes[closes.length - 1];

  return {
    firmId,
    ticker,
    candles,
    rsi,
    currentPrice: +currentPrice.toFixed(2),
    priceChange1D: +((currentPrice / closes[closes.length - 2] - 1)).toFixed(4),
    priceChange1W: +((currentPrice / closes[closes.length - 6] - 1)).toFixed(4),
    priceChange1M: +((currentPrice / closes[closes.length - 22] - 1)).toFixed(4),
  };
}

export const MOCK_PRICE_HISTORIES: PriceHistory[] = MOCK_FIRMS.map((f) =>
  generateMockPriceHistory(f.id, f.ticker, f.slug, f.revenueGrowthYoY)
);
