import { notFound } from "next/navigation";
import { MOCK_FIRMS } from "@/lib/data/mock/firms";
import { getClassification } from "@/lib/data/providers/firm-provider";
import { getPriceHistory } from "@/lib/data/providers/price-provider";
import { getNewsByFirmId } from "@/lib/data/providers/news-provider";
import ClassificationBadge from "@/components/firms/ClassificationBadge";
import SignalBadge from "@/components/firms/SignalBadge";
import { formatMarketCap, formatPercent, formatPrice, formatDate } from "@/lib/utils/formatters";
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
  const firm = MOCK_FIRMS.find((f) => f.slug === slug);
  if (!firm) notFound();

  const t = await getTranslations({ locale, namespace: "firmDetail" });

  const [classification, priceHistory, news] = await Promise.all([
    getClassification(firm.id, locale),
    getPriceHistory(firm.id),
    getNewsByFirmId(firm.id),
  ]);

  if (!classification) notFound();

  const competitorFirms = MOCK_FIRMS.filter((f) => firm.competitors.includes(f.slug));

  const SENTIMENT_COLORS = { Positive: "text-emerald-600", Neutral: "text-gray-500", Negative: "text-red-600" };
  const SENTIMENT_DOTS = { Positive: "bg-emerald-500", Neutral: "bg-gray-400", Negative: "bg-red-500" };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Link href="/" className="hover:text-gray-900 transition-colors">{t("breadcrumbDashboard")}</Link>
        <span>/</span>
        <Link href="/firms" className="hover:text-gray-900 transition-colors">{t("breadcrumbFirms")}</Link>
        <span>/</span>
        <span className="text-gray-900">{firm.ticker}</span>
      </div>

      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold text-gray-900">{firm.ticker}</h1>
              <ClassificationBadge tier={classification.tier} size="lg" />
              <SignalBadge signal={classification.signal} size="lg" />
            </div>
            <p className="text-gray-500">{firm.name} · {firm.sector}</p>
            {priceHistory && (
              <div className="flex items-center gap-4 mt-2">
                <span className="text-2xl font-bold text-gray-900">{formatPrice(priceHistory.currentPrice)}</span>
                <span className={`text-sm font-medium ${priceHistory.priceChange1D >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {formatPercent(priceHistory.priceChange1D, true)} {t("today")}
                </span>
                <span className={`text-sm ${priceHistory.priceChange1M >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {formatPercent(priceHistory.priceChange1M, true)} 1M
                </span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="text-xl font-bold text-gray-900">{classification.totalScore}</div>
              <div className="text-xs text-gray-500">{t("totalScore")}</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="text-xl font-bold text-gray-900">{formatMarketCap(firm.marketCapUSD)}</div>
              <div className="text-xs text-gray-500">{t("marketCap")}</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-3">
              <div className={`text-xl font-bold ${firm.revenueGrowthYoY >= 0.2 ? "text-emerald-600" : "text-gray-900"}`}>
                {formatPercent(firm.revenueGrowthYoY, true)}
              </div>
              <div className="text-xs text-gray-500">{t("revGrowth")}</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="text-xl font-bold text-gray-900">{classification.marketPhase}</div>
              <div className="text-xs text-gray-500">{t("talcPhase")}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis + Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar + scores */}
        <div className="lg:col-span-1 bg-white border border-gray-200 rounded-xl p-5 space-y-5">
          <h2 className="text-gray-900 font-semibold">{t("scorecardTitle")}</h2>
          <ScoreRadar scores={classification.scores} />
          <div className="space-y-3 mt-2">
            {Object.entries(classification.scores).map(([key, value]) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">{t(`scoreLabels.${key}` as "scoreLabels.marketShare")}</span>
                  <span className="text-xs font-medium text-gray-900">{value}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all ${value >= 75 ? "bg-emerald-500" : value >= 50 ? "bg-blue-500" : value >= 30 ? "bg-yellow-500" : "bg-red-500"}`}
                    style={{ width: `${value}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{t(`scoreDescriptions.${key}` as "scoreDescriptions.marketShare")}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative + competitors */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-gray-900 font-semibold mb-3">
              {t("analysisTitle")}
              <span className="ml-2 text-xs text-gray-400 font-normal">{t("rulesBased")} · {formatDate(classification.classifiedAt)}</span>
            </h2>
            <div className="text-gray-600 text-sm leading-relaxed space-y-2">
              {classification.narrative.split("**").map((part, i) =>
                i % 2 === 1 ? <strong key={i} className="text-gray-900">{part}</strong> : <span key={i}>{part}</span>
              )}
            </div>
          </div>

          {/* Competitor comparison */}
          {competitorFirms.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-gray-900 font-semibold mb-3">{t("peerTitle")}</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-gray-500 font-medium">{t("breadcrumbFirms")}</th>
                      <th className="text-left py-2 text-gray-500 font-medium">{t("scorecardTitle")}</th>
                      <th className="text-right py-2 text-gray-500 font-medium">{t("totalScore")}</th>
                      <th className="text-right py-2 text-gray-500 font-medium">{t("scoreLabels.marketShare")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="py-2 font-bold text-gray-900">{firm.ticker} {t("thisFirm")}</td>
                      <td className="py-2"><ClassificationBadge tier={classification.tier} size="sm" /></td>
                      <td className="py-2 text-right text-gray-900 font-medium">{classification.totalScore}</td>
                      <td className="py-2 text-right text-gray-600">{Math.round(firm.classificationSignals.estimatedNicheMarketShare * 100)}%</td>
                    </tr>
                    {competitorFirms.map((cf) => (
                      <tr key={cf.id} className="border-b border-gray-100">
                        <td className="py-2">
                          <Link href={`/firms/${cf.slug}`} className="text-gray-600 hover:text-gray-900 transition-colors">
                            {cf.ticker}
                          </Link>
                        </td>
                        <td className="py-2 text-gray-400 text-xs">{cf.sector}</td>
                        <td className="py-2 text-right text-gray-500">—</td>
                        <td className="py-2 text-right text-gray-400">{Math.round(cf.classificationSignals.estimatedNicheMarketShare * 100)}%</td>
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
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <h2 className="text-gray-900 font-semibold">{t("priceChartTitle")}</h2>
          <StockChart priceHistory={priceHistory} />
          <h3 className="text-gray-500 text-sm font-medium pt-2">{t("rsiLabel")}</h3>
          <RSIChart rsi={priceHistory.rsi} dates={priceHistory.candles.map((c) => c.date)} />
        </div>
      )}

      {/* News */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="text-gray-900 font-semibold mb-4">
          {t("newsTitle")}
          <span className="ml-2 text-xs text-gray-400 font-normal">{t("newsMockNote")}</span>
        </h2>
        {news.length === 0 ? (
          <p className="text-gray-400 text-sm">{t("noNews")}</p>
        ) : (
          <div className="space-y-4">
            {news.map((article) => (
              <div key={article.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${SENTIMENT_DOTS[article.sentiment]}`} />
                  <div>
                    <h3 className="text-gray-900 text-sm font-medium leading-snug mb-1">{article.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-2">{article.summary}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
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
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="text-gray-900 font-semibold mb-3">{t("aboutTitle", { name: firm.name })}</h2>
        <p className="text-gray-500 text-sm leading-relaxed">{firm.description}</p>
        <div className="flex gap-6 mt-4 text-xs text-gray-400">
          <span>{t("founded", { year: firm.founded })}</span>
          <span>{t("grossMargin", { value: formatPercent(firm.grossMargin) })}</span>
          <span>{t("nrr", { value: `${Math.round(firm.classificationSignals.netRevenueRetention * 100)}%` })}</span>
          <span>{t("partners", { count: firm.classificationSignals.ecosystemPartnerCount.toLocaleString() })}</span>
        </div>
      </div>
    </main>
  );
}
