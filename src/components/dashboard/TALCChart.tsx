"use client";

import { useState, useMemo } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import type { Firm } from "@/types/firm";
import type { ClassificationResult, ClassificationTier, MarketPhase } from "@/types/classification";
import type { NewsArticle } from "@/types/news";

interface Props {
  firms: Firm[];
  classifications: Record<string, ClassificationResult>;
  newsMap: Record<string, NewsArticle>;
}

const PHASE_ORDER: MarketPhase[] = [
  "Early Market",
  "Bowling Alley",
  "Tornado",
  "Thriving Main Street",
  "Maturing Main Street",
  "Declining Main Street",
  "Fault Line",
  "End of Life",
];

const PHASE_EMOJI: Record<MarketPhase, string> = {
  "Early Market": "🌱",
  "Bowling Alley": "🎳",
  "Tornado": "🌪️",
  "Thriving Main Street": "🌿",
  "Maturing Main Street": "🏙️",
  "Declining Main Street": "🍂",
  "Fault Line": "⚡",
  "End of Life": "📉",
};

const PHASE_STYLE: Record<MarketPhase, { bg: string; ring: string; accent: string }> = {
  "Early Market":           { bg: "bg-gray-50",       ring: "ring-gray-200",    accent: "text-gray-500" },
  "Bowling Alley":          { bg: "bg-yellow-50/60",  ring: "ring-yellow-200",  accent: "text-yellow-700" },
  "Tornado":                { bg: "bg-emerald-50/60", ring: "ring-emerald-200", accent: "text-emerald-700" },
  "Thriving Main Street":   { bg: "bg-blue-50/60",    ring: "ring-blue-200",    accent: "text-[#0064FF]" },
  "Maturing Main Street":   { bg: "bg-blue-50/40",    ring: "ring-blue-200",    accent: "text-blue-600" },
  "Declining Main Street":  { bg: "bg-amber-50/60",   ring: "ring-amber-200",   accent: "text-amber-700" },
  "Fault Line":             { bg: "bg-red-50/60",     ring: "ring-red-200",     accent: "text-red-600" },
  "End of Life":            { bg: "bg-gray-50/40",    ring: "ring-gray-200",    accent: "text-gray-500" },
};

const TIER_DOT: Record<ClassificationTier, string> = {
  "Gorilla":           "bg-emerald-500",
  "Potential Gorilla": "bg-teal-500",
  "King":              "bg-[#0064FF]",
  "Prince":            "bg-indigo-500",
  "Serf":              "bg-stone-400",
  "Chimpanzee":        "bg-yellow-500",
  "Monkey":            "bg-orange-500",
  "In Chasm":          "bg-red-500",
};

const SIGNAL_COLOR: Record<string, string> = {
  "BUY":   "bg-emerald-100 text-emerald-700",
  "WATCH": "bg-blue-100 text-[#0064FF]",
  "SELL":  "bg-orange-100 text-orange-700",
  "AVOID": "bg-red-100 text-red-600",
};

export default function TALCChart({ firms, classifications, newsMap }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const ts = useTranslations("signals");
  const tTiers = useTranslations("tiers");
  const tPhases = useTranslations("marketPhases");
  const tc = useTranslations("talcChart");

  // Group firms by market phase
  const phaseGroups = useMemo(() => {
    const groups = new Map<MarketPhase, { firm: Firm; cls: ClassificationResult }[]>();
    PHASE_ORDER.forEach((p) => groups.set(p, []));
    for (const firm of firms) {
      const cls = classifications[firm.id];
      if (!cls) continue;
      groups.get(cls.marketPhase)?.push({ firm, cls });
    }
    // Sort each group by score desc
    for (const arr of groups.values()) {
      arr.sort((a, b) => b.cls.totalScore - a.cls.totalScore);
    }
    return groups;
  }, [firms, classifications]);

  // Tier summary counts
  const tierCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const firm of firms) {
      const cls = classifications[firm.id];
      if (!cls) continue;
      counts[cls.tier] = (counts[cls.tier] ?? 0) + 1;
    }
    return counts;
  }, [firms, classifications]);

  const hoveredFirm = hoveredId ? firms.find((f) => f.id === hoveredId) : null;
  const hoveredCls = hoveredId ? classifications[hoveredId] : null;
  const hoveredNews = hoveredId ? newsMap[hoveredId] : null;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="!text-base mb-0.5">{tc("phasesTitle")}</h2>
          <p className="text-xs text-gray-400 font-medium">{tc("phasesSubtitle")}</p>
        </div>
        <div className="flex gap-3 text-xs">
          {[
            { label: tTiers("Gorilla.label"), dot: "bg-emerald-500" },
            { label: tTiers("King.label"), dot: "bg-[#0064FF]" },
            { label: tTiers("In Chasm.label"), dot: "bg-red-500" },
          ].map((l) => (
            <span key={l.label} className="hidden sm:flex items-center gap-1.5 text-gray-500 font-medium">
              <span className={`w-2 h-2 rounded-full ${l.dot}`} />
              {l.label}
            </span>
          ))}
        </div>
      </div>

      {/* TALC Flow Arrow */}
      <div className="flex items-center gap-1 text-xs text-gray-300 font-bold">
        {PHASE_ORDER.map((phase, i) => (
          <div key={phase} className="flex items-center gap-1 flex-1 min-w-0">
            <span className={`truncate ${PHASE_STYLE[phase].accent} font-extrabold`}>
              {PHASE_EMOJI[phase]} {tPhases(phase)}
            </span>
            {i < PHASE_ORDER.length - 1 && <span className="text-gray-200 shrink-0">→</span>}
          </div>
        ))}
      </div>

      {/* Phase cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {PHASE_ORDER.map((phase) => {
          const items = phaseGroups.get(phase) ?? [];
          const style = PHASE_STYLE[phase];
          const isTornado = phase === "Tornado";
          return (
            <div
              key={phase}
              className={`rounded-2xl p-3.5 ${style.bg} ring-1 ${style.ring} ${isTornado ? "ring-2 ring-emerald-300" : ""} relative`}
            >
              {/* Phase header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">{PHASE_EMOJI[phase]}</span>
                  <span className={`text-xs font-extrabold ${style.accent}`}>{tPhases(phase)}</span>
                </div>
                <span className="text-sm font-extrabold text-gray-400">{items.length}</span>
              </div>

              {isTornado && (
                <div className="toss-pill bg-emerald-100 text-emerald-700 text-[9px] mb-2.5">
                  {tc("buyWindow")}
                </div>
              )}

              {/* Firm chips */}
              <div className="space-y-1.5">
                {items.slice(0, 8).map(({ firm, cls }) => (
                  <Link key={firm.id} href={`/firms/${firm.slug}`}>
                    <div
                      className={`flex items-center gap-1.5 rounded-xl px-2 py-1.5 bg-white/70 hover:bg-white hover:shadow-sm transition-all cursor-pointer ${
                        hoveredId === firm.id ? "ring-1 ring-[#0064FF]/30 bg-white shadow-sm" : ""
                      }`}
                      onMouseEnter={() => setHoveredId(firm.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${TIER_DOT[cls.tier]}`} />
                      <span className="font-extrabold text-gray-900 text-[11px]">{firm.ticker}</span>
                      <span className={`ml-auto toss-pill !px-1.5 !py-0 text-[8px] ${SIGNAL_COLOR[cls.signal]}`}>
                        {ts(cls.signal)}
                      </span>
                    </div>
                  </Link>
                ))}
                {items.length > 8 && (
                  <div className="text-center text-[10px] text-gray-400 font-bold pt-1">
                    +{items.length - 8} {tc("more")}
                  </div>
                )}
                {items.length === 0 && (
                  <div className="text-center text-xs text-gray-300 py-3">—</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Hover detail card */}
      {hoveredFirm && hoveredCls && (
        <div className="toss-card !p-4 !bg-[#F8F9FA] border border-gray-100">
          <div className="flex items-start gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div>
                <span className="font-extrabold text-gray-900">{hoveredFirm.ticker}</span>
                <span className="text-gray-400 text-sm ml-2">{hoveredFirm.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`toss-pill text-[10px] ${SIGNAL_COLOR[hoveredCls.signal]}`}>
                {ts(hoveredCls.signal)}
              </span>
              <span className="text-xs font-bold text-gray-500">
                {tTiers(`${hoveredCls.tier}.label` as "Gorilla.label")}
              </span>
            </div>
            <div className="flex gap-4 text-xs text-gray-500">
              <span>{tc("score")}: <b className="text-gray-800">{hoveredCls.totalScore}</b></span>
              <span>{tc("phase")}: <b className="text-gray-800">{tPhases(hoveredCls.marketPhase)}</b></span>
              <span>{tc("rev")}: <b className="text-gray-800">+{Math.round(hoveredFirm.revenueGrowthYoY * 100)}%</b></span>
              <span>NRR: <b className="text-gray-800">{Math.round(hoveredFirm.classificationSignals.netRevenueRetention * 100)}%</b></span>
            </div>
            {hoveredNews && (
              <p className="text-xs text-gray-400 leading-snug line-clamp-1 flex-1 min-w-0">
                {hoveredNews.title}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Tier distribution bar */}
      <div className="flex items-center gap-1 h-3 rounded-full overflow-hidden">
        {(["Gorilla", "Potential Gorilla", "King", "Prince", "Chimpanzee", "Monkey", "Serf", "In Chasm"] as ClassificationTier[]).map((tier) => {
          const count = tierCounts[tier] ?? 0;
          if (count === 0) return null;
          return (
            <div
              key={tier}
              className={`h-full ${TIER_DOT[tier]} opacity-80 rounded-sm transition-all`}
              style={{ flex: count }}
              title={`${tTiers(`${tier}.label` as "Gorilla.label")}: ${count}`}
            />
          );
        })}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-gray-400 font-bold">
        {(["Gorilla", "Potential Gorilla", "King", "Prince", "Chimpanzee", "Monkey", "Serf", "In Chasm"] as ClassificationTier[]).map((tier) => {
          const count = tierCounts[tier] ?? 0;
          if (count === 0) return null;
          return (
            <span key={tier} className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-sm ${TIER_DOT[tier]}`} />
              {tTiers(`${tier}.label` as "Gorilla.label")} {count}
            </span>
          );
        })}
      </div>
    </div>
  );
}
