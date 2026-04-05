import { NextResponse } from "next/server";
import { getAllFirms, getAllClassifications } from "@/lib/data/providers/firm-provider";
import { DATA_SOURCE } from "@/lib/data/api/config";

export const dynamic = "force-dynamic";

export async function GET() {
  const [allFirms, classifications] = await Promise.all([
    getAllFirms(),
    getAllClassifications(),
  ]);

  const buy = allFirms.filter((f) => classifications.get(f.id)?.signal === "BUY")
    .map((f) => ({ ticker: f.ticker, name: f.name, slug: f.slug, tier: classifications.get(f.id)!.tier, score: classifications.get(f.id)!.totalScore }))
    .sort((a, b) => b.score - a.score);

  const watch = allFirms.filter((f) => classifications.get(f.id)?.signal === "WATCH")
    .map((f) => ({ ticker: f.ticker, name: f.name, slug: f.slug, tier: classifications.get(f.id)!.tier, score: classifications.get(f.id)!.totalScore }));

  const sell = allFirms.filter((f) => ["SELL", "AVOID"].includes(classifications.get(f.id)?.signal ?? ""))
    .map((f) => ({ ticker: f.ticker, name: f.name, slug: f.slug, tier: classifications.get(f.id)!.tier, score: classifications.get(f.id)!.totalScore }));

  return NextResponse.json({
    data: { buy, watch, sell },
    meta: { timestamp: new Date().toISOString(), source: DATA_SOURCE },
  });
}
