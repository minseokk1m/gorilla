import { NextRequest, NextResponse } from "next/server";
import { MOCK_FIRMS } from "@/lib/data/mock/firms";
import { getClassification } from "@/lib/data/providers/firm-provider";
import { getPriceHistory } from "@/lib/data/providers/price-provider";
import { getNewsByFirmId } from "@/lib/data/providers/news-provider";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const firm = MOCK_FIRMS.find((f) => f.slug === slug);
  if (!firm) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const [classification, priceHistory, news] = await Promise.all([
    getClassification(firm.id),
    getPriceHistory(firm.id),
    getNewsByFirmId(firm.id),
  ]);

  return NextResponse.json({
    data: { firm, classification, priceHistory, news },
    meta: { timestamp: new Date().toISOString(), source: "mock", classifiedBy: "rules" },
  });
}
