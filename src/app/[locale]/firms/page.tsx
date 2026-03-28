import { MOCK_FIRMS } from "@/lib/data/mock/firms";
import { getAllClassifications } from "@/lib/data/providers/firm-provider";
import { getAllPriceHistories } from "@/lib/data/providers/price-provider";
import { Link } from "@/i18n/routing";
import ClassificationBadge from "@/components/firms/ClassificationBadge";
import SignalBadge from "@/components/firms/SignalBadge";
import { formatMarketCap, formatPercent, formatPrice } from "@/lib/utils/formatters";
import { getTranslations } from "next-intl/server";

export default async function FirmsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "firms" });

  const [classifications, prices] = await Promise.all([
    getAllClassifications(locale),
    getAllPriceHistories(),
  ]);
  const priceMap = new Map(prices.map((p) => [p.firmId, p]));

  const rows = MOCK_FIRMS
    .map((f) => ({ firm: f, classification: classifications.get(f.id)!, price: priceMap.get(f.id) }))
    .sort((a, b) => b.classification.totalScore - a.classification.totalScore);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("title")}</h1>
        <p className="text-gray-500">{t("subtitle")}</p>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-4 py-3 text-gray-500 font-medium">{t("colFirm")}</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium hidden md:table-cell">{t("colSector")}</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">{t("colClassification")}</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">{t("colSignal")}</th>
              <th className="text-right px-4 py-3 text-gray-500 font-medium">{t("colScore")}</th>
              <th className="text-right px-4 py-3 text-gray-500 font-medium hidden lg:table-cell">{t("colPrice")}</th>
              <th className="text-right px-4 py-3 text-gray-500 font-medium hidden lg:table-cell">{t("col1D")}</th>
              <th className="text-right px-4 py-3 text-gray-500 font-medium hidden xl:table-cell">{t("colMktCap")}</th>
              <th className="text-right px-4 py-3 text-gray-500 font-medium hidden xl:table-cell">{t("colRevGrowth")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ firm, classification, price }, i) => (
              <tr
                key={firm.id}
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
              >
                <td className="px-4 py-3">
                  <Link href={`/firms/${firm.slug}`} className="flex items-center gap-3 group">
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{firm.ticker}</div>
                      <div className="text-gray-400 text-xs">{firm.name}</div>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="text-gray-500 text-xs">{firm.sector}</span>
                </td>
                <td className="px-4 py-3">
                  <ClassificationBadge tier={classification.tier} size="sm" />
                </td>
                <td className="px-4 py-3">
                  <SignalBadge signal={classification.signal} size="sm" />
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-1.5 hidden sm:block">
                      <div
                        className="h-1.5 rounded-full bg-emerald-500"
                        style={{ width: `${classification.totalScore}%` }}
                      />
                    </div>
                    <span className="text-gray-900 font-medium">{classification.totalScore}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right hidden lg:table-cell">
                  <span className="text-gray-900">{price ? formatPrice(price.currentPrice) : "—"}</span>
                </td>
                <td className="px-4 py-3 text-right hidden lg:table-cell">
                  {price && (
                    <span className={price.priceChange1D >= 0 ? "text-emerald-600" : "text-red-600"}>
                      {formatPercent(price.priceChange1D, true)}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right hidden xl:table-cell">
                  <span className="text-gray-500">{formatMarketCap(firm.marketCapUSD)}</span>
                </td>
                <td className="px-4 py-3 text-right hidden xl:table-cell">
                  <span className={firm.revenueGrowthYoY >= 0.2 ? "text-emerald-600" : firm.revenueGrowthYoY >= 0.1 ? "text-blue-600" : "text-gray-500"}>
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
