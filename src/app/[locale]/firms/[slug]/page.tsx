import { notFound } from "next/navigation";
import { MOCK_FIRMS } from "@/lib/data/mock/firms";
import { getAllFirms, getClassification } from "@/lib/data/providers/firm-provider";
import ClassificationBadge from "@/components/firms/ClassificationBadge";
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

  const classification = await getClassification(firm.id, locale);
  if (!classification) notFound();

  const competitorFirms = allFirms.filter((f) => firm.competitors.includes(f.slug));
  const revenueSegs = REVENUE_SEGMENTS[firm.id];

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
              <div className="text-lg font-extrabold text-gray-900">{classification.marketPhase}</div>
              <div className="text-xs font-bold text-gray-400 mt-0.5">{t("talcPhase")}</div>
            </div>
          </div>
        </div>
      </div>

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
