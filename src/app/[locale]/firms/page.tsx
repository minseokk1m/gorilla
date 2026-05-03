// ISR: 30분 캐시 (Yahoo 호출 비용 분산)
export const revalidate = 1800;

import { getAllFirms, getAllClassifications } from "@/lib/data/providers/firm-provider";
import { getAllPriceHistories } from "@/lib/data/providers/price-provider";
import { detectAllFunnelPositions } from "@/lib/data/providers/funnel-engine";
import FirmsTable from "@/components/firms/FirmsTable";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import type { FunnelStage } from "@/types/funnel";

const FUNNEL_RANK: Record<FunnelStage, number> = {
  Candidate: 0, Potential: 1, Confirmed: 2, Hold: 3,
};

const FUNNEL_LABELS_KO: Record<FunnelStage, string> = {
  Candidate: "후보", Potential: "잠재", Confirmed: "가격 검증", Hold: "장기 보유",
};

const FUNNEL_LABELS_EN: Record<FunnelStage, string> = {
  Candidate: "Candidate", Potential: "Potential", Confirmed: "Confirmed", Hold: "Hold",
};

function isFunnelStage(s: string | undefined): s is FunnelStage {
  return s === "Candidate" || s === "Potential" || s === "Confirmed" || s === "Hold";
}

export default async function FirmsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ funnel?: string }>;
}) {
  const { locale } = await params;
  const { funnel: funnelParam } = await searchParams;
  const t = await getTranslations({ locale, namespace: "firms" });

  const funnelFilter = isFunnelStage(funnelParam) ? funnelParam : null;

  const [allFirms, classifications, prices, funnelPositions] = await Promise.all([
    getAllFirms(),
    getAllClassifications(locale),
    getAllPriceHistories(),
    funnelFilter ? detectAllFunnelPositions() : Promise.resolve(null),
  ]);
  const priceMap = new Map(prices.map((p) => [p.firmId, p]));

  // Funnel 누적 필터: 'Potential' = Potential·Confirmed·Hold 모두 포함 (78 firms)
  const minRank = funnelFilter ? FUNNEL_RANK[funnelFilter] : -1;
  const filteredFirms = funnelFilter && funnelPositions
    ? allFirms.filter((f) => {
        const pos = funnelPositions.get(f.id);
        return pos ? FUNNEL_RANK[pos.stage] >= minRank : false;
      })
    : allFirms;

  const rows = filteredFirms
    .map((f) => {
      const cls = classifications.get(f.id)!;
      const price = priceMap.get(f.id);
      return {
        id: f.id,
        slug: f.slug,
        ticker: f.ticker,
        name: f.name,
        sector: f.sector,
        marketCapUSD: f.marketCapUSD,
        revenueGrowthYoY: f.revenueGrowthYoY,
        tier: cls.tier,
        signal: cls.signal,
        totalScore: cls.totalScore,
        currentPrice: price?.currentPrice,
        priceChange1D: price?.priceChange1D,
        classifiedAt: cls.classifiedAt,
      };
    })
    .sort((a, b) => b.totalScore - a.totalScore);

  const funnelLabel = funnelFilter
    ? (locale === "ko" ? FUNNEL_LABELS_KO[funnelFilter] : FUNNEL_LABELS_EN[funnelFilter])
    : null;

  // Data timestamp
  const classifiedAt = rows[0]?.classifiedAt;
  const dataDate = classifiedAt
    ? new Date(classifiedAt).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="mb-2">{t("title")}</h1>
        <p className="text-gray-500 text-[0.9375rem]">{t("subtitle")}</p>
        {dataDate && (
          <p className="text-xs text-gray-400 font-medium mt-2">
            🕐 {t("dataAsOf", { date: dataDate })}
          </p>
        )}
        {funnelFilter && funnelLabel && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-blue-50 ring-1 ring-blue-200 px-3 py-2">
            <span className="text-xs font-extrabold text-blue-700 uppercase tracking-wider">
              🔭 투자 깔때기 필터
            </span>
            <span className="text-sm font-extrabold text-blue-800">
              {funnelLabel} 단계 이상
            </span>
            <span className="text-xs font-bold text-blue-600">({rows.length}개)</span>
            <Link
              href="/firms"
              className="ml-2 text-xs font-bold text-gray-500 hover:text-gray-900 underline"
            >
              필터 해제 ✕
            </Link>
          </div>
        )}
      </div>

      {/* ── Scoring explainer ── */}
      <div className="toss-card !bg-gray-900 !text-white mb-5">
        <p className="text-[0.9375rem] leading-relaxed font-bold">{t("scoringThesis")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* Dimensions summary */}
        <div className="toss-card">
          <div className="font-bold text-gray-900 text-sm mb-3">{t("dimensionsTitle")}</div>
          <div className="space-y-2">
            {[
              { key: "architectureControl", weight: 22, emoji: "🏗️" },
              { key: "switchingCosts", weight: 20, emoji: "🔒" },
              { key: "marketShare", weight: 18, emoji: "📊" },
              { key: "networkEffects", weight: 15, emoji: "🌐" },
              { key: "ecosystemControl", weight: 13, emoji: "🤝" },
              { key: "revenueGrowth", weight: 6, emoji: "📈" },
              { key: "marketConcentration", weight: 6, emoji: "🎯" },
            ].map((d) => (
              <div key={d.key} className="flex items-center gap-2">
                <span className="text-sm">{d.emoji}</span>
                <span className="text-xs font-bold text-gray-700 flex-1">{t(`dim.${d.key}`)}</span>
                <div className="w-20 bg-gray-100 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-[#0064FF]" style={{ width: `${(d.weight / 22) * 100}%` }} />
                </div>
                <span className="text-xs font-extrabold text-gray-400 w-8 text-right">{d.weight}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tier thresholds — dual track */}
        <div className="toss-card">
          <div className="font-bold text-gray-900 text-sm mb-3">{t("thresholdsTitle")}</div>

          {/* Common top: Gorilla only */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">🦍</span>
              <span className="toss-pill text-[10px] !py-0.5 bg-emerald-100 text-emerald-700">≥ 75</span>
              <span className="text-xs font-bold text-gray-700 flex-1">{t("thGorilla")}</span>
            </div>
          </div>

          {/* Dual track split */}
          <div className="grid grid-cols-2 gap-3">
            {/* Proprietary architecture track */}
            <div className="rounded-xl bg-amber-50/60 p-3">
              <div className="text-[10px] font-extrabold text-amber-700 uppercase tracking-wide mb-2">{t("trackProprietary")}</div>
              <div className="space-y-2">
                {[
                  { emoji: "🦍", key: "thPotential", score: "≥ 60", color: "bg-teal-100 text-teal-700" },
                  { emoji: "🐵", key: "thChimp", score: "≥ 35", color: "bg-yellow-100 text-yellow-700" },
                  { emoji: "🐒", key: "thMonkey", score: "≥ 20", color: "bg-orange-100 text-orange-700" },
                ].map((tier) => (
                  <div key={tier.key} className="flex items-center gap-2">
                    <span className="text-sm">{tier.emoji}</span>
                    <span className={`toss-pill text-[10px] !py-0.5 ${tier.color}`}>{tier.score}</span>
                    <span className="text-[11px] font-bold text-gray-700 flex-1">{t(tier.key)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Open market track */}
            <div className="rounded-xl bg-indigo-50/60 p-3">
              <div className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wide mb-2">{t("trackOpen")}</div>
              <div className="space-y-2">
                {[
                  { emoji: "👑", key: "thKingOpen", score: "≥ 50", color: "bg-blue-100 text-[#0064FF]" },
                  { emoji: "🤴", key: "thPrince", score: "≥ 35", color: "bg-indigo-100 text-indigo-600" },
                  { emoji: "⛏️", key: "thSerf", score: "≥ 20", color: "bg-stone-100 text-stone-600" },
                ].map((tier) => (
                  <div key={tier.key} className="flex items-center gap-2">
                    <span className="text-sm">{tier.emoji}</span>
                    <span className={`toss-pill text-[10px] !py-0.5 ${tier.color}`}>{tier.score}</span>
                    <span className="text-[11px] font-bold text-gray-700 flex-1">{t(tier.key)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom: In Chasm */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm">🕳️</span>
            <span className="toss-pill text-[10px] !py-0.5 bg-red-100 text-red-600">{"< 20"}</span>
            <span className="text-xs font-bold text-gray-700 flex-1">{t("thChasm")}</span>
          </div>

          <p className="text-xs text-gray-400 mt-3 leading-relaxed">{t("thresholdsNote")}</p>
        </div>
      </div>

      <FirmsTable rows={rows} />
    </main>
  );
}
