/* Gartner Hype Cycle SVG visualisation — pure SVG, server component */

const FONT: React.CSSProperties = { fontFamily: "system-ui, -apple-system, sans-serif" };

const W = 800;
const H = 380;
const BASELINE = 340;

/* The classic Hype Cycle shape:
   trigger → peak → trough → slope → plateau */
const CURVE = [
  "M 40,320",
  "C 60,318 80,310 100,290",
  "C 130,250 150,180 170,120",
  "C 185,75 195,45 210,30",      // peak
  "C 225,15 235,15 250,30",
  "C 270,55 290,130 310,200",
  "C 330,260 350,290 370,300",    // trough
  "C 390,305 410,300 440,285",
  "C 480,260 520,240 560,225",    // slope
  "C 610,210 660,200 710,195",    // plateau
  "C 740,193 760,192 780,192",
].join(" ");

/* Phase zones along the x-axis */
const PHASES_EN = [
  { label: "Technology\nTrigger", x: 70, y: BASELINE + 18, anchor: "middle" as const },
  { label: "Peak of Inflated\nExpectations", x: 220, y: 70, anchor: "middle" as const },
  { label: "Trough of\nDisillusionment", x: 370, y: BASELINE + 18, anchor: "middle" as const },
  { label: "Slope of\nEnlightenment", x: 510, y: 255, anchor: "middle" as const },
  { label: "Plateau of\nProductivity", x: 700, y: 175, anchor: "middle" as const },
];

const PHASES_KO = [
  { label: "기술\n촉발", x: 70, y: BASELINE + 18, anchor: "middle" as const },
  { label: "과대기대의\n정점", x: 220, y: 70, anchor: "middle" as const },
  { label: "환멸의\n골짜기", x: 370, y: BASELINE + 18, anchor: "middle" as const },
  { label: "계몽의\n경사면", x: 510, y: 255, anchor: "middle" as const },
  { label: "생산성의\n안정기", x: 700, y: 175, anchor: "middle" as const },
];

/* TALC mapping annotations */
const MAPPING_EN = [
  { label: "≈ Early Market", x: 145, y: BASELINE - 20, color: "#9ca3af" },
  { label: "≈ The Chasm", x: 370, y: BASELINE - 20, color: "#ef4444" },
  { label: "≈ Bowling Alley", x: 475, y: BASELINE - 20, color: "#d97706" },
  { label: "≈ Tornado", x: 590, y: BASELINE - 20, color: "#059669" },
  { label: "≈ Main Street", x: 720, y: BASELINE - 20, color: "#0064FF" },
];

const MAPPING_KO = [
  { label: "≈ 초기 시장", x: 145, y: BASELINE - 20, color: "#9ca3af" },
  { label: "≈ 캐즘", x: 370, y: BASELINE - 20, color: "#ef4444" },
  { label: "≈ 볼링앨리", x: 475, y: BASELINE - 20, color: "#d97706" },
  { label: "≈ 토네이도", x: 590, y: BASELINE - 20, color: "#059669" },
  { label: "≈ 메인 스트리트", x: 720, y: BASELINE - 20, color: "#0064FF" },
];

function MultilineText({ x, y, text, anchor, fontSize, fontWeight, fill }: {
  x: number; y: number; text: string; anchor: "start" | "middle" | "end"; fontSize: number; fontWeight: string; fill: string;
}) {
  const lines = text.split("\n");
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={fontSize} fontWeight={fontWeight} fill={fill} style={FONT}>
      {lines.map((line, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : fontSize * 1.3}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

export default function HypeCycleCurve({ locale = "ko" }: { locale?: string }) {
  const phases = locale === "ko" ? PHASES_KO : PHASES_EN;
  const mapping = locale === "ko" ? MAPPING_KO : MAPPING_EN;
  const yAxisLabel = locale === "ko" ? "기대 수준" : "Expectations";
  const xAxisLabel = locale === "ko" ? "시간 →" : "Time →";

  return (
    <div className="toss-card !p-4 sm:!p-6 mt-5 overflow-hidden">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto select-none"
        role="img"
        aria-label={locale === "ko" ? "가트너 하입사이클 곡선" : "Gartner Hype Cycle curve"}
      >
        {/* Y-axis label */}
        <text
          x={18}
          y={H / 2 - 20}
          textAnchor="middle"
          fontSize={10}
          fontWeight="700"
          fill="#9ca3af"
          style={FONT}
          transform={`rotate(-90, 18, ${H / 2 - 20})`}
        >
          {yAxisLabel}
        </text>

        {/* Gradient fill under curve */}
        <defs>
          <linearGradient id="hcGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e5e7eb" stopOpacity="0.3" />
            <stop offset="25%" stopColor="#fde68a" stopOpacity="0.25" />
            <stop offset="45%" stopColor="#fca5a5" stopOpacity="0.2" />
            <stop offset="65%" stopColor="#a7f3d0" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <path
          d={`${CURVE} L780,${BASELINE} L40,${BASELINE} Z`}
          fill="url(#hcGrad)"
        />

        {/* Main curve */}
        <path
          d={CURVE}
          fill="none"
          stroke="#374151"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Baseline */}
        <line x1={35} y1={BASELINE} x2={785} y2={BASELINE} stroke="#e5e7eb" strokeWidth="1.5" />

        {/* Phase labels */}
        {phases.map((p) => (
          <MultilineText
            key={p.label}
            x={p.x}
            y={p.y}
            text={p.label}
            anchor={p.anchor}
            fontSize={11}
            fontWeight="700"
            fill="#374151"
          />
        ))}

        {/* TALC mapping row */}
        <line x1={40} y1={BASELINE - 30} x2={780} y2={BASELINE - 30} stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4,3" />
        {mapping.map((m) => (
          <text
            key={m.label}
            x={m.x}
            y={m.y}
            textAnchor="middle"
            fontSize={9}
            fontWeight="700"
            fill={m.color}
            style={FONT}
          >
            {m.label}
          </text>
        ))}

        {/* Chasm zone highlight */}
        <rect x={330} y={BASELINE - 35} width={80} height={18} rx="4" fill="#fef2f2" opacity="0.8" />

        {/* Tornado zone highlight */}
        <rect x={555} y={BASELINE - 35} width={70} height={18} rx="4" fill="#ecfdf5" opacity="0.8" />

        {/* X-axis label */}
        <text x={W / 2} y={BASELINE + 35} textAnchor="middle" fontSize={10} fontWeight="700" fill="#9ca3af" style={FONT}>
          {xAxisLabel}
        </text>

        {/* Key insight callout — BUY window */}
        <rect x={548} y={100} width={120} height={36} rx="8" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1" />
        <text x={608} y={115} textAnchor="middle" fontSize={9} fontWeight="800" fill="#059669" style={FONT}>
          {locale === "ko" ? "🌪️ 매수 구간" : "🌪️ BUY Window"}
        </text>
        <text x={608} y={129} textAnchor="middle" fontSize={8} fontWeight="600" fill="#6b7280" style={FONT}>
          {locale === "ko" ? "토네이도 진입" : "Tornado entry"}
        </text>
        <line x1={608} y1={136} x2={590} y2={215} stroke="#a7f3d0" strokeWidth="1" strokeDasharray="3,2" />
      </svg>
    </div>
  );
}
