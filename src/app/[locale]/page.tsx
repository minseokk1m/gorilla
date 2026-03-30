import { MOCK_FIRMS } from "@/lib/data/mock/firms";
import { getAllClassifications } from "@/lib/data/providers/firm-provider";
import { getLatestNews } from "@/lib/data/providers/news-provider";
import MarketSummaryBar from "@/components/dashboard/MarketSummaryBar";
import TALCChart from "@/components/dashboard/TALCChart";
import PipelineView from "@/components/dashboard/PipelineView";
import type { ClassificationResult } from "@/types/classification";
import type { NewsArticle } from "@/types/news";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dashboard" });

  const [classificationsMap, allNews] = await Promise.all([
    getAllClassifications(locale),
    getLatestNews(200),
  ]);

  const classificationsList = Array.from(classificationsMap.values()) as ClassificationResult[];

  // Build a map of firmId → most recent news article
  const newsMap = new Map<string, NewsArticle>();
  for (const article of allNews) {
    if (!newsMap.has(article.firmId)) {
      newsMap.set(article.firmId, article);
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("title")}</h1>
        <p className="text-gray-500 max-w-2xl">{t("subtitle")}</p>
      </div>

      <MarketSummaryBar classifications={classificationsList} />

      {/* TALC Curve with firm list + interactive chart */}
      <section className="border border-gray-200 rounded-xl p-4 sm:p-6 bg-white">
        <TALCChart
          firms={MOCK_FIRMS}
          classifications={Object.fromEntries(classificationsMap)}
          newsMap={Object.fromEntries(newsMap)}
        />
      </section>

      {/* Pipeline detail breakdown */}
      <PipelineView
        locale={locale}
        firms={MOCK_FIRMS}
        classifications={classificationsMap}
        newsMap={newsMap}
      />

      <div className="text-center py-4">
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 text-emerald-600 hover:underline font-semibold"
        >
          {t("learnMore")}
        </Link>
      </div>
    </main>
  );
}
