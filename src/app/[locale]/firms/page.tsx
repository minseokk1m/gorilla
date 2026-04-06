import { getAllFirms, getAllClassifications } from "@/lib/data/providers/firm-provider";
import { getAllPriceHistories } from "@/lib/data/providers/price-provider";
import { Link } from "@/i18n/routing";
import ClassificationBadge from "@/components/firms/ClassificationBadge";
import SignalBadge from "@/components/firms/SignalBadge";
import { formatMarketCap, formatPercent, formatPrice } from "@/lib/utils/formatters";
import { getTranslations } from "next-intl/server";

export default async function FirmsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "firms" });

  const [allFirms, classifications, prices] = await Promise.all([
    getAllFirms(),
    getAllClassifications(locale),
    getAllPriceHistories(),
  ]);
  const priceMap = new Map(prices.map((p) => [p.firmId, p]));

  const rows = allFirms
    .map((f) => ({ firm: f, classification: classifications.get(f.id)!, price: priceMap.get(f.id) }))
    .sort((a, b) => b.classification.totalScore - a.classification.totalScore);

  // Data timestamp — use the first classification's classifiedAt
  const classifiedAt = rows[0]?.classification.classifiedAt;
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

        {/* Tier thresholds */}
        <div className="toss-card">
          <div className="font-bold text-gray-900 text-sm mb-3">{t("thresholdsTitle")}</div>
          <div className="space-y-2">
            {[
              { emoji: "🦍", key: "thGorilla", score: "≥ 75", color: "bg-emerald-100 text-emerald-700" },
              { emoji: "🦍", key: "thPotential", score: "≥ 60", color: "bg-teal-100 text-teal-700" },
              { emoji: "👑", key: "thKing", score: "≥ 50", color: "bg-blue-100 text-[#0064FF]" },
              { emoji: "🐵", key: "thChimp", score: "≥ 35", color: "bg-yellow-100 text-yellow-700" },
              { emoji: "🤴", key: "thPrince", score: "≥ 35", color: "bg-indigo-100 text-indigo-600" },
              { emoji: "🐒", key: "thMonkey", score: "≥ 20", color: "bg-orange-100 text-orange-700" },
              { emoji: "⛏️", key: "thSerf", score: "≥ 20", color: "bg-stone-100 text-stone-600" },
              { emoji: "🕳️", key: "thChasm", score: "< 20", color: "bg-red-100 text-red-600" },
            ].map((tier) => (
              <div key={tier.key} className="flex items-center gap-2">
                <span className="text-sm">{tier.emoji}</span>
                <span className={`toss-pill text-[10px] !py-0.5 ${tier.color}`}>{tier.score}</span>
                <span className="text-xs font-bold text-gray-700 flex-1">{t(tier.key)}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3 leading-relaxed">{t("thresholdsNote")}</p>
        </div>
      </div>

      <div className="toss-card !p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-3 sm:px-5 py-2.5 sm:py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide">{t("colFirm")}</th>
              <th className="text-left px-3 sm:px-5 py-2.5 sm:py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide hidden md:table-cell">{t("colSector")}</th>
              <th className="text-left px-3 sm:px-5 py-2.5 sm:py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide">{t("colClassification")}</th>
              <th className="text-left px-3 sm:px-5 py-2.5 sm:py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide">{t("colSignal")}</th>
              <th className="text-right px-3 sm:px-5 py-2.5 sm:py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide">{t("colScore")}</th>
              <th className="text-right px-3 sm:px-5 py-2.5 sm:py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide hidden lg:table-cell">{t("colPrice")}</th>
              <th className="text-right px-3 sm:px-5 py-2.5 sm:py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide hidden lg:table-cell">{t("col1D")}</th>
              <th className="text-right px-3 sm:px-5 py-2.5 sm:py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide hidden xl:table-cell">{t("colMktCap")}</th>
              <th className="text-right px-3 sm:px-5 py-2.5 sm:py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide hidden xl:table-cell">{t("colRevGrowth")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ firm, classification, price }) => (
              <tr
                key={firm.id}
                className="border-b border-gray-50 hover:bg-[#F8F9FA] transition-colors"
              >
                <td className="px-3 sm:px-5 py-2.5 sm:py-4">
                  <Link href={`/firms/${firm.slug}`} className="flex items-center gap-3 group">
                    <div>
                      <div className="font-extrabold text-gray-900 group-hover:text-[#0064FF] transition-colors">{firm.ticker}</div>
                      <div className="text-gray-400 text-xs font-medium">{firm.name}</div>
                    </div>
                  </Link>
                </td>
                <td className="px-3 sm:px-5 py-2.5 sm:py-4 hidden md:table-cell">
                  <span className="text-gray-500 text-xs font-medium">{firm.sector}</span>
                </td>
                <td className="px-3 sm:px-5 py-2.5 sm:py-4">
                  <ClassificationBadge tier={classification.tier} size="sm" />
                </td>
                <td className="px-3 sm:px-5 py-2.5 sm:py-4">
                  <SignalBadge signal={classification.signal} size="sm" />
                </td>
                <td className="px-3 sm:px-5 py-2.5 sm:py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 bg-gray-100 rounded-full h-1.5 hidden sm:block">
                      <div
                        className="h-1.5 rounded-full bg-[#0064FF]"
                        style={{ width: `${classification.totalScore}%` }}
                      />
                    </div>
                    <span className="text-gray-900 font-extrabold">{classification.totalScore}</span>
                  </div>
                </td>
                <td className="px-3 sm:px-5 py-2.5 sm:py-4 text-right hidden lg:table-cell">
                  <span className="text-gray-900 font-bold">{price ? formatPrice(price.currentPrice) : "—"}</span>
                </td>
                <td className="px-3 sm:px-5 py-2.5 sm:py-4 text-right hidden lg:table-cell">
                  {price && (
                    <span className={`font-bold ${price.priceChange1D >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                      {formatPercent(price.priceChange1D, true)}
                    </span>
                  )}
                </td>
                <td className="px-3 sm:px-5 py-2.5 sm:py-4 text-right hidden xl:table-cell">
                  <span className="text-gray-500 font-medium">{formatMarketCap(firm.marketCapUSD)}</span>
                </td>
                <td className="px-3 sm:px-5 py-2.5 sm:py-4 text-right hidden xl:table-cell">
                  <span className={`font-bold ${firm.revenueGrowthYoY >= 0.2 ? "text-emerald-600" : firm.revenueGrowthYoY >= 0.1 ? "text-[#0064FF]" : "text-gray-500"}`}>
                    {formatPercent(firm.revenueGrowthYoY, true)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
