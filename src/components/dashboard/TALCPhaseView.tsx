import type { Firm } from "@/types/firm";
import type { ClassificationResult, ClassificationTier, MarketPhase } from "@/types/classification";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

/* ── Gaussian curve math (same as Learn TALCCurve) ── */
const MU = 400;
const SIGMA = 155;
const AMP = 200;
const BASE = 240;

function g(x: number) {
  return BASE - AMP * Math.exp(-((x - MU) ** 2) / (2 * SIGMA ** 2));
}

const PTS: [number, number][] = [];
for (let x = 50; x <= 750; x += 3) PTS.push([x, g(x)]);

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

/* ── Phase zones mapped to x-coordinates on the curve ── */
const PHASE_ZONES: {
  phase: MarketPhase;
  x0: number;
  x1: number;
  fill: string;
  fillOpacity: number;
  emoji: string;
  labelKo: string;
  labelEn: string;
  descKo: string;
}[] = [
  { phase: "Early Market",  x0: 50,  x1: 256, fill: "#e5e7eb", fillOpacity: 0.7, emoji: "🌱", labelKo: "초기 시장",      labelEn: "Early Market",   descKo: "얼리어답터 단계. 기술은 있으나 실용적 시장 진입 전" },
  { phase: "Bowling Alley", x0: 280, x1: 370, fill: "#fef3c7", fillOpacity: 0.8, emoji: "🎳", labelKo: "볼링앨리",      labelEn: "Bowling Alley",  descKo: "틈새시장 공략 중. 실용주의자들이 하나씩 채택 시작" },
  { phase: "Tornado",       x0: 370, x1: 460, fill: "#a7f3d0", fillOpacity: 0.8, emoji: "🌪️", labelKo: "토네이도",      labelEn: "Tornado",        descKo: "폭발적 성장. 고릴라가 결정되는 순간 — 매수 윈도우" },
  { phase: "Main Street",   x0: 460, x1: 630, fill: "#bfdbfe", fillOpacity: 0.7, emoji: "🏙️", labelKo: "메인 스트리트", labelEn: "Main Street",    descKo: "성숙기. 안정적 수익 + 배당 단계" },
  { phase: "End of Life",   x0: 630, x1: 750, fill: "#e5e7eb", fillOpacity: 0.5, emoji: "📉", labelKo: "쇠퇴기",        labelEn: "End of Life",    descKo: "시장 축소. 차세대 기술로 교체 진행" },
];

const TIER_DOT: Record<ClassificationTier, string> = {
  Gorilla:           "bg-emerald-500",
  "Potential Gorilla": "bg-teal-500",
  King:              "bg-[#0064FF]",
  Prince:            "bg-indigo-400",
  Serf:              "bg-stone-400",
  Chimpanzee:        "bg-yellow-500",
  Monkey:            "bg-orange-500",
  "In Chasm":        "bg-red-500",
};

const TIER_TEXT: Record<ClassificationTier, string> = {
  Gorilla:           "text-emerald-700",
  "Potential Gorilla": "text-teal-600",
  King:              "text-[#0064FF]",
  Prince:            "text-indigo-500",
  Serf:              "text-stone-500",
  Chimpanzee:        "text-yellow-700",
  Monkey:            "text-orange-600",
  "In Chasm":        "text-red-500",
};

const PHASE_CARD_STYLE: Record<MarketPhase, { bg: string; ring: string; accent: string }> = {
  "Early Market":  { bg: "bg-gray-50/60",       ring: "ring-gray-200",    accent: "text-gray-600" },
  "Bowling Alley": { bg: "bg-yellow-50/60",     ring: "ring-yellow-200",  accent: "text-yellow-700" },
  "Tornado":       { bg: "bg-emerald-50/60",    ring: "ring-emerald-300", accent: "text-emerald-700" },
  "Main Street":   { bg: "bg-blue-50/50",       ring: "ring-blue-200",    accent: "text-[#0064FF]" },
  "End of Life":   { bg: "bg-gray-50/40",       ring: "ring-gray-200",    accent: "text-gray-500" },
};

const FONT: React.CSSProperties = { fontFamily: "system-ui, -apple-system, sans-serif" };

interface Props {
  locale: string;
  firms: Firm[];
  classifications: Map<string, ClassificationResult>;
}

export default async function TALCPhaseView({ locale, firms, classifications }: Props) {
  const tTiers = await getTranslations({ locale, namespace: "tiers" });

  // Group firms by market phase
  const phaseGroups = new Map<MarketPhase, { firm: Firm; cls: ClassificationResult }[]>();
  PHASE_ZONES.forEach((z) => phaseGroups.set(z.phase, []));
  for (const firm of firms) {
    const cls = classifications.get(firm.id);
    if (!cls) continue;
    phaseGroups.get(cls.marketPhase)?.push({ firm, cls });
  }
  for (const arr of phaseGroups.values()) {
    arr.sort((a, b) => b.cls.totalScore - a.cls.totalScore);
  }

  const chasmY = g(268);

  return (
    <section className="space-y-4">
      <div>
        <h2 className="mb-1">기술 수용 주기(TALC) 단계별 기업 분포</h2>
        <p className="text-sm text-gray-400 font-medium">각 기업이 TALC의 어느 단계에 있는지 — 토네이도 구간이 매수 윈도우입니다</p>
      </div>

      {/* ── TALC Curve SVG ── */}
      <div className="toss-card !p-4 sm:!p-6 overflow-hidden">
        <svg
          viewBox="0 0 800 320"
          className="w-full h-auto select-none"
          role="img"
          aria-label="TALC 단계별 기업 분포"
        >
          {/* Phase zone fills */}
          {PHASE_ZONES.map((z) => (
            <path key={z.phase} d={areaPath(z.x0, z.x1)} fill={z.fill} opacity={z.fillOpacity} />
          ))}

          {/* Chasm gap */}
          <line x1={256} y1={20} x2={256} y2={BASE} stroke="#fca5a5" strokeWidth="1.5" strokeDasharray="5,4" />
          <line x1={280} y1={20} x2={280} y2={BASE} stroke="#fca5a5" strokeWidth="1.5" strokeDasharray="5,4" />
          <rect x={256} y={20} width={24} height={BASE - 20} fill="#fef2f2" opacity="0.5" />

          {/* Curve strokes */}
          <path d={linePath(50, 256)} fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />
          <path d={linePath(280, 750)} fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />

          {/* Chasm lightning bolt */}
          <path
            d={`M260,${chasmY + 5}L270,${chasmY + 22}L264,${chasmY + 22}L276,${chasmY + 42}`}
            fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          />
          <text x={268} y={chasmY - 2} textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="800" style={FONT}>
            캐즘
          </text>

          {/* Tornado BUY window highlight */}
          <rect x={370} y={g(415) - 8} width={90} height={16} rx="8" fill="#059669" opacity="0.15" />
          <text x={415} y={g(415) + 3} textAnchor="middle" fill="#059669" fontSize="9" fontWeight="800" style={FONT}>
            BUY WINDOW
          </text>

          {/* Baseline */}
          <line x1={40} y1={BASE} x2={760} y2={BASE} stroke="#e5e7eb" strokeWidth="1.5" />

          {/* Phase labels with counts */}
          {PHASE_ZONES.map((z) => {
            const count = phaseGroups.get(z.phase)?.length ?? 0;
            const mx = (z.x0 + z.x1) / 2;
            const isTornado = z.phase === "Tornado";
            return (
              <g key={`label-${z.phase}`}>
                <text x={mx} y={BASE + 18} textAnchor="middle" fill={isTornado ? "#059669" : "#6b7280"} fontSize="11" fontWeight="800" style={FONT}>
                  {z.emoji} {locale === "ko" ? z.labelKo : z.labelEn}
                </text>
                <text x={mx} y={BASE + 36} textAnchor="middle" fill={isTornado ? "#059669" : "#9ca3af"} fontSize="11" fontWeight="700" style={FONT}>
                  {count}개 기업
                </text>
              </g>
            );
          })}

          {/* #1 firm dot per phase — highest score in each phase */}
          {PHASE_ZONES.map((z) => {
            const items = phaseGroups.get(z.phase) ?? [];
            if (items.length === 0) return null;
            const top = items[0]; // already sorted by totalScore desc
            const mx = (z.x0 + z.x1) / 2;
            const cy = g(mx) - 16;
            const dotColor =
              top.cls.tier === "Gorilla" ? "#10b981" :
              top.cls.tier === "Potential Gorilla" ? "#14b8a6" :
              top.cls.tier === "King" ? "#3b82f6" :
              top.cls.tier === "Chimpanzee" ? "#eab308" :
              "#9ca3af";
            return (
              <g key={`top-${z.phase}`}>
                {/* Connector line */}
                <line x1={mx} y1={cy + 4} x2={mx} y2={g(mx) - 2} stroke={dotColor} strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
                {/* Dot */}
                <circle cx={mx} cy={cy} r="4" fill={dotColor} stroke="white" strokeWidth="1.5" />
                {/* Ticker label */}
                <text x={mx} y={cy - 10} textAnchor="middle" fill="#374151" fontSize="9" fontWeight="800" style={FONT}>
                  {top.firm.ticker}
                </text>
                {/* Score */}
                <text x={mx} y={cy - 1} textAnchor="middle" fill="white" fontSize="5" fontWeight="800" style={FONT}>
                  {top.cls.totalScore}
                </text>
              </g>
            );
          })}

          {/* Legend */}
          <text x={760} y={18} textAnchor="end" fill="#9ca3af" fontSize="8" fontWeight="600" style={FONT}>
            ● 각 단계 최고점수 기업
          </text>
        </svg>
      </div>

      {/* ── Phase detail cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {PHASE_ZONES.map((z) => {
          const items = phaseGroups.get(z.phase) ?? [];
          const style = PHASE_CARD_STYLE[z.phase];
          const isTornado = z.phase === "Tornado";
          return (
            <div key={z.phase} className={`rounded-2xl p-4 ${style.bg} ring-1 ${style.ring} ${isTornado ? "ring-2" : ""}`}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-base">{z.emoji}</span>
                <span className={`text-xs font-extrabold ${style.accent}`}>
                  {locale === "ko" ? z.labelKo : z.labelEn}
                </span>
                <span className="ml-auto text-xs font-extrabold text-gray-400">{items.length}</span>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed mb-3">{z.descKo}</p>

              {isTornado && items.length > 0 && (
                <div className="toss-pill bg-emerald-100 text-emerald-700 text-[9px] mb-2">
                  매수 윈도우
                </div>
              )}

              <div className="space-y-1">
                {items.slice(0, 10).map(({ firm, cls }) => (
                  <Link key={firm.id} href={`/firms/${firm.slug}`}>
                    <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/70 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${TIER_DOT[cls.tier]}`} />
                      <span className="font-extrabold text-gray-900 text-[11px]">{firm.ticker}</span>
                      <span className={`ml-auto text-[9px] font-bold ${TIER_TEXT[cls.tier]}`}>
                        {tTiers(`${cls.tier}.label` as "Gorilla.label")}
                      </span>
                    </div>
                  </Link>
                ))}
                {items.length > 10 && (
                  <Link href="/firms">
                    <div className={`text-center text-[10px] font-bold py-1 hover:underline ${style.accent}`}>
                      +{items.length - 10}개 →
                    </div>
                  </Link>
                )}
                {items.length === 0 && (
                  <div className="text-center text-[10px] text-gray-300 py-2">—</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
