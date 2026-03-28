"use client";
import { Link } from "@/i18n/routing";
import type { Firm } from "@/types/firm";
import type { ClassificationResult } from "@/types/classification";
import type { PriceHistory } from "@/types/market";
import { Card, CardContent } from "@/components/ui/card";
import ClassificationBadge from "./ClassificationBadge";
import SignalBadge from "./SignalBadge";
import { formatPrice, formatPercent, formatMarketCap } from "@/lib/utils/formatters";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const SPARK_COLORS: Record<string, string> = {
  BUY: "#10b981", WATCH: "#3b82f6", SELL: "#f97316", AVOID: "#ef4444",
};

export default function FirmCard({ firm, classification, priceHistory }: {
  firm: Firm;
  classification: ClassificationResult;
  priceHistory?: PriceHistory;
}) {
  const sparkData = priceHistory?.candles.slice(-30).map((c) => ({ v: c.close })) ?? [];
  const sparkColor = SPARK_COLORS[classification.signal];
  const change1D = priceHistory?.priceChange1D ?? 0;

  return (
    <Link href={`/firms/${firm.slug}`}>
      <Card className="bg-white border-gray-200 hover:border-gray-400 transition-all cursor-pointer group">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="font-bold text-gray-900 text-sm group-hover:text-emerald-600 transition-colors">{firm.ticker}</div>
              <div className="text-gray-500 text-xs truncate max-w-[110px]">{firm.name}</div>
            </div>
            <SignalBadge signal={classification.signal} size="sm" />
          </div>

          {sparkData.length > 0 && (
            <div className="h-12 mb-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkData}>
                  <defs>
                    <linearGradient id={`sg-${firm.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={sparkColor} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={sparkColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke={sparkColor} strokeWidth={1.5} fill={`url(#sg-${firm.id})`} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-gray-900 font-medium">{priceHistory ? formatPrice(priceHistory.currentPrice) : "—"}</span>
            <span className={change1D >= 0 ? "text-emerald-600" : "text-red-600"}>
              {formatPercent(change1D, true)}
            </span>
          </div>

          <ClassificationBadge tier={classification.tier} size="sm" />

          <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
            <span>Score: {classification.totalScore}</span>
            <span>{formatMarketCap(firm.marketCapUSD)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
