import type { Firm } from "@/types/firm";
import type { ClassificationResult, HypePhase, HypeTechnology } from "@/types/classification";
import { Link } from "@/i18n/routing";
import { HYPE_TECHNOLOGIES } from "@/lib/data/mock/hype-technologies";

/* ── Hype Cycle curve math ──
 * Classic Gartner shape:
 *   1. Steep rise to peak (Innovation → Peak)
 *   2. Sharp drop to trough (Peak → Trough)
 *   3. Gradual climb to plateau (Trough → Slope → Plateau)
 */
const W = 800;
const H = 320;
const BASE_Y = 280;

function hypeCurveY(x: number): number {
  // Peak centered around x=200, trough around x=380, plateau around x=650
  const peak = 220 * Math.exp(-((x - 200) ** 2) / (2 * 60 ** 2));
  const trough = -30 * Math.exp(-((x - 380) ** 2) / (2 * 50 ** 2));
  const plateau = 90 * (1 / (1 + Math.exp(-(x - 520) / 60)));
  return BASE_Y - peak - trough - plateau;
}

const CURVE_PTS: [number, number][] = [];
for (let x = 40; x <= 760; x += 2) CURVE_PTS.push([x, hypeCurveY(x)]);

const curvePath = `M${CURVE_PTS[0][0]},${CURVE_PTS[0][1]}${CURVE_PTS.slice(1).map(([x, y]) => `L${x},${y}`).join("")}`;

/* ── Phase zones on the x-axis ── */
interface PhaseZone {
  phase: HypePhase;
  x0: number;
  x1: number;
  labelKo: string;
  labelEn: string;
  color: string;
  bgColor: string;
  descKo: string;
  signal: string;
  signalColor: string;
}

const PHASE_ZONES: PhaseZone[] = [
  {
    phase: "Innovation Trigger",
    x0: 40, x1: 140,
    labelKo: "기술 촉발", labelEn: "Innovation Trigger",
    color: "#6366f1", bgColor: "bg-indigo-50/60",
    descKo: "새로운 기술이 세상에 등장. 아직 시장 없음. 초고위험·초고수익.",
    signal: "🔬 관찰", signalColor: "text-indigo-600",
  },
  {
    phase: "Peak of Inflated Expectations",
    x0: 140, x1: 280,
    labelKo: "과대 기대 정점", labelEn: "Peak of Inflated Expectations",
    color: "#ef4444", bgColor: "bg-red-50/60",
    descKo: "미디어 과열 + 투기 자금 유입. 단기 수익 가능하나 거품 위험. 테슬라 2021이 이 구간이었다.",
    signal: "🔥 과열 주의", signalColor: "text-red-600",
  },
  {
    phase: "Trough of Disillusionment",
    x0: 280, x1: 440,
    labelKo: "환멸의 골짜기", labelEn: "Trough of Disillusionment",
    color: "#f59e0b", bgColor: "bg-amber-50/60",
    descKo: "기대 붕괴 후 가격 폭락. 기술이 진짜라면 최고의 매수 기회. 구조적 장벽 확인 필수.",
    signal: "💎 저점 탐색", signalColor: "text-amber-700",
  },
  {
    phase: "Slope of Enlightenment",
    x0: 440, x1: 600,
    labelKo: "계몽의 경사", labelEn: "Slope of Enlightenment",
    color: "#10b981", bgColor: "bg-emerald-50/60",
    descKo: "실용적 가치 입증 시작. 캐즘 건너기 직전 — TALC 토네이도 진입 대기. 구조적 장벽이 해소되는지 관건.",
    signal: "📈 캐즘 대기", signalColor: "text-emerald-700",
  },
  {
    phase: "Plateau of Productivity",
    x0: 600, x1: 760,
    labelKo: "생산성 안정기", labelEn: "Plateau of Productivity",
    color: "#3b82f6", bgColor: "bg-blue-50/50",
    descKo: "주류 시장 채택 완료 → TALC의 볼링앨리/토네이도로 전환. 이 단계부터는 TALC 분석 적용.",
    signal: "→ TALC 전환", signalColor: "text-blue-600",
  },
];

const FONT: React.CSSProperties = { fontFamily: "system-ui, -apple-system, sans-serif" };

interface Props {
  locale: string;
  firms: Firm[];
  classifications: Map<string, ClassificationResult>;
}

export default function HypeCycleSection({ locale, firms, classifications }: Props) {
  const isKo = locale === "ko";

  // Group technologies by phase
  const phaseGroups = new Map<HypePhase, HypeTechnology[]>();
  PHASE_ZONES.forEach((z) => phaseGroups.set(z.phase, []));
  for (const tech of HYPE_TECHNOLOGIES) {
    phaseGroups.get(tech.hypePhase)?.push(tech);
  }

  // Resolve firm info for each technology
  const firmMap = new Map(firms.map((f) => [f.id, f]));

  // Position for technology bubbles on the curve
  function getTechPosition(tech: HypeTechnology, indexInPhase: number, totalInPhase: number): { x: number; y: number } {
    const zone = PHASE_ZONES.find((z) => z.phase === tech.hypePhase)!;
    const span = zone.x1 - zone.x0;
    const step = span / (totalInPhase + 1);
    const x = zone.x0 + step * (indexInPhase + 1);
    const y = hypeCurveY(x);
    return { x, y };
  }

  return (
    <section className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="mb-0">가트너 하입사이클 — 초기시장 기술 분석</h2>
          <span className="toss-pill bg-red-100 text-red-600 text-[9px]">Pre-Chasm</span>
        </div>
        <p className="text-sm text-gray-400 font-medium">
          TALC 캐즘 이전 초기시장에서는 하입사이클이 투자 타이밍을 결정합니다.
          과대 기대 정점에서 단기 수익을, 환멸의 골짜기에서 장기 매수 기회를 포착합니다.
        </p>
      </div>

      {/* ── Hype Cycle SVG ── */}
      <div className="toss-card !p-4 sm:!p-6 overflow-hidden">
        <svg
          viewBox={`0 0 ${W} ${H + 50}`}
          className="w-full h-auto select-none"
          role="img"
          aria-label="가트너 하입사이클"
        >
          {/* Phase zone fills */}
          {PHASE_ZONES.map((z) => (
            <rect
              key={z.phase}
              x={z.x0}
              y={20}
              width={z.x1 - z.x0}
              height={BASE_Y - 20}
              fill={z.color}
              opacity={0.06}
              rx="4"
            />
          ))}

          {/* Baseline */}
          <line x1={30} y1={BASE_Y} x2={770} y2={BASE_Y} stroke="#e5e7eb" strokeWidth="1.5" />

          {/* Hype curve */}
          <path d={curvePath} fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" opacity="0.8" />

          {/* TALC adoption curve overlay (subtle) */}
          {(() => {
            const talcPts: [number, number][] = [];
            for (let x = 350; x <= 760; x += 2) {
              const mu = 560;
              const sigma = 120;
              const amp = 140;
              const y = BASE_Y - amp * Math.exp(-((x - mu) ** 2) / (2 * sigma ** 2));
              talcPts.push([x, y]);
            }
            const path = `M${talcPts[0][0]},${talcPts[0][1]}${talcPts.slice(1).map(([x, y]) => `L${x},${y}`).join("")}`;
            return <path d={path} fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="6,4" opacity="0.4" />;
          })()}

          {/* Chasm marker between hype and TALC */}
          <line x1={435} y1={30} x2={435} y2={BASE_Y} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.4" />
          <text x={435} y={25} textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="800" style={FONT} opacity="0.6">
            캐즘
          </text>

          {/* Phase labels */}
          {PHASE_ZONES.map((z) => {
            const mx = (z.x0 + z.x1) / 2;
            const count = phaseGroups.get(z.phase)?.length ?? 0;
            return (
              <g key={`label-${z.phase}`}>
                <text x={mx} y={BASE_Y + 18} textAnchor="middle" fill={z.color} fontSize="10" fontWeight="800" style={FONT}>
                  {isKo ? z.labelKo : z.labelEn}
                </text>
                <text x={mx} y={BASE_Y + 33} textAnchor="middle" fill="#9ca3af" fontSize="9" fontWeight="700" style={FONT}>
                  {count}개 기술
                </text>
              </g>
            );
          })}

          {/* Technology bubbles on the curve */}
          {PHASE_ZONES.map((z) => {
            const techs = phaseGroups.get(z.phase) ?? [];
            return techs.map((tech, i) => {
              const { x, y } = getTechPosition(tech, i, techs.length);
              const bubbleY = y - 28;
              const tickers = tech.firmIds
                .map((id) => firmMap.get(id)?.ticker)
                .filter(Boolean)
                .slice(0, 3);
              return (
                <g key={tech.id}>
                  {/* Connector */}
                  <line x1={x} y1={bubbleY + 12} x2={x} y2={y - 4} stroke={z.color} strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
                  {/* Dot on curve */}
                  <circle cx={x} cy={y} r="3.5" fill={z.color} stroke="white" strokeWidth="1.5" />
                  {/* Tech name */}
                  <text x={x} y={bubbleY} textAnchor="middle" fill="#374151" fontSize="8" fontWeight="800" style={FONT}>
                    {isKo ? tech.nameKo : tech.name}
                  </text>
                  {/* Ticker chips */}
                  <text x={x} y={bubbleY + 11} textAnchor="middle" fill={z.color} fontSize="7" fontWeight="700" style={FONT}>
                    {tickers.join(" · ")}
                  </text>
                </g>
              );
            });
          })}

          {/* Legend */}
          <g>
            <line x1={620} y1={12} x2={640} y2={12} stroke="#ef4444" strokeWidth="2.5" />
            <text x={644} y={15} fill="#9ca3af" fontSize="8" fontWeight="600" style={FONT}>하입사이클</text>
            <line x1={700} y1={12} x2={720} y2={12} stroke="#9ca3af" strokeWidth="2" strokeDasharray="6,4" opacity="0.5" />
            <text x={724} y={15} fill="#9ca3af" fontSize="8" fontWeight="600" style={FONT}>TALC</text>
          </g>
        </svg>
      </div>

      {/* ── Phase detail cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {PHASE_ZONES.filter((z) => z.phase !== "Plateau of Productivity").map((z) => {
          const techs = phaseGroups.get(z.phase) ?? [];
          return (
            <div key={z.phase} className={`rounded-2xl p-4 ${z.bgColor} ring-1 ring-gray-200 flex flex-col`}>
              {/* Phase header */}
              <div className="mb-2">
                <span className="text-xs font-extrabold" style={{ color: z.color }}>
                  {isKo ? z.labelKo : z.labelEn}
                </span>
                <span className={`block text-[10px] font-bold mt-0.5 ${z.signalColor}`}>{z.signal}</span>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed mb-3">{z.descKo}</p>

              {/* Technology cards */}
              <div className="space-y-2 flex-1">
                {techs.map((tech) => {
                  const techFirms = tech.firmIds
                    .map((id) => {
                      const firm = firmMap.get(id);
                      const cls = classifications.get(id);
                      return firm && cls ? { firm, cls } : null;
                    })
                    .filter(Boolean) as { firm: Firm; cls: ClassificationResult }[];

                  return (
                    <div key={tech.id} className="rounded-xl bg-white/80 p-2.5">
                      <div className="text-[11px] font-extrabold text-gray-900 mb-1">
                        {isKo ? tech.nameKo : tech.name}
                      </div>
                      <p className="text-[9px] text-gray-400 leading-relaxed mb-1.5 line-clamp-2">
                        {isKo ? tech.descriptionKo : tech.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {techFirms.map(({ firm, cls }) => {
                          const isBuy = cls.tier === "Gorilla" || cls.tier === "Potential Gorilla";
                          return (
                            <Link key={firm.id} href={`/firms/${firm.slug}`}>
                              <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors ${
                                isBuy
                                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}>
                                {firm.ticker}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                {techs.length === 0 && (
                  <div className="text-center text-[10px] text-gray-300 py-2">—</div>
                )}
              </div>
            </div>
          );
        })}

        {/* Plateau → TALC transition card */}
        <div className="rounded-2xl p-4 bg-blue-50/50 ring-1 ring-blue-200 flex flex-col">
          <div className="mb-2">
            <span className="text-xs font-extrabold text-blue-600">
              {isKo ? "생산성 안정기" : "Plateau of Productivity"}
            </span>
            <span className="block text-[10px] font-bold mt-0.5 text-blue-600">→ TALC 전환</span>
          </div>
          <p className="text-[10px] text-gray-400 leading-relaxed mb-3">
            {PHASE_ZONES[4].descKo}
          </p>
          <div className="rounded-xl bg-white/80 p-2.5 flex-1 flex flex-col justify-center">
            <div className="text-center">
              <span className="text-2xl">🌪️</span>
              <p className="text-[10px] font-bold text-blue-600 mt-1">
                하입사이클 졸업 →<br />TALC 볼링앨리/토네이도 진입
              </p>
              <p className="text-[9px] text-gray-400 mt-1">
                이 단계의 기업은 위 TALC<br />곡선에서 추적됩니다
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Combined model explainer ── */}
      <div className="toss-card !bg-gray-50/80">
        <div className="text-center">
          <h3 className="font-extrabold text-sm text-gray-900 mb-1">하입사이클 × TALC 통합 모델</h3>
          <p className="text-xs text-gray-400 max-w-xl mx-auto leading-relaxed">
            캐즘 이전(초기시장)에서는 <span className="font-bold text-red-500">가트너 하입사이클</span>이 투자 타이밍을 결정합니다.
            기술이 캐즘을 넘으면 <span className="font-bold text-emerald-600">TALC 토네이도</span>에서 고릴라가 결정됩니다.
            두 모델은 시간축 위에서 자연스럽게 연결됩니다.
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 mt-3 text-xs font-bold flex-wrap">
          <span className="px-2.5 py-1 rounded-lg bg-red-100 text-red-600">🔥 과열 → 단기 수익</span>
          <span className="text-gray-300">→</span>
          <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-700">💎 환멸 → 장기 매수</span>
          <span className="text-gray-300">→</span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-700">📈 계몽 → 캐즘 대기</span>
          <span className="text-gray-300">→</span>
          <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-600">🌪️ TALC 토네이도</span>
        </div>
      </div>
    </section>
  );
}
