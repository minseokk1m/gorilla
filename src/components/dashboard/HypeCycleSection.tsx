import type { Firm } from "@/types/firm";
import type { ClassificationResult } from "@/types/classification";
import { Link } from "@/i18n/routing";
import { HYPE_TECHNOLOGIES } from "@/lib/data/mock/hype-technologies";

interface Props {
  locale: string;
  firms: Firm[];
  classifications: Map<string, ClassificationResult>;
}

export default function HypeCycleSection({ locale, firms, classifications }: Props) {
  const isKo = locale === "ko";
  const firmMap = new Map(firms.map((f) => [f.id, f]));

  const rising = HYPE_TECHNOLOGIES.filter((t) => t.peakStatus === "rising");
  const falling = HYPE_TECHNOLOGIES.filter((t) => t.peakStatus === "falling");

  function renderTechCard(tech: typeof HYPE_TECHNOLOGIES[0], isRising: boolean) {
    const techFirms = tech.firmIds
      .map((id) => {
        const firm = firmMap.get(id);
        const cls = classifications.get(id);
        return firm && cls ? { firm, cls } : null;
      })
      .filter(Boolean) as { firm: Firm; cls: ClassificationResult }[];

    return (
      <div key={tech.id} className="rounded-xl bg-white/80 p-3">
        <div className="text-[11px] font-extrabold text-gray-900 mb-1">
          {isKo ? tech.nameKo : tech.name}
        </div>
        <p className="text-[9px] text-gray-400 leading-relaxed mb-2 line-clamp-2">
          {isKo ? tech.descriptionKo : tech.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {techFirms.map(({ firm, cls }) => {
            const isBuy = cls.tier === "Gorilla" || cls.tier === "Potential Gorilla";
            return (
              <Link key={firm.id} href={`/firms/${firm.slug}`}>
                <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors ${
                  isRising
                    ? isBuy
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                      : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}>
                  {firm.ticker}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="mb-0">하입사이클 과열 감지</h2>
          <span className="toss-pill bg-red-100 text-red-600 text-[9px]">Peak of Inflated Expectations</span>
        </div>
        <p className="text-sm text-gray-400 font-medium">
          과열 오르막에 진입한 기술은 단기 매수 기회, 꺾이기 시작한 기술은 매도/회피 신호입니다.
        </p>
      </div>

      {/* ── Two-column: Rising vs Falling ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Rising — BUY */}
        <div className="rounded-2xl p-5 bg-gradient-to-br from-orange-50 via-amber-50/80 to-yellow-50/60 ring-2 ring-orange-300 shadow-lg shadow-orange-100/50 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 text-[80px] opacity-[0.04] leading-none select-none pointer-events-none">
            🔥
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <div>
                <h3 className="font-extrabold text-base text-orange-700 mb-0">과열 오르막</h3>
                <span className="text-[10px] font-bold text-orange-500">하입 진입 — 단기 매수 기회</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-extrabold text-orange-700">{rising.length}</div>
              <span className="inline-flex px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-orange-500 text-white">
                RIDE
              </span>
            </div>
          </div>
          <p className="text-xs text-orange-700/60 leading-relaxed mb-4">
            과대 기대의 정점으로 올라가는 중. 미디어 과열 + 투기 자금이 유입되며 가격 상승. 하입을 타고 수익을 먹되, 꺾이는 순간 빠져야 한다.
          </p>
          <div className="space-y-2">
            {rising.map((tech) => renderTechCard(tech, true))}
          </div>
        </div>

        {/* Falling — SELL/AVOID */}
        <div className="rounded-2xl p-5 bg-gradient-to-br from-gray-50 via-gray-50/80 to-slate-50/60 ring-1 ring-gray-300 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 text-[80px] opacity-[0.04] leading-none select-none pointer-events-none">
            📉
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📉</span>
              <div>
                <h3 className="font-extrabold text-base text-gray-700 mb-0">과열 꺾임</h3>
                <span className="text-[10px] font-bold text-gray-400">하입 이탈 — 매도/회피 신호</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-extrabold text-gray-500">{falling.length}</div>
              <span className="inline-flex px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-gray-400 text-white">
                EXIT
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed mb-4">
            과대 기대의 정점을 지나 하락 중. 거품이 빠지며 가격 급락. 구조적 장벽이 해소되지 않으면 환멸의 골짜기로 추락.
          </p>
          <div className="space-y-2">
            {falling.map((tech) => renderTechCard(tech, false))}
          </div>
        </div>
      </div>
    </section>
  );
}
