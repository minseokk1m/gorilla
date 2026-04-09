import { NextRequest, NextResponse } from "next/server";
import { getFirmBySlug, getClassification } from "@/lib/data/providers/firm-provider";
import { getPriceHistory } from "@/lib/data/providers/price-provider";
import { getNewsByFirmId } from "@/lib/data/providers/news-provider";
import { DATA_SOURCE } from "@/lib/data/api/config";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const field = req.nextUrl.searchParams.get("field");
  const firm = await getFirmBySlug(slug);
  if (!firm) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Selective field fetching for progressive loading
  if (field === "price") {
    const priceHistory = await getPriceHistory(firm.id);
    return NextResponse.json({ priceHistory });
  }
  if (field === "news") {
    const news = await getNewsByFirmId(firm.id);
    return NextResponse.json({ news });
  }

  // Full fetch (default)
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
