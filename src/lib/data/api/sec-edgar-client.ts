/**
 * SEC EDGAR client — 미국 상장사 공식 재무 공시 API.
 *
 * - 무료, API key 불필요. 단 User-Agent 헤더 의무 (rate limit 10 req/sec).
 * - Endpoints:
 *   · ticker→CIK: https://www.sec.gov/files/company_tickers.json
 *   · companyfacts (전 XBRL 재무): https://data.sec.gov/api/xbrl/companyfacts/CIK{cik}.json
 *   · companyconcept (단일 concept): https://data.sec.gov/api/xbrl/companyconcept/CIK{cik}/us-gaap/{tag}.json
 *
 * 한국 firm 등 SEC 외 firm은 skip — 호출 전에 yahooTicker .KS 등으로 필터링.
 */

import { TTLCache } from "./cache";

const SEC_USER_AGENT = "Gorilla Game Investment Analysis platform <seoultower1@gmail.com>";
const SEC_BASE_DATA = "https://data.sec.gov";
const SEC_BASE_FILES = "https://www.sec.gov";
const TTL_TICKERS = 24 * 60 * 60 * 1000; // 24h
const TTL_FACTS = 24 * 60 * 60 * 1000;
const TTL_CONCEPT = 24 * 60 * 60 * 1000;

// ── Ticker → CIK 매핑 ───────────────────────────────────────────────

interface SECCompanyTickersFile {
  [index: string]: { cik_str: number; ticker: string; title: string };
}

let _tickerMapCache: { ts: number; map: Map<string, string> } | null = null;

/** Returns map of UPPER-CASE ticker → 10-digit zero-padded CIK string. */
export async function getTickerToCikMap(): Promise<Map<string, string>> {
  if (_tickerMapCache && Date.now() - _tickerMapCache.ts < TTL_TICKERS) {
    return _tickerMapCache.map;
  }
  try {
    const res = await fetch(`${SEC_BASE_FILES}/files/company_tickers.json`, {
      headers: { "User-Agent": SEC_USER_AGENT },
      next: { revalidate: 86400 },
    });
    if (!res.ok) {
      console.warn("[SEC] tickers fetch failed:", res.status);
      return _tickerMapCache?.map ?? new Map();
    }
    const data = (await res.json()) as SECCompanyTickersFile;
    const map = new Map<string, string>();
    for (const k of Object.keys(data)) {
      const row = data[k];
      const cik = String(row.cik_str).padStart(10, "0");
      map.set(row.ticker.toUpperCase(), cik);
    }
    _tickerMapCache = { ts: Date.now(), map };
    return map;
  } catch (e) {
    console.warn("[SEC] tickers error:", (e as Error).message);
    return _tickerMapCache?.map ?? new Map();
  }
}

export async function getCikForTicker(ticker: string): Promise<string | null> {
  // SEC 매핑은 미국 공시 ticker만. 한국 firm("005930.KS")이나 비미국 ticker는 무시.
  if (!/^[A-Z][A-Z0-9.\-]*$/i.test(ticker) || ticker.includes(".KS") || ticker.includes(".KQ")) {
    return null;
  }
  const map = await getTickerToCikMap();
  return map.get(ticker.toUpperCase()) ?? null;
}

// ── Company facts (전체 XBRL) ───────────────────────────────────────

export interface SECCompanyFacts {
  cik: number;
  entityName: string;
  facts: {
    "us-gaap"?: Record<string, SECConcept>;
    dei?: Record<string, SECConcept>;
    [taxonomy: string]: Record<string, SECConcept> | undefined;
  };
}

export interface SECConcept {
  label?: string;
  description?: string;
  units: Record<string, SECConceptValue[]>;
}

export interface SECConceptValue {
  /** Fiscal period end date (YYYY-MM-DD) */
  end: string;
  /** Reported value */
  val: number;
  /** Accession number */
  accn: string;
  /** Fiscal year (e.g. 2024) */
  fy: number;
  /** Fiscal period (e.g. "FY", "Q1", "Q2") */
  fp: string;
  /** Form type (e.g. "10-K", "10-Q") */
  form: string;
  /** Filing date */
  filed: string;
  /** Frame (cumulative period like "CY2024Q1") */
  frame?: string;
}

const factsCache = new TTLCache<SECCompanyFacts>(TTL_FACTS);

export async function getCompanyFacts(ticker: string): Promise<SECCompanyFacts | null> {
  const cik = await getCikForTicker(ticker);
  if (!cik) return null;
  const cached = factsCache.get(cik);
  if (cached) return cached;
  try {
    const res = await fetch(`${SEC_BASE_DATA}/api/xbrl/companyfacts/CIK${cik}.json`, {
      headers: { "User-Agent": SEC_USER_AGENT },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as SECCompanyFacts;
    factsCache.set(cik, data);
    return data;
  } catch (e) {
    console.warn("[SEC] facts error for", ticker, (e as Error).message);
    return null;
  }
}

// ── Single concept (e.g. us-gaap/Revenues) ──────────────────────────

const conceptCache = new TTLCache<SECConcept>(TTL_CONCEPT);

export async function getCompanyConcept(
  ticker: string,
  taxonomy: "us-gaap" | "dei",
  tag: string,
): Promise<SECConcept | null> {
  const cik = await getCikForTicker(ticker);
  if (!cik) return null;
  const key = `${cik}:${taxonomy}:${tag}`;
  const cached = conceptCache.get(key);
  if (cached) return cached;
  try {
    const res = await fetch(`${SEC_BASE_DATA}/api/xbrl/companyconcept/CIK${cik}/${taxonomy}/${tag}.json`, {
      headers: { "User-Agent": SEC_USER_AGENT },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as SECConcept;
    conceptCache.set(key, data);
    return data;
  } catch (e) {
    console.warn("[SEC] concept error for", ticker, tag, (e as Error).message);
    return null;
  }
}
