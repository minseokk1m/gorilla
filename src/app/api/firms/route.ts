import { NextRequest, NextResponse } from "next/server";
import { getAllFirms, getAllClassifications } from "@/lib/data/providers/firm-provider";
import { getAllPriceHistories } from "@/lib/data/providers/price-provider";
import { DATA_SOURCE } from "@/lib/data/api/config";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tier = searchParams.get("tier");
  const signal = searchParams.get("signal");
  const sector = searchParams.get("sector");

  const [allFirms, classifications, prices] = await Promise.all([
    getAllFirms(),
    getAllClassifications(),
    getAllPriceHistories(),
  ]);

  const priceMap = new Map(prices.map((p) => [p.firmId, p]));

  let firms = allFirms.map((f) => ({
    firm: f,
    classification: classifications.get(f.id)!,
    price: priceMap.get(f.id),
  }));

  if (tier) firms = firms.filter((f) => f.classification.tier === tier);
  if (signal) firms = firms.filter((f) => f.classification.signal === signal);
  if (sector) firms = firms.filter((f) => f.firm.sector === sector);

  return NextResponse.json({
    data: firms,
    meta: {
      timestamp: new Date().toISOString(),
      source: DATA_SOURCE,
      classifiedBy: "rules",
    },
  });
}
