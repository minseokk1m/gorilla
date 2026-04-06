"use client";
import type { ClassificationResult } from "@/types/classification";
import type { MarketPhase } from "@/types/classification";
import { useTranslations } from "next-intl";

const TIER_COLORS: Record<string, string> = {
  "Gorilla": "text-emerald-600",
  "Potential Gorilla": "text-teal-600",
  "King": "text-[#0064FF]",
  "Chimpanzee": "text-yellow-600",
  "Monkey": "text-orange-600",
  "In Chasm": "text-red-500",
};

const PHASE_COLOR: Record<MarketPhase, string> = {
  "Tornado": "bg-emerald-50 text-emerald-700",
  "Bowling Alley": "bg-teal-50 text-teal-700",
  "Main Street": "bg-blue-50 text-[#0064FF]",
  "Early Market": "bg-yellow-50 text-yellow-700",
  "End of Life": "bg-red-50 text-red-600",
};

export default function MarketSummaryBar({ classifications }: { classifications: ClassificationResult[] }) {
  const t = useTranslations("marketSummary");
  const tTiers = useTranslations("tiers");
  const tPhases = useTranslations("marketPhases");

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
    <div className="toss-card flex flex-wrap items-center gap-3 sm:gap-6">
      <div>
        <div className="text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide">{t("marketPhase")}</div>
        <span className={`toss-pill ${PHASE_COLOR[dominantPhase]}`}>
          {tPhases(dominantPhase)}
        </span>
      </div>
      <div className="h-8 w-px bg-gray-200 hidden sm:block" />
      <div className="flex gap-5 flex-wrap">
        {Object.entries(tierCounts).sort((a, b) => b[1] - a[1]).map(([tier, count]) => (
          <div key={tier} className="text-center">
            <div className={`text-xl font-extrabold ${TIER_COLORS[tier] ?? "text-gray-900"}`}>{count}</div>
            <div className="text-xs font-bold text-gray-400">{tTiers(`${tier}.label` as "Gorilla.label")}</div>
          </div>
        ))}
      </div>
      <div className="h-8 w-px bg-gray-200 hidden sm:block" />
      <div className="flex gap-6">
        <div className="text-center">
          <div className="text-xl font-extrabold text-emerald-600">{buys}</div>
          <div className="text-xs font-bold text-gray-400">{t("buySignals")}</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-extrabold text-red-500">{avoids}</div>
          <div className="text-xs font-bold text-gray-400">{t("sellAvoid")}</div>
        </div>
      </div>
      <div className="ml-auto text-xs text-gray-400 hidden lg:block font-medium">
        {t("footer")}
      </div>
    </div>
  );
}
