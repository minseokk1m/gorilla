// ISR 30분 (TALC + classification 데이터 사용)
export const revalidate = 1800;

import { getTranslations } from "next-intl/server";
import { getAllFirms, getAllClassifications } from "@/lib/data/providers/firm-provider";
import TALCPhaseView from "@/components/dashboard/TALCPhaseView";

export default async function LandscapePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "landscape" });

  const [firms, classifications] = await Promise.all([
    getAllFirms(),
    getAllClassifications(locale),
  ]);

  return (
    <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 space-y-6">
      <div>
        <h1 className="mb-2">{t("title")}</h1>
        <p className="text-gray-500 text-[0.9375rem] leading-relaxed max-w-3xl">{t("subtitle")}</p>
      </div>

      {/* Pot Gorilla / In Chasm은 클럽 보조 라벨임을 명시 — 만화 thesis와 일관 */}
      <div className="rounded-xl bg-amber-50/60 ring-1 ring-amber-200 px-4 py-3">
        <p className="text-[0.8125rem] text-amber-900 leading-relaxed">{t("auxLabelNote")}</p>
      </div>

      <TALCPhaseView locale={locale} firms={firms} classifications={classifications} />
    </main>
  );
}
