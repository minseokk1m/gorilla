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
    <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="mb-2">{t("title")}</h1>
        <p className="text-gray-500 text-[0.9375rem]">{t("subtitle")}</p>
      </div>

      <div className="toss-card !p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-5 py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide">{t("colFirm")}</th>
              <th className="text-left px-5 py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide hidden md:table-cell">{t("colSector")}</th>
              <th className="text-left px-5 py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide">{t("colClassification")}</th>
              <th className="text-left px-5 py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide">{t("colSignal")}</th>
              <th className="text-right px-5 py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide">{t("colScore")}</th>
              <th className="text-right px-5 py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide hidden lg:table-cell">{t("colPrice")}</th>
              <th className="text-right px-5 py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide hidden lg:table-cell">{t("col1D")}</th>
              <th className="text-right px-5 py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide hidden xl:table-cell">{t("colMktCap")}</th>
              <th className="text-right px-5 py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide hidden xl:table-cell">{t("colRevGrowth")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ firm, classification, price }) => (
              <tr
                key={firm.id}
                className="border-b border-gray-50 hover:bg-[#F8F9FA] transition-colors"
              >
                <td className="px-5 py-4">
                  <Link href={`/firms/${firm.slug}`} className="flex items-center gap-3 group">
                    <div>
                      <div className="font-extrabold text-gray-900 group-hover:text-[#0064FF] transition-colors">{firm.ticker}</div>
                      <div className="text-gray-400 text-xs font-medium">{firm.name}</div>
                    </div>
                  </Link>
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <span className="text-gray-500 text-xs font-medium">{firm.sector}</span>
                </td>
                <td className="px-5 py-4">
                  <ClassificationBadge tier={classification.tier} size="sm" />
                </td>
                <td className="px-5 py-4">
                  <SignalBadge signal={classification.signal} size="sm" />
                </td>
                <td className="px-5 py-4 text-right">
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
                <td className="px-5 py-4 text-right hidden lg:table-cell">
                  <span className="text-gray-900 font-bold">{price ? formatPrice(price.currentPrice) : "—"}</span>
                </td>
                <td className="px-5 py-4 text-right hidden lg:table-cell">
                  {price && (
                    <span className={`font-bold ${price.priceChange1D >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                      {formatPercent(price.priceChange1D, true)}
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 text-right hidden xl:table-cell">
                  <span className="text-gray-500 font-medium">{formatMarketCap(firm.marketCapUSD)}</span>
                </td>
                <td className="px-5 py-4 text-right hidden xl:table-cell">
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
