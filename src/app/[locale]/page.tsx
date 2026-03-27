import { MOCK_FIRMS } from "@/lib/data/mock/firms";
import { getAllClassifications } from "@/lib/data/providers/firm-provider";
import { getAllPriceHistories } from "@/lib/data/providers/price-provider";
import MarketSummaryBar from "@/components/dashboard/MarketSummaryBar";
import ClassificationGrid from "@/components/dashboard/ClassificationGrid";
import type { PriceHistory } from "@/types/market";
import type { ClassificationResult } from "@/types/classification";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dashboard" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  const [classificationsMap, prices] = await Promise.all([
    getAllClassifications(locale),
    getAllPriceHistories(),
  ]);

  const priceMap = new Map<string, PriceHistory>(prices.map((p) => [p.firmId, p]));
  const classificationsList = Array.from(classificationsMap.values()) as ClassificationResult[];

  const buyFirms = MOCK_FIRMS
    .filter((f) => classificationsMap.get(f.id)?.signal === "BUY")
    .map((f) => ({ firm: f, classification: classificationsMap.get(f.id)! }))
    .sort((a, b) => b.classification.totalScore - a.classification.totalScore);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">{t("title")}</h1>
        <p className="text-zinc-400 max-w-2xl">{t("subtitle")}</p>
      </div>

      <MarketSummaryBar classifications={classificationsList} />

      <div className="bg-emerald-950/40 border border-emerald-900/60 rounded-xl p-5">
        <h2 className="text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-3">
          {t("buySignalsHeading", { count: buyFirms.length })}
        </h2>
        <div className="flex flex-wrap gap-2">
          {buyFirms.map(({ firm, classification }) => (
            <Link key={firm.id} href={`/firms/${firm.slug}`}>
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-emerald-700 transition-colors rounded-lg px-3 py-2 text-sm">
                <span className="font-bold text-white">{firm.ticker}</span>
                <span className="text-zinc-400 text-xs hidden sm:block">{firm.name}</span>
                <span className="text-emerald-400 text-xs font-medium">{classification.tier}</span>
                <span className="text-zinc-500 text-xs">{classification.totalScore}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-white font-semibold text-lg mb-4">{t("allFirmsHeading")}</h2>
        <ClassificationGrid
          firms={MOCK_FIRMS}
          classifications={classificationsMap}
          priceHistories={priceMap}
        />
      </div>

      <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-900">
        <h2 className="text-white font-semibold text-lg mb-2">{t("whyGorillaTitle")}</h2>
        <p className="text-zinc-400 text-sm leading-relaxed max-w-3xl">
          {t("whyGorillaBody")}{" "}
          <Link href="/learn" className="text-emerald-400 hover:underline">{t("learnMore")}</Link>
        </p>
      </div>
    </main>
  );
}
