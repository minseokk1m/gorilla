import type { Firm } from "@/types/firm";
import type { ClassificationResult, ClassificationTier, MarketPhase } from "@/types/classification";
import { HYPE_TECHNOLOGIES } from "@/lib/data/mock/hype-technologies";
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

/* ── Mini Hype Cycle overlay within Early Market zone (x: 50–256) ── */
// Hype cycle shape: trigger(55) → peak(155) → trough(245)
const HYPE_PEAK_X = 155;
const HYPE_PEAK_Y = 52;   // above the TALC curve
const HYPE_TROUGH_Y = BASE - 30;
const HYPE_CURVE = [
  "M 60,225",
  "C 75,220 90,200 105,170",
  "C 120,135 135,95 145,70",
  `C 150,55 155,${HYPE_PEAK_Y} 160,${HYPE_PEAK_Y}`,   // peak
  `C 165,${HYPE_PEAK_Y} 170,58 175,75`,
  "C 185,110 195,145 205,175",
  `C 215,200 225,${HYPE_TROUGH_Y - 5} 235,${HYPE_TROUGH_Y}`, // trough
  `C 240,${HYPE_TROUGH_Y + 2} 245,${HYPE_TROUGH_Y + 2} 250,${HYPE_TROUGH_Y - 2}`,
].join(" ");

// Positions for rising/falling firm dots on hype curve
const HYPE_RISING_POS = [
  { x: 120, y: 145 },  // slot 1
  { x: 132, y: 110 },  // slot 2
  { x: 144, y: 75 },   // slot 3
];
const HYPE_FALLING_POS = [
  { x: 195, y: 145 },  // slot 1
  { x: 210, y: 185 },  // slot 2
];

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
  actionKo: string;
  group: "pre-chasm" | "pre-standard" | "main-street" | "decline";
}[] = [
  { phase: "Early Market",           x0: 50,  x1: 256, fill: "#e5e7eb", fillOpacity: 0.7, emoji: "🌱", labelKo: "초기 시장",   labelEn: "Early Market",           descKo: "캐즘 이전. 하입사이클로 과열을 감지하여 RIDE/EXIT 판단", actionKo: "🔭 초고성장 시장을 발견하라",         group: "pre-chasm" },
  { phase: "Bowling Alley",          x0: 280, x1: 365, fill: "#fef3c7", fillOpacity: 0.8, emoji: "🎳", labelKo: "볼링앨리",    labelEn: "Bowling Alley",          descKo: "틈새시장 공략 중. 실용주의자들이 채택 시작",           actionKo: "🧺 고릴라 후보를 바구니로 매입하라",  group: "pre-standard" },
  { phase: "Tornado",                x0: 365, x1: 445, fill: "#a7f3d0", fillOpacity: 0.85, emoji: "🌪️", labelKo: "토네이도",    labelEn: "Tornado",                descKo: "폭발적 성장. 고릴라가 결정되는 순간",                  actionKo: "🎯 고릴라에 집중하고 나머지를 처분하라", group: "pre-standard" },
  { phase: "Thriving Main Street",   x0: 445, x1: 520, fill: "#bfdbfe", fillOpacity: 0.8, emoji: "🌿", labelKo: "성장 메인",   labelEn: "Thriving Main Street",   descKo: "토네이도 직후 고속 성장. 아직 강한 외연 확장",          actionKo: "💎 핵심 보유 + 추가 매수 검토",         group: "main-street" },
  { phase: "Maturing Main Street",   x0: 520, x1: 590, fill: "#dbeafe", fillOpacity: 0.7, emoji: "🏙️", labelKo: "성숙 메인",   labelEn: "Maturing Main Street",   descKo: "캐시카우 구간. 고마진 + 배당 본격화",                   actionKo: "💰 보유 + 배당 수취",                  group: "main-street" },
  { phase: "Declining Main Street",  x0: 590, x1: 650, fill: "#fde68a", fillOpacity: 0.55, emoji: "🍂", labelKo: "쇠퇴 메인",   labelEn: "Declining Main Street",  descKo: "성장 둔화, 아직 흑자. 경쟁자 급부상 주의",              actionKo: "⚠️ 비중 축소 + 재검토",                group: "main-street" },
  { phase: "Fault Line",             x0: 650, x1: 705, fill: "#fecaca", fillOpacity: 0.6, emoji: "⚡", labelKo: "단층선",      labelEn: "Fault Line",             descKo: "구조적 단절 경고. 대체기술이 카테고리를 위협",          actionKo: "🚪 탈출 준비 — 포지션 정리",           group: "decline" },
  { phase: "End of Life",            x0: 705, x1: 750, fill: "#e5e7eb", fillOpacity: 0.5, emoji: "📉", labelKo: "수명 종료",   labelEn: "End of Life",            descKo: "시장 축소 완료. 차세대 기술로 교체",                    actionKo: "❌ 매도",                              group: "decline" },
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
  "Early Market":           { bg: "bg-gray-50/60",    ring: "ring-gray-200",    accent: "text-gray-600" },
  "Bowling Alley":          { bg: "bg-yellow-50/60",  ring: "ring-yellow-200",  accent: "text-yellow-700" },
  "Tornado":                { bg: "bg-emerald-50/60", ring: "ring-emerald-300", accent: "text-emerald-700" },
  "Thriving Main Street":   { bg: "bg-blue-50/60",    ring: "ring-blue-200",    accent: "text-[#0064FF]" },
  "Maturing Main Street":   { bg: "bg-blue-50/40",    ring: "ring-blue-200",    accent: "text-blue-600" },
  "Declining Main Street":  { bg: "bg-amber-50/60",   ring: "ring-amber-200",   accent: "text-amber-700" },
  "Fault Line":             { bg: "bg-red-50/60",     ring: "ring-red-200",     accent: "text-red-600" },
  "End of Life":            { bg: "bg-gray-50/40",    ring: "ring-gray-200",    accent: "text-gray-500" },
};

const FONT: React.CSSProperties = { fontFamily: "system-ui, -apple-system, sans-serif" };

interface Props {
  locale: string;
  firms: Firm[];
  classifications: Map<string, ClassificationResult>;
}

export default async function TALCPhaseView({ locale, firms, classifications }: Props) {
  const tTiers = await getTranslations({ locale, namespace: "tiers" });

  // Build hype firm lookup: firmId → "rising" | "falling"
  const hypeFirmStatus = new Map<string, "rising" | "falling">();
  for (const tech of HYPE_TECHNOLOGIES) {
    for (const fid of tech.firmIds) {
      hypeFirmStatus.set(fid, tech.peakStatus);
    }
  }

  // Group firms by market phase
  const phaseGroups = new Map<MarketPhase, { firm: Firm; cls: ClassificationResult }[]>();
  PHASE_ZONES.forEach((z) => phaseGroups.set(z.phase, []));
  for (const firm of firms) {
    const cls = classifications.get(firm.id);
    if (!cls) continue;
    phaseGroups.get(cls.marketPhase)?.push({ firm, cls });
  }
  for (const [phase, arr] of phaseGroups.entries()) {
    if (phase === "Early Market") {
      // Hype firms first: rising → falling → rest (by score)
      arr.sort((a, b) => {
        const ha = hypeFirmStatus.get(a.firm.id);
        const hb = hypeFirmStatus.get(b.firm.id);
        const rank = (s: "rising" | "falling" | undefined) => s === "rising" ? 0 : s === "falling" ? 1 : 2;
        if (rank(ha) !== rank(hb)) return rank(ha) - rank(hb);
        return b.cls.totalScore - a.cls.totalScore;
      });
    } else {
      arr.sort((a, b) => b.cls.totalScore - a.cls.totalScore);
    }
  }

  const chasmY = g(268);

  return (
    <section className="space-y-4">
      <div>
        <h2 className="mb-1">시장 단계별 기업 분포</h2>
        <p className="text-sm text-gray-400 font-medium">Moore의 전체 생애주기 — Phase 1(캐즘 돌파) · Phase 2(메인 스트리트 3단계) · Phase 3(단층선·수명 종료)</p>
      </div>

      {/* ── TALC Curve SVG ── */}
      <div className="toss-card !p-4 sm:!p-6 overflow-hidden">
        <svg
          viewBox="0 0 800 340"
          className="w-full h-auto select-none"
          role="img"
          aria-label="TALC 단계별 기업 분포"
        >
          {/* Phase zone fills */}
          {PHASE_ZONES.map((z) => (
            <path key={z.phase} d={areaPath(z.x0, z.x1)} fill={z.fill} opacity={z.fillOpacity} />
          ))}

          {/* ── Hype Cycle overlay in Early Market ── */}
          <defs>
            <linearGradient id="hypeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.08" />
              <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.15" />
              <stop offset="60%" stopColor="#ef4444" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.06" />
            </linearGradient>
          </defs>
          {/* Hype curve fill */}
          <path d={`${HYPE_CURVE} L250,${BASE} L60,${BASE} Z`} fill="url(#hypeGrad)" />
          {/* Hype curve stroke */}
          <path d={HYPE_CURVE} fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3" opacity="0.8" />

          {/* Peak label */}
          <text x={HYPE_PEAK_X} y={HYPE_PEAK_Y - 10} textAnchor="middle" fill="#b45309" fontSize="7.5" fontWeight="800" style={FONT}>
            과대기대 정점
          </text>

          {/* Rising / Falling zone labels */}
          <text x={105} y={BASE - 6} textAnchor="middle" fill="#f59e0b" fontSize="7.5" fontWeight="800" style={FONT}>
            🔥 RIDE
          </text>
          <text x={218} y={BASE - 6} textAnchor="middle" fill="#ef4444" fontSize="7.5" fontWeight="800" style={FONT}>
            📉 EXIT
          </text>

          {/* Hype firm dots — rising */}
          {(() => {
            const rising = HYPE_TECHNOLOGIES.filter(t => t.peakStatus === "rising");
            return rising.map((tech, i) => {
              const pos = HYPE_RISING_POS[i % HYPE_RISING_POS.length];
              const firmId = tech.firmIds[0];
              const firm = firms.find(f => f.id === firmId);
              if (!firm) return null;
              return (
                <g key={`hype-r-${tech.id}`}>
                  <circle cx={pos.x} cy={pos.y} r="3.5" fill="#f59e0b" stroke="white" strokeWidth="1.5" />
                  <text x={pos.x} y={pos.y - 8} textAnchor="middle" fill="#92400e" fontSize="7.5" fontWeight="800" style={FONT}>
                    {firm.ticker}
                  </text>
                </g>
              );
            });
          })()}

          {/* Hype firm dots — falling */}
          {(() => {
            const falling = HYPE_TECHNOLOGIES.filter(t => t.peakStatus === "falling");
            return falling.map((tech, i) => {
              const pos = HYPE_FALLING_POS[i % HYPE_FALLING_POS.length];
              const firmId = tech.firmIds[0];
              const firm = firms.find(f => f.id === firmId);
              if (!firm) return null;
              return (
                <g key={`hype-f-${tech.id}`}>
                  <circle cx={pos.x} cy={pos.y} r="3.5" fill="#ef4444" stroke="white" strokeWidth="1.5" />
                  <text x={pos.x} y={pos.y - 8} textAnchor="middle" fill="#991b1b" fontSize="7.5" fontWeight="800" style={FONT}>
                    {firm.ticker}
                  </text>
                </g>
              );
            });
          })()}

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

          {/* Tornado highlight — standard is decided here */}
          <rect x={370} y={g(405) - 8} width={70} height={16} rx="8" fill="#059669" opacity="0.12" />
          <text x={405} y={g(405) + 3} textAnchor="middle" fill="#059669" fontSize="7.5" fontWeight="800" style={FONT}>
            표준 결정
          </text>

          {/* Fault Line fracture marker */}
          {(() => {
            const flX = 677;
            const flY = g(flX);
            return (
              <g>
                <path
                  d={`M${flX - 4},${flY + 6}L${flX + 2},${flY + 16}L${flX - 2},${flY + 16}L${flX + 6},${flY + 28}`}
                  fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                />
              </g>
            );
          })()}

          {/* Baseline */}
          <line x1={40} y1={BASE} x2={760} y2={BASE} stroke="#e5e7eb" strokeWidth="1.5" />

          {/* Phase group bands (Moore's Phase 1/2/3) */}
          <g opacity="0.85">
            <line x1={50} y1={BASE + 50} x2={445} y2={BASE + 50} stroke="#9ca3af" strokeWidth="1" />
            <text x={247} y={BASE + 62} textAnchor="middle" fill="#6b7280" fontSize="8.5" fontWeight="700" style={FONT}>
              Phase 1 · 캐즘 돌파
            </text>
            <line x1={445} y1={BASE + 50} x2={650} y2={BASE + 50} stroke="#60a5fa" strokeWidth="1" />
            <text x={547} y={BASE + 62} textAnchor="middle" fill="#2563eb" fontSize="8.5" fontWeight="700" style={FONT}>
              Phase 2 · 메인 스트리트
            </text>
            <line x1={650} y1={BASE + 50} x2={750} y2={BASE + 50} stroke="#f87171" strokeWidth="1" />
            <text x={700} y={BASE + 62} textAnchor="middle" fill="#dc2626" fontSize="8.5" fontWeight="700" style={FONT}>
              Phase 3 · 쇠퇴
            </text>
          </g>

          {/* Phase labels with counts */}
          {PHASE_ZONES.map((z) => {
            const count = phaseGroups.get(z.phase)?.length ?? 0;
            const mx = (z.x0 + z.x1) / 2;
            const isTornado = z.phase === "Tornado";
            const isFaultLine = z.phase === "Fault Line";
            const labelFill = isTornado ? "#059669" : isFaultLine ? "#dc2626" : "#6b7280";
            const countFill = isTornado ? "#059669" : isFaultLine ? "#dc2626" : "#9ca3af";
            return (
              <g key={`label-${z.phase}`}>
                <text x={mx} y={BASE + 18} textAnchor="middle" fill={labelFill} fontSize="9.5" fontWeight="800" style={FONT}>
                  {z.emoji} {locale === "ko" ? z.labelKo : z.labelEn}
                </text>
                <text x={mx} y={BASE + 32} textAnchor="middle" fill={countFill} fontSize="9" fontWeight="700" style={FONT}>
                  {count}
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
                {/* Ticker + score label */}
                <text x={mx} y={cy - 10} textAnchor="middle" fill="#374151" fontSize="9" fontWeight="800" style={FONT}>
                  {top.firm.ticker}
                </text>
                <text x={mx} y={cy + 12} textAnchor="middle" fill={dotColor} fontSize="8" fontWeight="800" style={FONT}>
                  {top.cls.totalScore}점
                </text>
              </g>
            );
          })}

          {/* Legend */}
          <g>
            <text x={760} y={14} textAnchor="end" fill="#9ca3af" fontSize="7.5" fontWeight="600" style={FONT}>
              ● 각 단계 최고점수 기업
            </text>
            <line x1={672} y1={23} x2={692} y2={23} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,2" />
            <text x={760} y={27} textAnchor="end" fill="#b45309" fontSize="7.5" fontWeight="600" style={FONT}>
              하입사이클 (초기 시장)
            </text>
          </g>
        </svg>
      </div>

      {/* ── Phase detail cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PHASE_ZONES.map((z) => {
          const items = phaseGroups.get(z.phase) ?? [];
          const style = PHASE_CARD_STYLE[z.phase];
          const isTornado = z.phase === "Tornado";
          const isFaultLine = z.phase === "Fault Line";
          const emphasized = isTornado || isFaultLine;
          return (
            <div key={z.phase} className={`rounded-2xl p-4 ${style.bg} ring-1 ${style.ring} ${emphasized ? "ring-2" : ""} flex flex-col`}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-base">{z.emoji}</span>
                <span className={`text-xs font-extrabold ${style.accent}`}>
                  {locale === "ko" ? z.labelKo : z.labelEn}
                </span>
                <span className="ml-auto text-xs font-extrabold text-gray-400">{items.length}</span>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed mb-2">{z.descKo}</p>
              <p className="text-[9px] font-bold text-gray-900 bg-gray-100 rounded-lg px-2 py-1 mb-2">{z.actionKo}</p>

              {z.phase === "Early Market" && items.length > 0 && (
                <div className="toss-pill bg-amber-100 text-amber-700 text-[9px] mb-2">
                  하입사이클에 따라 거품이 생기는 구간
                </div>
              )}

              {isTornado && items.length > 0 && (
                <div className="toss-pill bg-emerald-100 text-emerald-700 text-[9px] mb-2">
                  고릴라가 결정되는 구간
                </div>
              )}

              {isFaultLine && items.length > 0 && (
                <div className="toss-pill bg-red-100 text-red-700 text-[9px] mb-2">
                  구조적 단절 — 탈출 준비 구간
                </div>
              )}

              {/* Scrollable firm list — max-h with overflow */}
              <div className="space-y-1 max-h-[280px] overflow-y-auto overscroll-contain pr-0.5" style={{ scrollbarWidth: "thin", scrollbarColor: "#d1d5db transparent" }}>
                {items.map(({ firm, cls }) => {
                  const isBuy = cls.tier === "Gorilla" || cls.tier === "Potential Gorilla";
                  const hypeStatus = z.phase === "Early Market" ? hypeFirmStatus.get(firm.id) : undefined;
                  const rowBg = hypeStatus === "rising"
                    ? "bg-emerald-100/70 hover:bg-emerald-100"
                    : hypeStatus === "falling"
                      ? "bg-orange-100/70 hover:bg-orange-100"
                      : isBuy
                        ? "bg-emerald-100/60 hover:bg-emerald-100"
                        : "bg-white/70 hover:bg-white";
                  const tickerColor = hypeStatus === "rising"
                    ? "text-emerald-900"
                    : hypeStatus === "falling"
                      ? "text-orange-900"
                      : isBuy ? "text-emerald-900" : "text-gray-900";
                  return (
                    <Link key={firm.id} href={`/firms/${firm.slug}`}>
                      <div className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:shadow-sm transition-all cursor-pointer ${rowBg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          hypeStatus === "rising" ? "bg-emerald-500" : hypeStatus === "falling" ? "bg-orange-500" : TIER_DOT[cls.tier]
                        }`} />
                        <span className={`font-extrabold text-[11px] ${tickerColor}`}>{firm.ticker}</span>
                        {hypeStatus ? (
                          <span className={`ml-auto text-[9px] font-extrabold ${
                            hypeStatus === "rising" ? "text-emerald-600" : "text-orange-600"
                          }`}>
                            {hypeStatus === "rising" ? "🔥 RIDE" : "📉 EXIT"}
                          </span>
                        ) : (
                          <span className={`ml-auto text-[9px] font-bold ${TIER_TEXT[cls.tier]}`}>
                            {tTiers(`${cls.tier}.label` as "Gorilla.label")}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
                {items.length === 0 && (
                  <div className="text-center text-[10px] text-gray-300 py-2">—</div>
                )}
              </div>
              {/* Scroll hint for long lists */}
              {items.length > 8 && (
                <div className="text-center text-[9px] text-gray-300 mt-1.5 select-none">
                  ↕ 스크롤하여 {items.length}개 전체 보기
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
