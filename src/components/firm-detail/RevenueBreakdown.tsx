"use client";

import type { RevenueSegment } from "@/types/firm";
import { Link } from "@/i18n/routing";
import { useState } from "react";

const SEGMENT_COLORS = [
  { bg: "bg-[#0064FF]", bar: "#0064FF", text: "text-white" },
  { bg: "bg-[#34C759]", bar: "#34C759", text: "text-white" },
  { bg: "bg-[#FF9500]", bar: "#FF9500", text: "text-white" },
  { bg: "bg-[#AF52DE]", bar: "#AF52DE", text: "text-white" },
  { bg: "bg-[#FF3B30]", bar: "#FF3B30", text: "text-white" },
  { bg: "bg-[#5AC8FA]", bar: "#5AC8FA", text: "text-white" },
  { bg: "bg-[#FFCC00]", bar: "#FFCC00", text: "text-gray-900" },
  { bg: "bg-[#8E8E93]", bar: "#8E8E93", text: "text-white" },
];

interface Props {
  segments: RevenueSegment[];
  firmName: string;
  allFirms?: { slug: string; ticker: string }[];
  labels: {
    title: string;
    revenueShare: string;
    competitors: string;
    noSegments: string;
  };
}

export default function RevenueBreakdown({ segments, firmName, allFirms = [], labels }: Props) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const sorted = [...segments].sort((a, b) => b.revenuePercent - a.revenuePercent);

  function resolveCompetitor(slug: string) {
    const firm = allFirms.find((f) => f.slug === slug);
    return firm ? { slug: firm.slug, ticker: firm.ticker } : null;
  }

  return (
    <div className="space-y-5">
      <h2 className="mb-0">{labels.title}</h2>

      {/* ── Stacked Bar ── */}
      <div className="relative">
        <div className="flex h-10 rounded-xl overflow-hidden">
          {sorted.map((seg, i) => {
            const color = SEGMENT_COLORS[i % SEGMENT_COLORS.length];
            const isHovered = hoveredIdx === i;
            return (
              <div
                key={seg.name}
                className="relative transition-all duration-200 cursor-pointer"
                style={{
                  width: `${seg.revenuePercent}%`,
                  backgroundColor: color.bar,
                  opacity: hoveredIdx !== null && !isHovered ? 0.4 : 1,
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {seg.revenuePercent >= 12 && (
                  <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${color.text} truncate px-1`}>
                    {seg.revenuePercent}%
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Segment List ── */}
      <div className="space-y-0">
        {sorted.map((seg, i) => {
          const color = SEGMENT_COLORS[i % SEGMENT_COLORS.length];
          const isHovered = hoveredIdx === i;
          const linkedCompetitors = (seg.competitors ?? [])
            .map(resolveCompetitor)
            .filter(Boolean) as { slug: string; ticker: string }[];

          return (
            <div
              key={seg.name}
              className={`flex items-start gap-3 py-3 border-b border-gray-50 last:border-0 transition-colors duration-150 rounded-lg px-2 -mx-2 cursor-default ${
                isHovered ? "bg-gray-50" : ""
              }`}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Color dot */}
              <div
                className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                style={{ backgroundColor: color.bar }}
              />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-bold text-gray-900 truncate">{seg.name}</span>
                  <span className="text-sm font-extrabold text-gray-900 tabular-nums flex-shrink-0">
                    {seg.revenuePercent}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{seg.description}</p>

                {/* Competitors in this segment */}
                {linkedCompetitors.length > 0 && (
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{labels.competitors}</span>
                    {linkedCompetitors.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/firms/${c.slug}`}
                        className="text-[11px] font-bold text-[#0064FF] bg-[#E8F0FE] px-1.5 py-0.5 rounded hover:bg-[#0064FF] hover:text-white transition-colors"
                      >
                        {c.ticker}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
