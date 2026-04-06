/* Bell‑curve visualisation of the Technology Adoption Life Cycle
   — pure SVG, no external images, server component */

const MU = 400;
const SIGMA = 155;
const AMP = 258;
const BASE = 295;

function g(x: number) {
  return BASE - AMP * Math.exp(-((x - MU) ** 2) / (2 * SIGMA ** 2));
}

// Pre-compute curve points (step = 3 for smooth look)
const PTS: [number, number][] = [];
for (let x = 50; x <= 750; x += 3) PTS.push([x, g(x)]);

const SEGS = [
  { id: "innov", label: "Innovators", pct: "2.5%", x0: 50, x1: 135, fill: "#e5e7eb" },
  { id: "early", label: "Early Adopters", pct: "13.5%", x0: 135, x1: 256, fill: "#bfdbfe" },
  { id: "emaj", label: "Early Majority", pct: "34%", x0: 280, x1: 460, fill: "#a7f3d0" },
  { id: "lmaj", label: "Late Majority", pct: "34%", x0: 460, x1: 630, fill: "#bfdbfe" },
  { id: "lag", label: "Laggards", pct: "16%", x0: 630, x1: 750, fill: "#e5e7eb" },
];

function area(x0: number, x1: number) {
  const p = PTS.filter(([x]) => x >= x0 && x <= x1);
  if (!p.length) return "";
  return [
    `M${p[0][0]},${p[0][1]}`,
    ...p.slice(1).map(([x, y]) => `L${x},${y}`),
    `L${p.at(-1)![0]},${BASE}`,
    `L${p[0][0]},${BASE}Z`,
  ].join("");
}

function line(x0: number, x1: number) {
  const p = PTS.filter(([x]) => x >= x0 && x <= x1);
  return `M${p[0][0]},${p[0][1]}${p.slice(1).map(([x, y]) => `L${x},${y}`).join("")}`;
}

const FONT: React.CSSProperties = { fontFamily: "system-ui, -apple-system, sans-serif" };

export default function TALCCurve() {
  const chasmY = g(268);

  return (
    <div className="toss-card !p-4 sm:!p-6 mt-5 overflow-hidden">
      <svg
        viewBox="0 0 800 385"
        className="w-full h-auto select-none"
        role="img"
        aria-label="Technology Adoption Life Cycle bell curve"
      >
        {/* ── Region headers ── */}
        <text x={150} y={22} textAnchor="middle" fill="#9ca3af" fontSize="11" fontWeight="800" letterSpacing="2" style={FONT}>
          EARLY MARKET
        </text>
        <text x={268} y={22} textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="800" letterSpacing="2" style={FONT}>
          THE CHASM
        </text>
        <text x={545} y={22} textAnchor="middle" fill="#9ca3af" fontSize="11" fontWeight="800" letterSpacing="2" style={FONT}>
          MAINSTREAM MARKET
        </text>

        {/* ── Chasm dashed boundaries ── */}
        <line x1={256} y1={32} x2={256} y2={BASE} stroke="#fca5a5" strokeWidth="1.5" strokeDasharray="5,4" />
        <line x1={280} y1={32} x2={280} y2={BASE} stroke="#fca5a5" strokeWidth="1.5" strokeDasharray="5,4" />

        {/* ── Filled segments ── */}
        {SEGS.map((s) => (
          <path key={s.id} d={area(s.x0, s.x1)} fill={s.fill} opacity="0.85" />
        ))}

        {/* ── Curve stroke (split at chasm) ── */}
        <path d={line(50, 256)} fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />
        <path d={line(280, 750)} fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />

        {/* ── Chasm lightning bolt ── */}
        <path
          d={`M260,${chasmY + 8}L270,${chasmY + 28}L264,${chasmY + 28}L276,${chasmY + 50}`}
          fill="none"
          stroke="#ef4444"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ── Baseline ── */}
        <line x1={40} y1={BASE} x2={760} y2={BASE} stroke="#e5e7eb" strokeWidth="1.5" />

        {/* ── Segment labels ── */}
        {SEGS.map((s) => {
          const mx = (s.x0 + s.x1) / 2;
          return (
            <g key={`${s.id}-lbl`}>
              <text x={mx} y={BASE + 22} textAnchor="middle" fill="#374151" fontSize="13" fontWeight="700" style={FONT}>
                {s.label}
              </text>
              <text x={mx} y={BASE + 40} textAnchor="middle" fill="#9ca3af" fontSize="12" fontWeight="700" style={FONT}>
                {s.pct}
              </text>
            </g>
          );
        })}

        {/* ── Moore's phase mapping (subtle row below) ── */}
        <line x1={50} y1={BASE + 55} x2={750} y2={BASE + 55} stroke="#f3f4f6" strokeWidth="1" />
        {[
          { label: "🌱 Early Mkt", x0: 50, x1: 135 },
          { label: "🎳 Bowling Alley", x0: 135, x1: 256 },
          { label: "🌪️ Tornado", x0: 280, x1: 460 },
          { label: "🏙️ Main Street", x0: 460, x1: 630 },
          { label: "📉 End of Life", x0: 630, x1: 750 },
        ].map((p) => (
          <text
            key={p.label}
            x={(p.x0 + p.x1) / 2}
            y={BASE + 72}
            textAnchor="middle"
            fill="#9ca3af"
            fontSize="11"
            fontWeight="600"
            style={FONT}
          >
            {p.label}
          </text>
        ))}

        {/* ── BUY window highlight ── */}
        <rect x={280} y={BASE + 58} width={180} height={20} rx="4" fill="#ecfdf5" opacity="0.6" />
        <text x={370} y={BASE + 72} textAnchor="middle" fill="#059669" fontSize="11" fontWeight="800" style={FONT}>
          🌪️ Tornado
        </text>
      </svg>
    </div>
  );
}
