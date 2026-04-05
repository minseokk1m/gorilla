import { notFound } from "next/navigation";
import { MOCK_FIRMS } from "@/lib/data/mock/firms";
import { getAllFirms, getClassification } from "@/lib/data/providers/firm-provider";
import { getPriceHistory } from "@/lib/data/providers/price-provider";
import { getNewsByFirmId } from "@/lib/data/providers/news-provider";
import ClassificationBadge from "@/components/firms/ClassificationBadge";
import SignalBadge from "@/components/firms/SignalBadge";
import { formatMarketCap, formatPercent, formatPrice, formatDate } from "@/lib/utils/formatters";
import { DATA_SOURCE } from "@/lib/data/api/config";
import StockChart from "@/components/firm-detail/StockChart";
import RSIChart from "@/components/firm-detail/RSIChart";
import ScoreRadar from "@/components/firm-detail/ScoreRadar";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

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

  const [classification, priceHistory, news] = await Promise.all([
    getClassification(firm.id, locale),
    getPriceHistory(firm.id),
    getNewsByFirmId(firm.id),
  ]);

  if (!classification) notFound();

  const competitorFirms = allFirms.filter((f) => firm.competitors.includes(f.slug));

  const SENTIMENT_COLORS = { Positive: "text-emerald-600", Neutral: "text-gray-500", Negative: "text-red-500" };
  const SENTIMENT_DOTS = { Positive: "bg-emerald-500", Neutral: "bg-gray-400", Negative: "bg-red-500" };

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
              <Link href={`/firms/${slug}/discuss`} className="text-xs font-bold text-[#0064FF] bg-[#E8F0FE] px-3 py-1.5 rounded-lg hover:bg-[#0064FF] hover:text-white transition-colors">
                토론하기
              </Link>
            </div>
            {priceHistory && (
              <div className="flex items-center gap-4 mt-3">
                <span className="text-3xl font-extrabold text-gray-900">{formatPrice(priceHistory.currentPrice)}</span>
                <span className={`text-sm font-bold ${priceHistory.priceChange1D >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                  {formatPercent(priceHistory.priceChange1D, true)} {t("today")}
                </span>
                <span className={`text-sm font-bold ${priceHistory.priceChange1M >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                  {formatPercent(priceHistory.priceChange1M, true)} 1M
                </span>
              </div>
            )}
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

      {/* Charts */}
      {priceHistory && (
        <div className="toss-card space-y-4">
          <h2>{t("priceChartTitle")}</h2>
          <StockChart priceHistory={priceHistory} />
          <h3 className="text-gray-500 font-bold pt-2">{t("rsiLabel")}</h3>
          <RSIChart rsi={priceHistory.rsi} dates={priceHistory.candles.map((c) => c.date)} />
        </div>
      )}

      {/* News */}
      <div className="toss-card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="mb-0">
            {t("newsTitle")}
          </h2>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 shrink-0">
            {DATA_SOURCE !== "mock" && news.length > 0 && news[0].url !== "#" ? (
              <>
                <span className="inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
                <span>·</span>
                <span>{t("fetchedAt", { time: new Date().toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" }) })}</span>
              </>
            ) : (
              <span className="text-gray-300">{t("newsMockNote")}</span>
            )}
          </div>
        </div>
        {news.length === 0 ? (
          <p className="text-gray-400 text-sm font-medium">{t("noNews")}</p>
        ) : (
          <div className="space-y-4">
            {news.map((article) => (
              <div key={article.id} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${SENTIMENT_DOTS[article.sentiment]}`} />
                  <div>
                    {article.url && article.url !== "#" ? (
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-gray-900 text-sm leading-snug mb-1 font-bold hover:text-[#0064FF] transition-colors block">
                        {article.title}
                      </a>
                    ) : (
                      <h3 className="text-gray-900 text-sm leading-snug mb-1">{article.title}</h3>
                    )}
                    {article.summary && (
                      <p className="text-gray-500 text-xs leading-relaxed mb-2">{article.summary}</p>
                    )}
                    <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                      <span>{article.source}</span>
                      <span>·</span>
                      <span>{formatDate(article.publishedAt)}</span>
                      <span>·</span>
                      <span className={SENTIMENT_COLORS[article.sentiment]}>{article.sentiment}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* About */}
      <div className="toss-card">
        <h2 className="mb-3">{t("aboutTitle", { name: firm.name })}</h2>
        <p className="text-gray-500 text-[0.9375rem] leading-relaxed">{firm.description}</p>
        <div className="flex gap-6 mt-5 text-xs font-bold text-gray-400">
          <span>{t("founded", { year: firm.founded })}</span>
          <span>{t("grossMargin", { value: formatPercent(firm.grossMargin) })}</span>
          <span>{t("nrr", { value: `${Math.round(firm.classificationSignals.netRevenueRetention * 100)}%` })}</span>
          <span>{t("partners", { count: firm.classificationSignals.ecosystemPartnerCount.toLocaleString() })}</span>
        </div>
      </div>
    </main>
  );
}
