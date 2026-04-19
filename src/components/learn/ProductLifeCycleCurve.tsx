/* Moore's Product Life Cycle curve — asymmetric shape where Main Street is the tallest.
   Visualises the 8-phase extension (TALC + Living on the Fault Line). Server component. */

const BASE = 295;

// Anchor points (x, y). Smaller y = taller on screen. Main Street region is the peak.
const CURVE_ANCHORS: [number, number][] = [
  [50, 291],
  [155, 245],   // Early Market peak (small bump)
  [256, 285],   // pre-chasm trough
  // chasm gap 256–280
  [280, 278],
  [405, 150],   // Tornado peak
  [485, 80],    // Thriving Main Street peak
  [555, 55],    // Maturing Main Street — HIGHEST
  [620, 145],   // Declining Main Street midpoint
  [677, 235],   // Fault Line low
  [705, 215],   // small rebound (Structural Innovation)
  [750, 285],   // tail
];

// Fritsch–Carlson monotone Hermite tangents — zero at extrema, avoids squiggle.
const CURVE_TANGENTS: number[] = (() => {
  const n = CURVE_ANCHORS.length;
  const d: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    d.push((CURVE_ANCHORS[i + 1][1] - CURVE_ANCHORS[i][1]) / (CURVE_ANCHORS[i + 1][0] - CURVE_ANCHORS[i][0]));
  }
  const m: number[] = new Array(n);
  m[0] = d[0];
  m[n - 1] = d[n - 2];
  for (let i = 1; i < n - 1; i++) {
    m[i] = d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2;
  }
  return m;
})();

function g(x: number): number {
  for (let i = 0; i < CURVE_ANCHORS.length - 1; i++) {
    const [x0, y0] = CURVE_ANCHORS[i];
    const [x1, y1] = CURVE_ANCHORS[i + 1];
    if (x >= x0 && x <= x1) {
      const dx = x1 - x0;
      const t = (x - x0) / dx;
      const t2 = t * t;
      const t3 = t2 * t;
      const h00 = 2 * t3 - 3 * t2 + 1;
      const h10 = t3 - 2 * t2 + t;
      const h01 = -2 * t3 + 3 * t2;
      const h11 = t3 - t2;
      return h00 * y0 + h10 * CURVE_TANGENTS[i] * dx + h01 * y1 + h11 * CURVE_TANGENTS[i + 1] * dx;
    }
  }
  if (x < CURVE_ANCHORS[0][0]) return CURVE_ANCHORS[0][1];
  return CURVE_ANCHORS[CURVE_ANCHORS.length - 1][1];
}

const PTS: [number, number][] = [];
for (let x = 50; x <= 750; x += 2) PTS.push([x, g(x)]);

function areaPath(x0: number, x1: number) {
  const p = PTS.filter(([x]) => x >= x0 && x <= x1);
  if (!p.length) return "";
  return [
    `M${p[0][0]},${p[0][1]}`,
    ...p.slice(1).map(([x, y]) => `L${x},${y}`),
    `L${p.at(-1)![0]},${BASE}`,
    `L${p[0][0]},${BASE}Z`,
  ].join("");
}

function linePath(x0: number, x1: number) {
  const p = PTS.filter(([x]) => x >= x0 && x <= x1);
  return `M${p[0][0]},${p[0][1]}${p.slice(1).map(([x, y]) => `L${x},${y}`).join("")}`;
}

type PhaseZone = {
  key: string;
  x0: number;
  x1: number;
  fill: string;
  emoji: string;
  labelKo: string;
  labelEn: string;
  isNew?: boolean;
};

const ZONES: PhaseZone[] = [
  { key: "em",   x0: 50,  x1: 256, fill: "#e5e7eb", emoji: "🌱", labelKo: "초기 시장",   labelEn: "Early Market" },
  { key: "ba",   x0: 280, x1: 365, fill: "#fef3c7", emoji: "🎳", labelKo: "볼링앨리",    labelEn: "Bowling Alley" },
  { key: "tor",  x0: 365, x1: 445, fill: "#a7f3d0", emoji: "🌪️", labelKo: "토네이도",    labelEn: "Tornado" },
  { key: "thr",  x0: 445, x1: 520, fill: "#bfdbfe", emoji: "🌿", labelKo: "성장 메인",   labelEn: "Thriving Main",  isNew: true },
  { key: "mat",  x0: 520, x1: 590, fill: "#dbeafe", emoji: "🏙️", labelKo: "성숙 메인",   labelEn: "Maturing Main",  isNew: true },
  { key: "dec",  x0: 590, x1: 650, fill: "#fde68a", emoji: "🍂", labelKo: "쇠퇴 메인",   labelEn: "Declining Main", isNew: true },
  { key: "fl",   x0: 650, x1: 705, fill: "#fecaca", emoji: "⚡", labelKo: "단층선",      labelEn: "Fault Line",     isNew: true },
  { key: "eol",  x0: 705, x1: 750, fill: "#e5e7eb", emoji: "📉", labelKo: "수명 종료",   labelEn: "End of Life" },
];

const FONT: React.CSSProperties = { fontFamily: "system-ui, -apple-system, sans-serif" };

export default function ProductLifeCycleCurve({ locale = "ko" }: { locale?: string }) {
  return (
    <div className="toss-card !p-4 sm:!p-6 mt-5 overflow-hidden">
      <svg
        viewBox="0 -40 800 430"
        className="w-full h-auto select-none"
        role="img"
        aria-label={locale === "ko" ? "제품 수명 주기 전체 곡선" : "Product Life Cycle full curve"}
      >
        {/* ── Top banners: TALC section vs Product Life Cycle section ── */}
        <g>
          <rect x={50} y={-32} width={395} height={18} rx="4" fill="#f3f4f6" />
          <text x={247} y={-20} textAnchor="middle" fill="#374151" fontSize="10.5" fontWeight="800" style={FONT}>
            {locale === "ko" ? "TALC · 기술 채택 주기" : "TALC · Technology Adoption Life Cycle"}
          </text>
          <rect x={450} y={-32} width={300} height={18} rx="4" fill="#dbeafe" />
          <text x={600} y={-20} textAnchor="middle" fill="#1e40af" fontSize="10.5" fontWeight="800" style={FONT}>
            {locale === "ko" ? "제품 수명 주기 (Moore 확장)" : "Product Life Cycle (Moore's extension)"}
          </text>
          <line x1={445} y1={-34} x2={445} y2={BASE + 5} stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="4,3" opacity="0.65" />
        </g>

        {/* ── Y-axis hint (Revenue Growth / Market Size) ── */}
        <text
          x={-180}
          y={18}
          transform="rotate(-90)"
          textAnchor="middle"
          fill="#9ca3af"
          fontSize="10"
          fontWeight="700"
          style={FONT}
        >
          {locale === "ko" ? "← 매출 / 시총 규모" : "← Revenue / Market Size"}
        </text>

        {/* ── Phase zone fills ── */}
        {ZONES.map((z) => (
          <path key={z.key} d={areaPath(z.x0, z.x1)} fill={z.fill} opacity="0.85" />
        ))}

        {/* ── Chasm gap with red boundaries ── */}
        <line x1={256} y1={-10} x2={256} y2={BASE} stroke="#fca5a5" strokeWidth="1.5" strokeDasharray="5,4" />
        <line x1={280} y1={-10} x2={280} y2={BASE} stroke="#fca5a5" strokeWidth="1.5" strokeDasharray="5,4" />
        <rect x={256} y={-10} width={24} height={BASE + 10} fill="#fef2f2" opacity="0.5" />

        {/* ── Curve strokes — TALC (gray) + PLC (indigo) with small handoff gap ── */}
        <path d={linePath(50, 256)} fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />
        <path d={linePath(280, 441)} fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />
        <path d={linePath(449, 750)} fill="none" stroke="#1e40af" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx={443} cy={g(443)} r="2.8" fill="#374151" />
        <circle cx={447} cy={g(447)} r="2.8" fill="#1e40af" />

        {/* ── Chasm lightning bolt inside the gap ── */}
        <path
          d={`M260,245L270,263L264,263L276,281`}
          fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        />
        <text x={268} y={235} textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800" style={FONT}>
          {locale === "ko" ? "캐즘" : "Chasm"}
        </text>

        {/* ── Tornado "표준 결정" highlight ── */}
        <rect x={370} y={g(405) - 9} width={70} height={18} rx="9" fill="#059669" opacity="0.12" />
        <text x={405} y={g(405) + 4} textAnchor="middle" fill="#059669" fontSize="8.5" fontWeight="800" style={FONT}>
          {locale === "ko" ? "표준 결정" : "Standard Set"}
        </text>

        {/* ── Peak annotation for Maturing Main Street (highest point) ── */}
        <text x={555} y={g(555) - 14} textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="800" style={FONT}>
          {locale === "ko" ? "💰 캐시카우 정점" : "💰 Peak Cash Flow"}
        </text>

        {/* ── Fault Line fracture marker ── */}
        {(() => {
          const flX = 677;
          const flY = g(flX);
          return (
            <g>
              <path
                d={`M${flX - 4},${flY + 7}L${flX + 2},${flY + 18}L${flX - 2},${flY + 18}L${flX + 6},${flY + 32}`}
                fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              />
            </g>
          );
        })()}

        {/* ── Baseline ── */}
        <line x1={40} y1={BASE} x2={760} y2={BASE} stroke="#e5e7eb" strokeWidth="1.5" />

        {/* ── Phase labels (emoji + name), with NEW badge for 4 post-tornado phases ── */}
        {ZONES.map((z) => {
          const mx = (z.x0 + z.x1) / 2;
          const isTornado = z.key === "tor";
          const isFaultLine = z.key === "fl";
          const labelFill = isTornado ? "#059669" : isFaultLine ? "#dc2626" : "#374151";
          return (
            <g key={`${z.key}-lbl`}>
              <text x={mx} y={BASE + 22} textAnchor="middle" fill={labelFill} fontSize="11" fontWeight="800" style={FONT}>
                {z.emoji} {locale === "ko" ? z.labelKo : z.labelEn}
              </text>
              {z.isNew && (
                <g>
                  <rect x={mx - 15} y={BASE + 30} width={30} height={12} rx="6" fill="#1e40af" />
                  <text x={mx} y={BASE + 39} textAnchor="middle" fill="white" fontSize="7.5" fontWeight="800" style={FONT}>
                    NEW
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* ── Phase 1/2/3 group bands below ── */}
        <g opacity="0.9">
          <line x1={50} y1={BASE + 56} x2={445} y2={BASE + 56} stroke="#9ca3af" strokeWidth="1.5" />
          <text x={247} y={BASE + 72} textAnchor="middle" fill="#6b7280" fontSize="10" fontWeight="800" style={FONT}>
            Phase 1 · {locale === "ko" ? "캐즘 돌파 (TALC)" : "Crossing the Chasm (TALC)"}
          </text>
          <line x1={445} y1={BASE + 56} x2={650} y2={BASE + 56} stroke="#60a5fa" strokeWidth="1.5" />
          <text x={547} y={BASE + 72} textAnchor="middle" fill="#2563eb" fontSize="10" fontWeight="800" style={FONT}>
            Phase 2 · {locale === "ko" ? "메인 스트리트" : "Main Street"}
          </text>
          <line x1={650} y1={BASE + 56} x2={750} y2={BASE + 56} stroke="#f87171" strokeWidth="1.5" />
          <text x={700} y={BASE + 72} textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="800" style={FONT}>
            Phase 3 · {locale === "ko" ? "쇠퇴" : "Decline"}
          </text>
        </g>

        {/* ── Time axis at bottom ── */}
        <text x={400} y={BASE + 100} textAnchor="middle" fill="#9ca3af" fontSize="10" fontWeight="700" style={FONT}>
          {locale === "ko" ? "시간 →" : "Time →"}
        </text>
      </svg>
    </div>
  );
}
