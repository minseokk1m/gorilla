import { NextResponse } from "next/server";
import { MOCK_FIRMS } from "@/lib/data/mock/firms";
import { getAllClassifications } from "@/lib/data/providers/firm-provider";

export async function GET() {
  const classifications = await getAllClassifications();

  const buy = MOCK_FIRMS.filter((f) => classifications.get(f.id)?.signal === "BUY")
    .map((f) => ({ ticker: f.ticker, name: f.name, slug: f.slug, tier: classifications.get(f.id)!.tier, score: classifications.get(f.id)!.totalScore }))
    .sort((a, b) => b.score - a.score);

  const watch = MOCK_FIRMS.filter((f) => classifications.get(f.id)?.signal === "WATCH")
    .map((f) => ({ ticker: f.ticker, name: f.name, slug: f.slug, tier: classifications.get(f.id)!.tier, score: classifications.get(f.id)!.totalScore }));

  const sell = MOCK_FIRMS.filter((f) => ["SELL", "AVOID"].includes(classifications.get(f.id)?.signal ?? ""))
    .map((f) => ({ ticker: f.ticker, name: f.name, slug: f.slug, tier: classifications.get(f.id)!.tier, score: classifications.get(f.id)!.totalScore }));

  return NextResponse.json({
    data: { buy, watch, sell },
    meta: { timestamp: new Date().toISOString(), source: "mock" },
  });
}
