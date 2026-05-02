import type { PriceHistory } from "@/types/market";
import { MOCK_PRICE_HISTORIES } from "../mock/prices";
import { DATA_SOURCE } from "../api/config";
import { getLivePriceHistory } from "../api/market-data-service";
import { MOCK_FIRMS } from "../mock/firms";

/**
 * 가격 히스토리.
 * - mock: 시드 기반 mock 사용 (dev 한정).
 * - live: Yahoo Finance 만 사용. yahoo 실패 시 null 반환 (UI에서 'no data' 처리).
 * - hybrid: 사용 안 함 (deprecated; live와 동일하게 처리하되 mock 모드 backward compat 외).
 */
export async function getPriceHistory(firmId: string): Promise<PriceHistory | null> {
  if (DATA_SOURCE === "mock") {
    return MOCK_PRICE_HISTORIES.find((p) => p.firmId === firmId) ?? null;
  }
  const firm = MOCK_FIRMS.find((f) => f.id === firmId);
  if (!firm) return null;
  return (await getLivePriceHistory(firmId, firm.yahooTicker ?? firm.ticker)) ?? null;
}

export async function getAllPriceHistories(): Promise<PriceHistory[]> {
  if (DATA_SOURCE === "mock") return MOCK_PRICE_HISTORIES;

  const results = await Promise.all(
    MOCK_FIRMS.map(async (f) => getLivePriceHistory(f.id, f.yahooTicker ?? f.ticker)),
  );
  return results.filter((p): p is PriceHistory => p !== null);
}
