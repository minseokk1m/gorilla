// ISR: 30분 캐시 (Yahoo + Supabase 호출 비용 분산)
export const revalidate = 1800;

import { notFound } from "next/navigation";
import { MOCK_FIRMS } from "@/lib/data/mock/firms";
import { getAllFirms, getClassification } from "@/lib/data/providers/firm-provider";
import ClassificationBadge from "@/components/firms/ClassificationBadge";
import FirmSources from "@/components/firms/FirmSources";
import SignalBadge from "@/components/firms/SignalBadge";
import { formatMarketCap, formatPercent, formatDate } from "@/lib/utils/formatters";
import ScoreRadar from "@/components/firm-detail/ScoreRadar";
import RevenueBreakdown from "@/components/firm-detail/RevenueBreakdown";
import FirmDiscussion from "@/components/firm-detail/FirmDiscussion";
import LiveDataSection from "@/components/firm-detail/LiveDataSection";
import { REVENUE_SEGMENTS } from "@/lib/data/mock/revenue-segments";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { DIMENSION_META, DIMENSION_KEYWORDS } from "@/lib/utils/news-impact";
import {
  getFirmEcosystems,
  getLayerMemberships,
} from "@/lib/data/providers/ecosystem-provider";
import { findEcosystem } from "@/lib/data/mock/ecosystems";
import { getCachedLayerMomentum } from "@/lib/data/providers/layer-momentum";
import { getPriceHistory } from "@/lib/data/providers/price-provider";
import { getFirmCategories } from "@/lib/data/providers/product-category-provider";
import { PHASE_BADGE, ROLE_BADGE, phaseLabel, roleLabel } from "@/components/ecosystems/category-style";
import { getSellSignalsForFirm } from "@/lib/data/providers/sell-signal-engine";
import { getFunnelPositionForFirm } from "@/lib/data/providers/funnel-engine";
import { getSentimentProfileForFirm } from "@/lib/data/providers/sentiment-driven-engine";
import type { SellSignalSeverity } from "@/types/sell-signal";
import type { FunnelStage } from "@/types/funnel";
import type { SentimentLevel } from "@/types/sentiment-driven";
import type { EcosystemId } from "@/types/ecosystem";

const SENTIMENT_LEVEL_STYLE: Record<SentimentLevel, { bg: string; text: string }> = {
  "Low":       { bg: "bg-gray-100",    text: "text-gray-700" },
  "Moderate":  { bg: "bg-indigo-100",  text: "text-indigo-700" },
  "High":      { bg: "bg-indigo-500",  text: "text-white" },
  "Very High": { bg: "bg-rose-500",    text: "text-white" },
};

const FUNNEL_STAGE_STYLE: Record<FunnelStage, { bg: string; text: string; idx: number }> = {
  "Candidate": { bg: "bg-gray-100",     text: "text-gray-700",    idx: 1 },
  "Potential": { bg: "bg-blue-100",     text: "text-blue-800",    idx: 2 },
  "Confirmed": { bg: "bg-emerald-100",  text: "text-emerald-800", idx: 3 },
  "Hold":      { bg: "bg-emerald-500",  text: "text-white",       idx: 4 },
};

const SEVERITY_STYLE: Record<SellSignalSeverity, { bg: string; text: string; border: string; emoji: string }> = {
  "EXIT":      { bg: "bg-rose-50",   text: "text-rose-700",   border: "border-rose-200",   emoji: "🚪" },
  "REBALANCE": { bg: "bg-amber-50",  text: "text-amber-800",  border: "border-amber-200",  emoji: "♻️" },
  "WARN":      { bg: "bg-yellow-50", text: "text-yellow-800", border: "border-yellow-200", emoji: "⚠️" },
};

const ECO_BAR: Record<EcosystemId, string> = {
  "ai": "bg-blue-500",
  "cybersecurity": "bg-rose-500",
  "energy-transition": "bg-emerald-500",
  "defense": "bg-slate-600",
  "korean-industrial": "bg-orange-500",
  "crypto": "bg-violet-500",
  "biotech": "bg-teal-500",
  "auto-ev-battery": "bg-yellow-500",
  "space": "bg-indigo-600",
};

export async function generateStaticParams() {
  return MOCK_FIRMS.flatMap((f) =>
    ["en", "ko"].map((locale) => ({ locale, slug: f.slug }))
  );
}

export default async function FirmDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const allFirms = await getAllFirms();
  const firm = allFirms.find((f) => f.slug === slug);
  if (!firm) notFound();

  const t = await getTranslations({ locale, namespace: "firmDetail" });
  const tPhases = await getTranslations({ locale, namespace: "marketPhases" });

  const classification = await getClassification(firm.id, locale);
  if (!classification) notFound();

  const competitorFirms = allFirms.filter((f) => firm.competitors.includes(f.slug));
  const revenueSegs = REVENUE_SEGMENTS[firm.id];

  const tEco = await getTranslations({ locale, namespace: "ecosystems" });
  const memberships = getFirmEcosystems(firm.id);
  const primaryMem = memberships.find((m) => m.role === "primary");
  const secondaryMems = memberships.filter((m) => m.role === "secondary");
  const primaryEco = primaryMem ? findEcosystem(primaryMem.ecosystemId) : null;
  const primaryLayer = primaryEco?.layers.find((l) => l.id === primaryMem!.layerId) ?? null;
  const layerPeers = primaryMem
    ? getLayerMemberships(primaryMem.ecosystemId, primaryMem.layerId)
        .filter((m) => m.firmId !== firm.id)
        .map((m) => allFirms.find((f) => f.id === m.firmId))
        .filter((f): f is NonNullable<typeof f> => Boolean(f))
        .slice(0, 8)
    : [];

  // Layer momentum + this firm's own 1M price change for comparison
  const [layerMomentum, ownPriceHistory] = primaryMem
    ? await Promise.all([
        getCachedLayerMomentum(primaryMem.ecosystemId, primaryMem.layerId),
        getPriceHistory(firm.id),
      ])
    : [null, null];

  // Product category participation (across all categories)
  const firmCategoryEntries = getFirmCategories(firm.id);

  // Sell / rebalance signals
  const sellSignals = await getSellSignalsForFirm(firm.id);

  // Investment Funnel position
  const funnelPosition = await getFunnelPositionForFirm(firm.id);

  // Sentiment-driven profile
  const sentimentProfile = await getSentimentProfileForFirm(firm.id);

  return (
    <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
        <Link href="/" className="hover:text-gray-900 transition-colors">{t("breadcrumbDashboard")}</Link>
        <span>/</span>
        <Link href="/firms" className="hover:text-gray-900 transition-colors">{t("breadcrumbFirms")}</Link>
        <span>/</span>
        <span className="text-gray-900 font-bold">{firm.ticker}</span>
      </div>

      {/* Header */}
      <div className="toss-card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="!text-[2rem]">{firm.ticker}</h1>
              <ClassificationBadge tier={classification.tier} size="lg" />
              <SignalBadge signal={classification.signal} size="lg" />
            </div>
            <div className="flex items-center gap-3">
              <p className="text-gray-500 font-medium">{firm.name} · {firm.sector}</p>
              <a href="#discussion" className="text-xs font-bold text-[#0064FF] bg-[#E8F0FE] px-3 py-1.5 rounded-lg hover:bg-[#0064FF] hover:text-white transition-colors">
                토론하기
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-[#F4F4F4] rounded-2xl p-4">
              <div className="text-2xl font-extrabold text-gray-900">{classification.totalScore}</div>
              <div className="text-xs font-bold text-gray-400 mt-0.5">{t("totalScore")}</div>
            </div>
            <div className="bg-[#F4F4F4] rounded-2xl p-4">
              <div className="text-2xl font-extrabold text-gray-900">{formatMarketCap(firm.marketCapUSD)}</div>
              <div className="text-xs font-bold text-gray-400 mt-0.5">{t("marketCap")}</div>
            </div>
            <div className="bg-[#F4F4F4] rounded-2xl p-4">
              <div className={`text-2xl font-extrabold ${firm.revenueGrowthYoY >= 0.2 ? "text-emerald-600" : "text-gray-900"}`}>
                {formatPercent(firm.revenueGrowthYoY, true)}
              </div>
              <div className="text-xs font-bold text-gray-400 mt-0.5">{t("revGrowth")}</div>
            </div>
            <div className="bg-[#F4F4F4] rounded-2xl p-4">
              <div className="text-lg font-extrabold text-gray-900">{tPhases(classification.marketPhase)}</div>
              <div className="text-xs font-bold text-gray-400 mt-0.5">{t("talcPhase")}</div>
            </div>
          </div>
        </div>

        <FirmSources ticker={firm.ticker} yahooTicker={firm.yahooTicker} name={firm.name} />
      </div>

      {/* Sentiment-driven profile */}
      {sentimentProfile && (
        <section className="toss-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[0.6875rem] font-extrabold text-gray-500 uppercase tracking-wider">
              {tEco("firmSentimentPanelTitle")}
            </span>
            <span className={`text-[0.625rem] font-extrabold px-2 py-0.5 rounded ${SENTIMENT_LEVEL_STYLE[sentimentProfile.level].bg} ${SENTIMENT_LEVEL_STYLE[sentimentProfile.level].text}`}>
              {sentimentProfile.score}/100 · {sentimentProfile.level}
            </span>
          </div>
          <p className="text-xs text-gray-500 leading-snug mb-3">
            {tEco("firmSentimentPanelHint")}
          </p>

          {/* 4 factor mini bars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            {([
              { key: "factorPriceVol",      v: sentimentProfile.factors.priceVolatility,        boolean: false },
              { key: "factorNewsIntensity", v: sentimentProfile.factors.newsSentimentIntensity, boolean: false },
              { key: "factorHypeMember",    v: sentimentProfile.factors.hypeCycleMembership ? 100 : 0, boolean: true, value: sentimentProfile.factors.hypeCycleMembership },
              { key: "factorNarrativeVal",  v: sentimentProfile.factors.narrativeValuation,     boolean: false },
            ] as const).map((f) => (
              <div key={f.key} className="rounded-lg bg-gray-50 px-2.5 py-2">
                <div className="text-[0.625rem] font-bold text-gray-500 mb-1 truncate">{tEco(f.key as "factorPriceVol")}</div>
                <div className="text-sm font-extrabold text-gray-900">
                  {f.boolean ? (f.value ? "✓" : "—") : `${f.v}/100`}
                </div>
                <div className="mt-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: `${f.v}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Top drivers */}
          {sentimentProfile.topDriversKo.length > 0 && (
            <div>
              <div className="text-[0.625rem] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5">
                {tEco("sentimentDrivers")}
              </div>
              <ul className="space-y-1">
                {(locale === "ko" ? sentimentProfile.topDriversKo : sentimentProfile.topDriversEn).map((d, i) => (
                  <li key={i} className="text-xs text-gray-700 leading-snug">· {d}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Investment Funnel position */}
      {funnelPosition && (
        <section className="toss-card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[0.6875rem] font-extrabold text-gray-500 uppercase tracking-wider">
              {tEco("firmFunnelPosition")}
            </span>
            <span className={`text-[0.625rem] font-extrabold px-2 py-0.5 rounded ${FUNNEL_STAGE_STYLE[funnelPosition.stage].bg} ${FUNNEL_STAGE_STYLE[funnelPosition.stage].text}`}>
              {FUNNEL_STAGE_STYLE[funnelPosition.stage].idx}/4 · {tEco(`stage${funnelPosition.stage}` as "stageHold")}
            </span>
          </div>

          {/* Funnel progress bar — 4 segments, current stage highlighted */}
          <div className="flex gap-1 mb-3">
            {(["Candidate", "Potential", "Confirmed", "Hold"] as FunnelStage[]).map((s) => {
              const reached = FUNNEL_STAGE_STYLE[funnelPosition.stage].idx >= FUNNEL_STAGE_STYLE[s].idx;
              return (
                <div
                  key={s}
                  className={`h-1.5 flex-1 rounded-full ${reached ? FUNNEL_STAGE_STYLE[s].bg : "bg-gray-100"}`}
                  title={tEco(`stage${s}` as "stageHold")}
                />
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="text-[0.625rem] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5">
                {tEco("firmFunnelReasons")}
              </div>
              <ul className="space-y-1">
                {(locale === "ko" ? funnelPosition.reasonsKo : funnelPosition.reasonsEn).map((r, i) => (
                  <li key={i} className="text-xs text-gray-700 leading-snug">· {r}</li>
                ))}
              </ul>
            </div>
            {funnelPosition.blockersKo.length > 0 && (
              <div>
                <div className="text-[0.625rem] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5">
                  {tEco("firmFunnelBlockers")}
                </div>
                <ul className="space-y-1">
                  {(locale === "ko" ? funnelPosition.blockersKo : funnelPosition.blockersEn).map((r, i) => (
                    <li key={i} className="text-xs text-gray-500 leading-snug">· {r}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Sell / Rebalance / Warn signals */}
      {sellSignals.length > 0 && (
        <section className="toss-card !bg-gray-50/50">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[0.6875rem] font-extrabold text-gray-500 uppercase tracking-wider">
              {tEco("firmSellPanelTitle")}
            </span>
            <span className="text-[0.625rem] font-bold text-gray-400">
              {sellSignals.length}
            </span>
          </div>
          <p className="text-xs text-gray-500 leading-snug mb-3">
            {tEco("firmSellPanelHint")}
          </p>
          <div className="space-y-2">
            {sellSignals.map((s, i) => {
              const sty = SEVERITY_STYLE[s.severity];
              return (
                <div
                  key={i}
                  className={`rounded-xl border ${sty.border} ${sty.bg} px-3 py-2.5`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[0.625rem] font-extrabold px-1.5 py-0.5 rounded ${sty.text} bg-white/70`}>
                      {sty.emoji} {s.severity}
                    </span>
                    <span className="text-[0.6875rem] font-extrabold text-gray-700">
                      {s.kind}
                    </span>
                  </div>
                  <p className="text-xs text-gray-800 leading-snug">
                    {locale === "ko" ? s.reasonKo : s.reasonEn}
                  </p>
                  {s.evidence.successorCategoryName && (
                    <div className="text-[0.6875rem] font-bold text-gray-500 mt-1">
                      → {tEco("categorySuccessor")}: {s.evidence.successorCategoryName}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Ecosystem position */}
      <section className="toss-card">
        <div className="text-[0.6875rem] font-extrabold text-gray-400 uppercase tracking-wider mb-3">
          {tEco("position")}
        </div>
        {primaryEco && primaryMem && primaryLayer ? (
          <div className="space-y-4">
            <Link
              href={`/ecosystems/${primaryEco.slug}`}
              className="block relative pl-4 group"
            >
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${ECO_BAR[primaryEco.id]} rounded-full`} />
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-extrabold text-gray-900 text-lg">
                  {locale === "ko" ? primaryEco.nameKo : primaryEco.name}
                </span>
                <span className="text-gray-400 font-bold">›</span>
                <span className="font-bold text-gray-700">
                  {locale === "ko" ? primaryLayer.nameKo : primaryLayer.name}
                </span>
                <span className="text-[0.6875rem] font-extrabold text-gray-400 uppercase ml-1">
                  L{primaryLayer.position}
                </span>
              </div>
              <p className="text-[0.8125rem] text-gray-500 leading-snug group-hover:text-gray-700 transition-colors">
                {primaryLayer.description}
              </p>
            </Link>

            {/* Secondary cross-cut memberships */}
            {secondaryMems.length > 0 && (
              <div className="border-t border-gray-100 pt-4">
                <div className="text-[0.6875rem] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  {tEco("secondaryRole")}
                </div>
                <div className="flex flex-wrap gap-2">
                  {secondaryMems.map((m) => {
                    const sEco = findEcosystem(m.ecosystemId);
                    const sLayer = sEco?.layers.find((l) => l.id === m.layerId);
                    if (!sEco || !sLayer) return null;
                    return (
                      <Link
                        key={`${m.ecosystemId}-${m.layerId}`}
                        href={`/ecosystems/${sEco.slug}`}
                        className="flex items-center gap-2 rounded-lg border border-dashed border-gray-200 bg-gray-50 px-3 py-2 text-xs font-bold hover:border-gray-300 transition-colors"
                        title={m.rationale}
                      >
                        <span className={`inline-block w-1.5 h-1.5 rounded-full ${ECO_BAR[sEco.id]}`} />
                        <span className="text-gray-700">{locale === "ko" ? sEco.nameKo : sEco.name}</span>
                        <span className="text-gray-400">›</span>
                        <span className="text-gray-500">{locale === "ko" ? sLayer.nameKo : sLayer.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Layer momentum */}
            {layerMomentum && (layerMomentum.priceMomentum !== null || layerMomentum.newsSentiment !== null) && (
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.6875rem] font-extrabold text-gray-400 uppercase tracking-wider">
                    {tEco("momentumTitle")}
                  </span>
                  <span className="text-[0.6875rem] font-medium text-gray-400">
                    {tEco("momentumExplain")}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Price momentum */}
                  <div className="rounded-xl bg-gray-50 p-3">
                    <div className="text-[0.6875rem] font-bold text-gray-500 mb-1">
                      📈 {tEco("priceLabel")}
                    </div>
                    {layerMomentum.priceMomentum !== null ? (
                      <>
                        <div className={`text-xl font-extrabold ${layerMomentum.priceMomentum >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                          {layerMomentum.priceMomentum > 0 ? "+" : ""}
                          {(layerMomentum.priceMomentum * 100).toFixed(1)}%
                        </div>
                        <div className="text-[0.6875rem] font-medium text-gray-400 mt-0.5">
                          {tEco("sampleSize", { n: layerMomentum.sampleSize.price })}
                        </div>
                        {ownPriceHistory && (
                          <div className="mt-2 pt-2 border-t border-gray-200/60 text-[0.6875rem]">
                            <span className="text-gray-500 font-bold">{firm.ticker}: </span>
                            <span className={`font-extrabold ${ownPriceHistory.priceChange1M >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                              {ownPriceHistory.priceChange1M > 0 ? "+" : ""}
                              {(ownPriceHistory.priceChange1M * 100).toFixed(1)}%
                            </span>
                            <span className="text-gray-400 ml-1">{tEco("vsLayerAvg")}</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-gray-400 font-bold">{tEco("noData")}</div>
                    )}
                  </div>

                  {/* News sentiment */}
                  <div className="rounded-xl bg-gray-50 p-3">
                    <div className="text-[0.6875rem] font-bold text-gray-500 mb-1">
                      🗞️ {tEco("newsLabel")}
                    </div>
                    {layerMomentum.newsSentiment !== null ? (
                      <>
                        <div className={`text-xl font-extrabold ${layerMomentum.newsSentiment >= 0.1 ? "text-emerald-600" : layerMomentum.newsSentiment <= -0.1 ? "text-rose-600" : "text-gray-600"}`}>
                          {layerMomentum.newsSentiment > 0 ? "+" : ""}
                          {layerMomentum.newsSentiment.toFixed(2)}
                        </div>
                        <div className="text-[0.6875rem] font-medium text-gray-400 mt-0.5">
                          {tEco("sampleSize", { n: layerMomentum.sampleSize.news })}
                        </div>
                        {layerMomentum.recentHeadlines.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-gray-200/60 text-[0.6875rem] text-gray-500 font-medium line-clamp-2">
                            {layerMomentum.recentHeadlines[0].title}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-gray-400 font-bold">{tEco("noData")}</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Layer peers */}
            {layerPeers.length > 0 && (
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.6875rem] font-extrabold text-gray-400 uppercase tracking-wider">
                    {tEco("layerPeers")}
                  </span>
                  <Link
                    href={`/ecosystems/${primaryEco.slug}`}
                    className="text-[0.6875rem] font-bold text-[#0064FF] hover:underline"
                  >
                    {tEco("viewFullLayer")}
                  </Link>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {layerPeers.map((peer) => (
                    <Link
                      key={peer.id}
                      href={`/firms/${peer.slug}`}
                      className="px-2.5 py-1 rounded-md bg-white text-xs font-bold text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      {peer.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic">{tEco("notMapped")}</p>
        )}
      </section>

      {/* Product Category participation */}
      {firmCategoryEntries.length > 0 && (
        <section className="toss-card">
          <div className="text-[0.6875rem] font-extrabold text-gray-400 uppercase tracking-wider mb-1">
            {tEco("firmCategoryHeading")}
          </div>
          <p className="text-xs text-gray-500 leading-snug mb-4">{tEco("firmCategoryHint")}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {firmCategoryEntries.map(({ category, participation }) => {
              const phaseStyle = PHASE_BADGE[category.phase];
              const roleStyle = ROLE_BADGE[participation.role];
              return (
                <div
                  key={category.id}
                  className="rounded-xl border border-gray-100 p-3 bg-white"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-extrabold text-gray-900 truncate">
                        {locale === "ko" ? category.nameKo : category.name}
                      </div>
                      <div className="text-[0.6875rem] font-bold text-gray-400 mt-0.5">
                        {category.ecosystemId} · {category.layerId}
                      </div>
                    </div>
                    <span className={`shrink-0 text-[0.6875rem] font-extrabold px-2 py-1 rounded-md ${roleStyle.bg} ${roleStyle.text}`}>
                      {roleLabel(participation.role, locale)}
                      {typeof participation.revenueWeight === "number" && (
                        <span className="ml-1 opacity-80">
                          · {Math.round(participation.revenueWeight * 100)}%
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[0.625rem] font-extrabold px-1.5 py-0.5 rounded ${phaseStyle.bg} ${phaseStyle.text}`}>
                      {phaseStyle.emoji} {phaseLabel(category.phase, locale)}
                    </span>
                    {category.successorCategoryId && (
                      <span className="text-[0.625rem] font-bold text-gray-400">
                        → {tEco("categorySuccessor")}: {category.successorCategoryId}
                      </span>
                    )}
                  </div>
                  {participation.rationale && (
                    <p className="text-[0.6875rem] text-gray-500 leading-snug mt-2 line-clamp-2">
                      {participation.rationale}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Analysis + Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Radar + scores */}
        <div className="lg:col-span-1 toss-card space-y-5">
          <h2>{t("scorecardTitle")}</h2>
          <ScoreRadar scores={classification.scores} />
          <div className="space-y-4 mt-2">
            {Object.entries(classification.scores).map(([key, value]) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-gray-500">{t(`scoreLabels.${key}` as "scoreLabels.marketShare")}</span>
                  <span className="text-xs font-extrabold text-gray-900">{value}/100</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${value >= 75 ? "bg-emerald-500" : value >= 50 ? "bg-[#0064FF]" : value >= 30 ? "bg-yellow-500" : "bg-red-500"}`}
                    style={{ width: `${value}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1 font-medium">{t(`scoreDescriptions.${key}` as "scoreDescriptions.marketShare")}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative + competitors */}
        <div className="lg:col-span-2 space-y-5">
          <div className="toss-card">
            <h2 className="mb-3">
              {t("analysisTitle")}
              <span className="ml-2 text-xs text-gray-400 font-medium">{t("rulesBased")} · {formatDate(classification.classifiedAt)}</span>
            </h2>
            <div className="text-gray-600 text-[0.9375rem] leading-relaxed space-y-2">
              {classification.narrative.split("**").map((part, i) =>
                i % 2 === 1 ? <strong key={i} className="text-gray-900 font-bold">{part}</strong> : <span key={i}>{part}</span>
              )}
            </div>
          </div>

          {/* Competitor comparison */}
          {competitorFirms.length > 0 && (
            <div className="toss-card">
              <h2 className="mb-4">{t("peerTitle")}</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2.5 text-gray-400 font-bold text-xs">{t("breadcrumbFirms")}</th>
                      <th className="text-left py-2.5 text-gray-400 font-bold text-xs">{t("scorecardTitle")}</th>
                      <th className="text-right py-2.5 text-gray-400 font-bold text-xs">{t("totalScore")}</th>
                      <th className="text-right py-2.5 text-gray-400 font-bold text-xs">{t("scoreLabels.marketShare")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 bg-[#E8F0FE]/30">
                      <td className="py-3 font-extrabold text-gray-900">{firm.ticker} {t("thisFirm")}</td>
                      <td className="py-3"><ClassificationBadge tier={classification.tier} size="sm" /></td>
                      <td className="py-3 text-right text-gray-900 font-extrabold">{classification.totalScore}</td>
                      <td className="py-3 text-right text-gray-600 font-bold">{Math.round(firm.classificationSignals.estimatedNicheMarketShare * 100)}%</td>
                    </tr>
                    {competitorFirms.map((cf) => (
                      <tr key={cf.id} className="border-b border-gray-50">
                        <td className="py-3">
                          <Link href={`/firms/${cf.slug}`} className="text-gray-600 hover:text-[#0064FF] transition-colors font-bold">
                            {cf.ticker}
                          </Link>
                        </td>
                        <td className="py-3 text-gray-400 text-xs font-medium">{cf.sector}</td>
                        <td className="py-3 text-right text-gray-500">—</td>
                        <td className="py-3 text-right text-gray-400 font-bold">{Math.round(cf.classificationSignals.estimatedNicheMarketShare * 100)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Gorilla Game Discussion — inline */}
      <div id="discussion" className="toss-card scroll-mt-8">
        <h2 className="mb-4">고릴라 게임 토론</h2>
        <p className="text-sm text-gray-400 font-medium mb-4">
          이 기업의 고릴라 지위, 분류 신호, 투자 판단에 대해 의견을 나눠보세요.
        </p>
        <FirmDiscussion firmId={firm.id} />
      </div>

      {/* Revenue Breakdown */}
      {REVENUE_SEGMENTS[firm.id] && (
        <div className="toss-card">
          <RevenueBreakdown
            segments={REVENUE_SEGMENTS[firm.id]}
            firmName={firm.name}
            allFirms={allFirms.map((f) => ({ slug: f.slug, ticker: f.ticker }))}
            labels={{
              title: t("revenueTitle", { name: firm.name }),
              revenueShare: t("revenueShare"),
              competitors: t("revenueCompetitors"),
              noSegments: t("revenueNoData"),
            }}
          />
        </div>
      )}

      {/* Charts + News — loaded progressively on client */}
      <LiveDataSection
        firmSlug={firm.slug}
        locale={locale}
        priceChartTitle={t("priceChartTitle")}
        rsiLabel={t("rsiLabel")}
        newsTitle={t("newsTitle")}
        newsMockNote={t("newsMockNote")}
        noNews={t("noNews")}
        revenueSegments={revenueSegs}
        dimensionMeta={DIMENSION_META}
        dimensionKeywords={DIMENSION_KEYWORDS}
      />

      {/* About */}
      <div className="toss-card">
        <h2 className="mb-3">{t("aboutTitle", { name: firm.name })}</h2>
        <p className="text-gray-500 text-[0.9375rem] leading-relaxed">{firm.description}</p>
        <div className="flex flex-wrap gap-3 sm:gap-6 mt-5 text-xs font-bold text-gray-400">
          <span>{t("founded", { year: firm.founded })}</span>
          <span>{t("grossMargin", { value: formatPercent(firm.grossMargin) })}</span>
          <span>{t("nrr", { value: `${Math.round(firm.classificationSignals.netRevenueRetention * 100)}%` })}</span>
          <span>{t("partners", { count: firm.classificationSignals.ecosystemPartnerCount.toLocaleString() })}</span>
        </div>
      </div>
    </main>
  );
}
