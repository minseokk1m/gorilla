import type { PriceHistory } from "@/types/market";
import { MOCK_PRICE_HISTORIES } from "../mock/prices";
import { DATA_SOURCE } from "../api/config";
import { getLivePriceHistory } from "../api/market-data-service";
import { MOCK_FIRMS } from "../mock/firms";

export async function getPriceHistory(firmId: string): Promise<PriceHistory | null> {
  if (DATA_SOURCE !== "mock") {
    const firm = MOCK_FIRMS.find((f) => f.id === firmId);
    if (firm) {
      const live = await getLivePriceHistory(firmId, firm.yahooTicker ?? firm.ticker);
      if (live) return live;
      if (DATA_SOURCE === "live") return null; // strict mode: no fallback
    }
  }
  // Fallback to mock
  return MOCK_PRICE_HISTORIES.find((p) => p.firmId === firmId) ?? null;
}

export async function getAllPriceHistories(): Promise<PriceHistory[]> {
  if (DATA_SOURCE !== "mock") {
    const results = await Promise.all(
      MOCK_FIRMS.map(async (f) => {
        const live = await getLivePriceHistory(f.id, f.yahooTicker ?? f.ticker);
        if (live) return live;
        // Per-ticker fallback to mock in hybrid mode
        if (DATA_SOURCE === "hybrid") {
          return MOCK_PRICE_HISTORIES.find((p) => p.firmId === f.id) ?? null;
        }
        return null;
      }),
    );
    return results.filter((p): p is PriceHistory => p !== null);
  }
  return MOCK_PRICE_HISTORIES;
}
