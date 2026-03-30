"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import type { Firm } from "@/types/firm";
import type { ClassificationResult, ClassificationTier, MarketPhase, Signal } from "@/types/classification";
import type { NewsArticle } from "@/types/news";

/* ── types ─────────────────────────────────────────────── */
interface Props {
  firms: Firm[];
  classifications: Record<string, ClassificationResult>;
  newsMap: Record<string, NewsArticle>;
}

/* ── SVG dimensions ────────────────────────────────────── */
const W = 1000;
const H = 500;
const BASELINE = 470;

/* ── The TALC curve ──────────────────────────────────── */
const CURVE_PATH = [
  "M 0,470",
  "C 35,468 65,400 105,270",
  "C 130,200 155,95 185,45",
  "C 200,20 215,12 230,12",
  "C 250,12 265,35 282,120",
  "C 300,210 315,400 338,465",
  "C 350,472 362,472 378,468",
  "C 400,458 425,385 462,300",
  "C 490,235 520,170 555,135",
  "C 580,115 608,105 640,102",
  "C 680,99 720,100 760,105",
  "C 810,112 870,128 935,148",
  "C 965,155 985,160 1000,165",
].join(" ");

/* ── Segment x-boundaries (adopter groups) ──────────── */
const SEGMENTS = [
  { key: "innovators",     label: "Innovators",      xMin: 0,   xMax: 95,   fill: "#86efac", opacity: 0.25 },
  { key: "earlyAdopters",  label: "Early Adopters",  xMin: 95,  xMax: 265,  fill: "#fde047", opacity: 0.22 },
  // chasm gap: 265–395
  { key: "earlyMajority",  label: "Early Majority",  xMin: 395, xMax: 560,  fill: "#fbbf24", opacity: 0.22 },
  { key: "lateMajority",   label: "Late Majority",   xMin: 560, xMax: 800,  fill: "#fb923c", opacity: 0.22 },
  { key: "laggards",       label: "Laggards",        xMin: 800, xMax: 1000, fill: "#7f1d1d", opacity: 0.18 },
];

/* ── Curve annotations ────────────────────────────────── */
const ANNOTATIONS = [
  { text: "Peak of Inflated",  text2: "Expectations", x: 135, y: 35, anchor: "end" as const },
  { text: "The Chasm",         text2: "",              x: 345, y: 420, anchor: "middle" as const },
  { text: "Slope of",          text2: "Enlightenment", x: 480, y: 180, anchor: "middle" as const },
  { text: "Plateau of",        text2: "Productivity",  x: 715, y: 75,  anchor: "middle" as const },
];

/* ── Phase → zone mapping for firm dots ──────────────── */
const PHASE_ZONES: Record<MarketPhase, { xMin: number; xMax: number; yBase: number }> = {
  "Early Market":  { xMin: 100, xMax: 230, yBase: 190 },
  "Bowling Alley": { xMin: 405, xMax: 530, yBase: 275 },
  "Tornado":       { xMin: 545, xMax: 660, yBase: 120 },
  "Main Street":   { xMin: 670, xMax: 800, yBase: 108 },
  "End of Life":   { xMin: 820, xMax: 970, yBase: 145 },
};

/* ── Colour helpers ──────────────────────────────────── */
const TIER_DOT: Record<ClassificationTier, string> = {
  "Gorilla":           "#059669",
  "Potential Gorilla": "#0d9488",
  "King":              "#2563eb",
  "Chimpanzee":        "#d97706",
  "Monkey":            "#ea580c",
  "In Chasm":          "#dc2626",
};

const SIGNAL_BG: Record<Signal, string> = {
  BUY:   "#059669",
  WATCH: "#2563eb",
  SELL:  "#ea580c",
  AVOID: "#dc2626",
};

const TIER_EMOJI: Record<ClassificationTier, string> = {
  "Gorilla":           "🦍",
  "Potential Gorilla": "🦍",
  "King":              "👑",
  "Chimpanzee":        "🐵",
  "Monkey":            "🐒",
  "In Chasm":          "🕳️",
};

/* ── Position computation ────────────────────────────── */
function computePositions(
  firms: Firm[],
  cls: Record<string, ClassificationResult>,
): Map<string, [number, number]> {
  const byPhase = new Map<MarketPhase, Firm[]>();
  for (const f of firms) {
    const c = cls[f.id];
    if (!c) continue;
    const phase = c.marketPhase;
    if (!byPhase.has(phase)) byPhase.set(phase, []);
    byPhase.get(phase)!.push(f);
  }

  // sort each group by score desc
  for (const arr of byPhase.values()) {
    arr.sort((a, b) => (cls[b.id]?.totalScore ?? 0) - (cls[a.id]?.totalScore ?? 0));
  }

  const out = new Map<string, [number, number]>();

  for (const [phase, arr] of byPhase) {
    const zone = PHASE_ZONES[phase];
    if (!zone) continue;
    const n = arr.length;
    const cols = Math.min(n, Math.max(3, Math.ceil(Math.sqrt(n * 2))));
    const xRange = zone.xMax - zone.xMin;
    const xStep = cols > 1 ? xRange / (cols - 1) : 0;
    const yStep = 28;

    arr.forEach((f, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = zone.xMin + col * xStep;
      const y = zone.yBase - row * yStep;
      out.set(f.id, [x, y]);
    });
  }
  return out;
}

/* ── Left-panel grouping order ───────────────────────── */
const TIER_ORDER: ClassificationTier[] = [
  "Gorilla",
  "Potential Gorilla",
  "In Chasm",
  "King",
  "Chimpanzee",
  "Monkey",
];

/* ── Component ───────────────────────────────────────── */
export default function TALCChart({ firms, classifications, newsMap }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const ts = useTranslations("signals");

  const positions = useMemo(
    () => computePositions(firms, classifications),
    [firms, classifications],
  );

  // Group firms by tier for left panel
  const grouped = useMemo(() => {
    const m = new Map<ClassificationTier, Firm[]>();
    TIER_ORDER.forEach((t) => m.set(t, []));
    for (const f of firms) {
      const c = classifications[f.id];
      if (!c) continue;
      m.get(c.tier)!.push(f);
    }
    // sort each by score desc
    for (const arr of m.values()) {
      arr.sort((a, b) => (classifications[b.id]?.totalScore ?? 0) - (classifications[a.id]?.totalScore ?? 0));
    }
    return m;
  }, [firms, classifications]);

  const hoveredFirm = hoveredId ? firms.find((f) => f.id === hoveredId) : null;
  const hoveredCls = hoveredId ? classifications[hoveredId] : null;
  const hoveredNews = hoveredId ? newsMap[hoveredId] : null;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* ── Left panel: firm list ── */}
      <div className="w-full lg:w-72 shrink-0 lg:max-h-[600px] overflow-y-auto space-y-3 pr-1">
        {TIER_ORDER.map((tier) => {
          const arr = grouped.get(tier)!;
          if (arr.length === 0) return null;
          return (
            <div key={tier}>
              <div className="flex items-center gap-1.5 mb-1.5 sticky top-0 bg-white/90 backdrop-blur-sm py-1 z-10">
                <span className="text-sm">{TIER_EMOJI[tier]}</span>
                <span className="text-xs font-bold text-gray-700">{tier}</span>
                <span className="text-xs text-gray-400 ml-auto">{arr.length}</span>
              </div>
              <div className="space-y-0.5">
                {arr.map((f) => {
                  const c = classifications[f.id]!;
                  const active = hoveredId === f.id;
                  return (
                    <div
                      key={f.id}
                      className={`flex items-center gap-2 px-2 py-1 rounded-lg text-xs cursor-pointer transition-colors ${
                        active ? "bg-gray-100 ring-1 ring-emerald-300" : "hover:bg-gray-50"
                      }`}
                      onMouseEnter={() => setHoveredId(f.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: TIER_DOT[tier] }}
                      />
                      <span className="font-bold text-gray-900 w-10 shrink-0">{f.ticker}</span>
                      <span className="text-gray-400 truncate flex-1">{f.name}</span>
                      <span
                        className="shrink-0 px-1.5 py-0.5 rounded text-white font-semibold"
                        style={{ backgroundColor: SIGNAL_BG[c.signal], fontSize: 9 }}
                      >
                        {c.signal}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Right panel: TALC curve chart ── */}
      <div className="flex-1 min-w-0 relative" onMouseMove={handleMouseMove}>
        <div className="overflow-x-auto">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            className="w-full min-w-[620px]"
            style={{ height: "auto" }}
          >
            {/* ── Segment bands ── */}
            {SEGMENTS.map((seg) => (
              <g key={seg.key}>
                <rect
                  x={seg.xMin}
                  y={340}
                  width={seg.xMax - seg.xMin}
                  height={BASELINE - 340}
                  fill={seg.fill}
                  fillOpacity={seg.opacity}
                  rx={4}
                />
                <text
                  x={(seg.xMin + seg.xMax) / 2}
                  y={BASELINE - 10}
                  textAnchor="middle"
                  fontSize={9}
                  fill="#6b7280"
                  fontFamily="system-ui, sans-serif"
                >
                  {seg.label}
                </text>
              </g>
            ))}

            {/* Chasm zone highlight */}
            <rect x={265} y={340} width={130} height={BASELINE - 340} fill="#fecaca" fillOpacity={0.18} rx={4} />
            <line x1={265} y1={340} x2={265} y2={BASELINE} stroke="#fca5a5" strokeWidth={1} strokeDasharray="4,3" />
            <line x1={395} y1={340} x2={395} y2={BASELINE} stroke="#fca5a5" strokeWidth={1} strokeDasharray="4,3" />

            {/* Baseline */}
            <line x1={0} y1={BASELINE} x2={W} y2={BASELINE} stroke="#e5e7eb" strokeWidth={1.5} />

            {/* Annotations */}
            {ANNOTATIONS.map((a) => (
              <g key={a.text}>
                <text
                  x={a.x}
                  y={a.y}
                  textAnchor={a.anchor}
                  fontSize={10}
                  fontStyle="italic"
                  fill="#9ca3af"
                  fontFamily="system-ui, sans-serif"
                >
                  {a.text}
                </text>
                {a.text2 && (
                  <text
                    x={a.x}
                    y={a.y + 13}
                    textAnchor={a.anchor}
                    fontSize={10}
                    fontStyle="italic"
                    fill="#9ca3af"
                    fontFamily="system-ui, sans-serif"
                  >
                    {a.text2}
                  </text>
                )}
              </g>
            ))}

            {/* The Chasm label */}
            <text
              x={330}
              y={400}
              textAnchor="middle"
              fontSize={13}
              fontWeight="700"
              fontStyle="italic"
              fill="#6b7280"
              fontFamily="system-ui, sans-serif"
            >
              (The Chasm)
            </text>

            {/* Phase zone labels above the dot clusters */}
            {Object.entries(PHASE_ZONES).map(([phase, zone]) => (
              <text
                key={phase}
                x={(zone.xMin + zone.xMax) / 2}
                y={zone.yBase - 55}
                textAnchor="middle"
                fontSize={9}
                fontWeight="600"
                fill="#9ca3af"
                fontFamily="system-ui, sans-serif"
                letterSpacing="0.05em"
              >
                {phase.toUpperCase()}
              </text>
            ))}

            {/* Main TALC curve */}
            <path
              d={CURVE_PATH}
              fill="none"
              stroke="#ef4444"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.7}
            />

            {/* Firm dots */}
            {firms.map((f) => {
              const pos = positions.get(f.id);
              if (!pos) return null;
              const [x, y] = pos;
              const c = classifications[f.id];
              if (!c) return null;
              const isHovered = hoveredId === f.id;
              const color = TIER_DOT[c.tier];

              return (
                <g key={f.id}>
                  {/* Glow on hover */}
                  {isHovered && (
                    <circle cx={x} cy={y} r={18} fill={color} fillOpacity={0.12} />
                  )}
                  {/* Dot */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 10 : 7}
                    fill={color}
                    fillOpacity={0.92}
                    stroke="white"
                    strokeWidth={isHovered ? 2.5 : 1.5}
                    style={{ cursor: "pointer", transition: "r 0.15s ease" }}
                    onMouseEnter={() => setHoveredId(f.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  />
                  {/* Ticker label */}
                  <text
                    x={x}
                    y={y - (isHovered ? 14 : 11)}
                    textAnchor="middle"
                    fontSize={isHovered ? 10 : 7.5}
                    fontWeight={isHovered ? "700" : "600"}
                    fill={isHovered ? "#111827" : "#6b7280"}
                    fontFamily="system-ui, sans-serif"
                    style={{ pointerEvents: "none", transition: "font-size 0.15s ease" }}
                  >
                    {f.ticker}
                  </text>
                </g>
              );
            })}

            {/* Time arrow */}
            <line x1={20} y1={BASELINE + 18} x2={W - 20} y2={BASELINE + 18} stroke="#d1d5db" strokeWidth={1} markerEnd="url(#arrowhead)" />
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#d1d5db" />
              </marker>
            </defs>
            <text x={W / 2} y={BASELINE + 30} textAnchor="middle" fontSize={9} fill="#9ca3af" fontFamily="system-ui, sans-serif">
              Time / Market Maturity
            </text>
          </svg>
        </div>

        {/* ── Hover tooltip (HTML overlay) ── */}
        {hoveredFirm && hoveredCls && (
          <div
            className="fixed z-50 pointer-events-none"
            style={{
              left: mousePos.x + 18,
              top: mousePos.y - 20,
            }}
          >
            <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-3.5 w-60 space-y-2 text-xs pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-gray-900 text-sm">{hoveredFirm.ticker}</span>
                  <span className="text-gray-400 ml-1.5">{hoveredFirm.name}</span>
                </div>
                <span className="text-base">{TIER_EMOJI[hoveredCls.tier]}</span>
              </div>
              {/* Tier + Signal */}
              <div className="flex items-center gap-2">
                <span
                  className="px-2 py-0.5 rounded text-white font-bold"
                  style={{ backgroundColor: SIGNAL_BG[hoveredCls.signal], fontSize: 10 }}
                >
                  {ts(hoveredCls.signal)}
                </span>
                <span className="text-gray-500">{hoveredCls.tier}</span>
              </div>
              {/* Metrics */}
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-gray-500">
                <span>Score: <b className="text-gray-800">{hoveredCls.totalScore}</b></span>
                <span>Phase: <b className="text-gray-800">{hoveredCls.marketPhase}</b></span>
                <span>Rev: <b className="text-gray-800">+{Math.round(hoveredFirm.revenueGrowthYoY * 100)}%</b></span>
                <span>NRR: <b className="text-gray-800">{Math.round(hoveredFirm.classificationSignals.netRevenueRetention * 100)}%</b></span>
              </div>
              {/* News */}
              {hoveredNews && (
                <p className="text-gray-400 leading-snug line-clamp-2 border-t border-gray-100 pt-1.5">
                  {hoveredNews.title}
                </p>
              )}
              {/* Link */}
              <Link
                href={`/firms/${hoveredFirm.slug}`}
                className="block text-emerald-600 hover:underline font-semibold pt-0.5"
              >
                View full analysis →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
