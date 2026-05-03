// ISR: 30분 캐시 (firm 기본정보·classification만 사용 — yahoo 호출 없음)
export const revalidate = 1800;

import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getAllFirms, getAllClassifications } from "@/lib/data/providers/firm-provider";
import { getSubstitutionPaths } from "@/lib/data/providers/product-category-provider";
import { ECOSYSTEMS } from "@/lib/data/mock/ecosystems";
import { PHASE_BADGE, phaseLabel, ROLE_BADGE, roleLabel } from "@/components/ecosystems/category-style";
import type { ClassificationResult } from "@/types/classification";
import type { ProductCategory, FirmCategoryParticipation } from "@/types/product-category";
import type { Firm } from "@/types/firm";

const TIER_EMOJI: Record<ClassificationResult["tier"], string> = {
  "Gorilla": "🦍",
  "Potential Gorilla": "🦍",
  "King": "👑",
  "Prince": "🤴",
  "Chimpanzee": "🐵",
  "Monkey": "🐒",
  "Serf": "⛏️",
  "In Chasm": "🕳️",
};

function ecosystemLabel(ecoId: string, locale: string): string {
  const eco = ECOSYSTEMS.find((e) => e.id === ecoId);
  if (!eco) return ecoId;
  return locale === "ko" ? eco.nameKo : eco.name;
}

function fmtWeight(w?: number): string {
  if (w === undefined) return "—";
  return `${Math.round(w * 100)}%`;
}

function CategoryHeadline({
  cat,
  locale,
  alignRight = false,
}: {
  cat: ProductCategory;
  locale: string;
  alignRight?: boolean;
}) {
  const phase = PHASE_BADGE[cat.phase];
  return (
    <Link
      href={`/ecosystems/${cat.ecosystemId}#layer-${cat.layerId}`}
      className={`min-w-0 group block ${alignRight ? "text-right" : ""}`}
    >
      <span className={`text-[0.625rem] font-extrabold px-1.5 py-0.5 rounded ${phase.bg} ${phase.text}`}>
        {phase.emoji} {phaseLabel(cat.phase, locale)}
      </span>
      <div className="text-sm font-extrabold text-gray-900 mt-1 truncate group-hover:underline">
        {locale === "ko" ? cat.nameKo : cat.name}
      </div>
      <div className="text-[0.6875rem] font-bold text-gray-400 truncate">
        {ecosystemLabel(cat.ecosystemId, locale)} · {cat.layerId}
      </div>
    </Link>
  );
}

function FirmRow({
  participation,
  firm,
  classification,
  tone,
  locale,
}: {
  participation?: FirmCategoryParticipation;
  firm: Firm;
  classification?: ClassificationResult;
  tone: "risk" | "positioned" | "successor";
  locale: string;
}) {
  const toneClass =
    tone === "risk"
      ? "bg-rose-50 ring-rose-100 hover:bg-rose-100"
      : tone === "positioned"
      ? "bg-emerald-50 ring-emerald-100 hover:bg-emerald-100"
      : "bg-blue-50 ring-blue-100 hover:bg-blue-100";

  return (
    <Link
      href={`/firms/${firm.slug}`}
      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ring-1 transition-colors ${toneClass}`}
    >
      <span className="text-sm shrink-0">
        {classification ? TIER_EMOJI[classification.tier] : "·"}
      </span>
      <span className="text-[0.8125rem] font-extrabold text-gray-900 truncate flex-1">
        {firm.name}
      </span>
      {participation && (
        <span
          className={`text-[0.625rem] font-extrabold px-1.5 py-0.5 rounded ${ROLE_BADGE[participation.role].bg} ${ROLE_BADGE[participation.role].text}`}
        >
          {roleLabel(participation.role, locale)}
        </span>
      )}
      {participation?.revenueWeight !== undefined && (
        <span className="text-[0.6875rem] font-bold text-gray-500 tabular-nums shrink-0">
          {fmtWeight(participation.revenueWeight)}
        </span>
      )}
    </Link>
  );
}

export default async function SubstitutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tEco = await getTranslations({ locale, namespace: "ecosystems" });

  const [firms, classifications] = await Promise.all([
    getAllFirms(),
    getAllClassifications(locale),
  ]);
  const firmById = new Map(firms.map((f) => [f.id, f]));
  const paths = getSubstitutionPaths();

  const totals = paths.reduce(
    (acc, p) => {
      acc.atRisk += p.atRiskFirmIds.length;
      acc.positioned += p.positionedFirmIds.length;
      acc.successor += p.pureSuccessorFirmIds.length;
      return acc;
    },
    { atRisk: 0, positioned: 0, successor: 0 },
  );

  return (
    <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <Link href="/" className="text-xs font-bold text-gray-400 hover:text-gray-700">
          ← {locale === "ko" ? "대시보드" : "Dashboard"}
        </Link>
        <h1 className="mt-2 mb-2">{tEco("substitutionTitle")}</h1>
        <p className="text-gray-500 text-[0.9375rem] leading-relaxed">{tEco("substitutionHint")}</p>
      </div>

      {/* Thesis box — why substitution matters in 고릴라 게임 */}
      <div className="toss-card !bg-gray-900 !text-white mb-5">
        <p className="text-[0.9375rem] leading-relaxed font-bold">
          {locale === "ko"
            ? "고릴라 게임의 매도 룰은 단 하나 — 'proven substitution threat'이 등장했을 때. 즉, 후계 카테고리(successor)가 실제로 토네이도에 진입했고, 기존 고릴라가 거기에 자리 잡지 못했을 때만 매도. 이 페이지는 그 substitution 길목을 한눈에 본다."
            : "The Gorilla Game's only sell rule is when a 'proven substitution threat' arrives — i.e. the successor category has entered tornado AND the incumbent gorilla failed to establish position there. This page shows those substitution paths at a glance."}
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="toss-card !p-3">
          <div className="text-[0.625rem] font-extrabold uppercase tracking-wider text-gray-400 mb-1">
            {locale === "ko" ? "전체 path" : "Total paths"}
          </div>
          <div className="text-2xl font-extrabold text-gray-900">{paths.length}</div>
        </div>
        <div className="toss-card !p-3">
          <div className="text-[0.625rem] font-extrabold uppercase tracking-wider text-rose-600 mb-1">
            ⚠ {locale === "ko" ? "Risk firm" : "At-risk firms"}
          </div>
          <div className="text-2xl font-extrabold text-rose-700">{totals.atRisk}</div>
        </div>
        <div className="toss-card !p-3">
          <div className="text-[0.625rem] font-extrabold uppercase tracking-wider text-emerald-700 mb-1">
            ✓ {locale === "ko" ? "잘 자리 잡은 firm" : "Positioned firms"}
          </div>
          <div className="text-2xl font-extrabold text-emerald-700">{totals.positioned}</div>
        </div>
        <div className="toss-card !p-3">
          <div className="text-[0.625rem] font-extrabold uppercase tracking-wider text-blue-700 mb-1">
            🆕 {locale === "ko" ? "신규 강자" : "Pure successors"}
          </div>
          <div className="text-2xl font-extrabold text-blue-700">{totals.successor}</div>
        </div>
      </div>

      {/* Path cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {paths.map((p, i) => (
          <section
            key={`${p.from.id}-${p.to.id}`}
            className="toss-card !p-0 overflow-hidden"
          >
            {/* Path index header */}
            <div className="px-4 pt-4 pb-3 border-b border-gray-100">
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-[0.625rem] font-extrabold uppercase tracking-wider text-gray-400">
                  Path {i + 1} / {paths.length}
                </span>
                <span className="text-[0.625rem] font-bold text-gray-400">
                  {ecosystemLabel(p.from.ecosystemId, locale)}
                </span>
              </div>
              <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-3">
                <CategoryHeadline cat={p.from} locale={locale} />
                <span className="text-gray-400 text-xl font-bold mt-4">→</span>
                <CategoryHeadline cat={p.to} locale={locale} alignRight />
              </div>
            </div>

            {/* Phase rationale */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 space-y-2">
              {p.from.phaseRationale && (
                <div>
                  <span className="text-[0.625rem] font-extrabold uppercase tracking-wider text-gray-500">
                    {locale === "ko" ? "쇠퇴 카테고리 근거" : "Why declining"}
                  </span>
                  <p className="text-[0.75rem] text-gray-700 leading-relaxed mt-0.5">
                    {p.from.phaseRationale}
                  </p>
                </div>
              )}
              {p.to.phaseRationale && (
                <div>
                  <span className="text-[0.625rem] font-extrabold uppercase tracking-wider text-emerald-700">
                    {locale === "ko" ? "후계 카테고리 근거" : "Why successor"}
                  </span>
                  <p className="text-[0.75rem] text-gray-700 leading-relaxed mt-0.5">
                    {p.to.phaseRationale}
                  </p>
                </div>
              )}
            </div>

            {/* Firm groups */}
            <div className="px-4 py-3 space-y-3">
              {p.atRiskFirmIds.length > 0 && (
                <div>
                  <div className="text-[0.6875rem] font-extrabold uppercase tracking-wider text-rose-700 mb-1.5">
                    ⚠ {tEco("subAtRisk")} · {p.atRiskFirmIds.length}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {p.atRiskFirmIds.map((id) => {
                      const f = firmById.get(id);
                      if (!f) return null;
                      const part = p.from.participants.find((x) => x.firmId === id);
                      return (
                        <FirmRow
                          key={id}
                          firm={f}
                          participation={part}
                          classification={classifications.get(id)}
                          tone="risk"
                          locale={locale}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {p.positionedFirmIds.length > 0 && (
                <div>
                  <div className="text-[0.6875rem] font-extrabold uppercase tracking-wider text-emerald-700 mb-1.5">
                    ✓ {tEco("subPositioned")} · {p.positionedFirmIds.length}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {p.positionedFirmIds.map((id) => {
                      const f = firmById.get(id);
                      if (!f) return null;
                      // 잘 자리 잡음 = both에 참여 → "to" 카테고리 비중 보여주는 게 더 의미 있음
                      const part = p.to.participants.find((x) => x.firmId === id);
                      return (
                        <FirmRow
                          key={id}
                          firm={f}
                          participation={part}
                          classification={classifications.get(id)}
                          tone="positioned"
                          locale={locale}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {p.pureSuccessorFirmIds.length > 0 && (
                <div>
                  <div className="text-[0.6875rem] font-extrabold uppercase tracking-wider text-blue-700 mb-1.5">
                    🆕 {tEco("subPureSuccessor")} · {p.pureSuccessorFirmIds.length}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {p.pureSuccessorFirmIds.map((id) => {
                      const f = firmById.get(id);
                      if (!f) return null;
                      const part = p.to.participants.find((x) => x.firmId === id);
                      return (
                        <FirmRow
                          key={id}
                          firm={f}
                          participation={part}
                          classification={classifications.get(id)}
                          tone="successor"
                          locale={locale}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {p.atRiskFirmIds.length === 0 &&
                p.positionedFirmIds.length === 0 &&
                p.pureSuccessorFirmIds.length === 0 && (
                  <p className="text-xs text-gray-400 italic">
                    {locale === "ko"
                      ? "이 path에 분류된 firm 없음"
                      : "No firms tracked on this path"}
                  </p>
                )}
            </div>
          </section>
        ))}
      </div>

      {/* Footer note — Moore 매도 룰 reference */}
      <p className="text-xs text-gray-400 mt-8 leading-relaxed">
        {locale === "ko"
          ? "* 'Risk' = 쇠퇴 카테고리에서 매출 비중 30% 이상이면서 후계 카테고리에 참여하지 않는 firm. '잘 자리 잡음' = 두 카테고리 모두 참여. '신규 강자' = 후계 카테고리에만 참여하는 신규/특화 사업자."
          : "* 'Risk' = revenue weight ≥30% in declining category AND not participating in successor. 'Positioned' = participating in both. 'Pure successor' = participating only in successor."}
      </p>
    </main>
  );
}
