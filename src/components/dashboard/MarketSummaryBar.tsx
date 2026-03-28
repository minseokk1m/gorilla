"use client";
import type { ClassificationResult } from "@/types/classification";
import type { MarketPhase } from "@/types/classification";
import { useTranslations } from "next-intl";

const TIER_COLORS: Record<string, string> = {
  "Gorilla": "text-emerald-600",
  "Potential Gorilla": "text-teal-600",
  "King": "text-blue-600",
  "Chimpanzee": "text-yellow-600",
  "Monkey": "text-orange-600",
  "In Chasm": "text-red-600",
};

const PHASE_COLOR: Record<MarketPhase, string> = {
  "Tornado": "bg-emerald-100 text-emerald-700 border-emerald-300",
  "Bowling Alley": "bg-teal-100 text-teal-700 border-teal-300",
  "Main Street": "bg-blue-100 text-blue-700 border-blue-300",
  "Early Market": "bg-yellow-100 text-yellow-700 border-yellow-300",
  "End of Life": "bg-red-100 text-red-700 border-red-300",
};

export default function MarketSummaryBar({ classifications }: { classifications: ClassificationResult[] }) {
  const t = useTranslations("marketSummary");

  const tierCounts = classifications.reduce<Record<string, number>>((acc, c) => {
    acc[c.tier] = (acc[c.tier] ?? 0) + 1;
    return acc;
  }, {});

  const buys = classifications.filter((c) => c.signal === "BUY").length;
  const avoids = classifications.filter((c) => ["SELL", "AVOID"].includes(c.signal)).length;

  const phaseCounts = classifications.reduce<Record<string, number>>((acc, c) => {
    acc[c.marketPhase] = (acc[c.marketPhase] ?? 0) + 1;
    return acc;
  }, {});
  const dominantPhase = Object.entries(phaseCounts).sort((a, b) => b[1] - a[1])[0][0] as MarketPhase;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap items-center gap-6">
      <div>
        <div className="text-xs text-gray-400 mb-1">{t("marketPhase")}</div>
        <span className={`text-xs font-semibold px-2 py-1 rounded border ${PHASE_COLOR[dominantPhase]}`}>
          {dominantPhase}
        </span>
      </div>
      <div className="h-8 w-px bg-gray-200 hidden sm:block" />
      <div className="flex gap-4 flex-wrap">
        {Object.entries(tierCounts).sort((a, b) => b[1] - a[1]).map(([tier, count]) => (
          <div key={tier} className="text-center">
            <div className={`text-lg font-bold ${TIER_COLORS[tier] ?? "text-gray-900"}`}>{count}</div>
            <div className="text-xs text-gray-400">{tier}</div>
          </div>
        ))}
      </div>
      <div className="h-8 w-px bg-gray-200 hidden sm:block" />
      <div className="flex gap-6">
        <div className="text-center">
          <div className="text-lg font-bold text-emerald-600">{buys}</div>
          <div className="text-xs text-gray-400">{t("buySignals")}</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-red-600">{avoids}</div>
          <div className="text-xs text-gray-400">{t("sellAvoid")}</div>
        </div>
      </div>
      <div className="ml-auto text-xs text-gray-400 hidden lg:block">
        {t("footer")}
      </div>
    </div>
  );
}
