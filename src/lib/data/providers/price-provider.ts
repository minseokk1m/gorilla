import type { PriceHistory } from "@/types/market";
import { MOCK_PRICE_HISTORIES } from "../mock/prices";

export async function getPriceHistory(firmId: string): Promise<PriceHistory | null> {
  return MOCK_PRICE_HISTORIES.find((p) => p.firmId === firmId) ?? null;
}

export async function getAllPriceHistories(): Promise<PriceHistory[]> {
  return MOCK_PRICE_HISTORIES;
}
