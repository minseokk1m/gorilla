import { NextRequest, NextResponse } from "next/server";
import { getFirmBySlug, getClassification } from "@/lib/data/providers/firm-provider";
import { getPriceHistory } from "@/lib/data/providers/price-provider";
import { getNewsByFirmId } from "@/lib/data/providers/news-provider";
import { DATA_SOURCE } from "@/lib/data/api/config";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const firm = await getFirmBySlug(slug);
  if (!firm) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const [classification, priceHistory, news] = await Promise.all([
    getClassification(firm.id),
    getPriceHistory(firm.id),
    getNewsByFirmId(firm.id),
  ]);

  return NextResponse.json({
    data: { firm, classification, priceHistory, news },
    meta: {
      timestamp: new Date().toISOString(),
      source: DATA_SOURCE,
      classifiedBy: "rules",
    },
  });
}
