import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import type { ClassificationTier } from "@/types/classification";
import type { EcosystemId } from "@/types/ecosystem";
import { ECOSYSTEMS } from "@/lib/data/mock/ecosystems";
import {
  ECOSYSTEM_MEMBERSHIPS,
  UNCATEGORIZED_FIRM_IDS,
} from "@/lib/data/mock/ecosystem-memberships";
import { getAllFirms, getAllClassifications } from "@/lib/data/providers/firm-provider";

const TIER_ORDER: ClassificationTier[] = [
  "Gorilla",
  "Potential Gorilla",
  "King",
  "Prince",
  "Chimpanzee",
  "Monkey",
  "Serf",
  "In Chasm",
];

const TIER_COLOR: Record<ClassificationTier, string> = {
  "Gorilla": "bg-emerald-500",
  "Potential Gorilla": "bg-emerald-300",
  "King": "bg-blue-500",
  "Prince": "bg-blue-300",
  "Chimpanzee": "bg-amber-500",
  "Monkey": "bg-amber-300",
  "Serf": "bg-gray-400",
  "In Chasm": "bg-rose-400",
};

const TIER_LABEL_KO: Record<ClassificationTier, string> = {
  "Gorilla": "고릴라",
  "Potential Gorilla": "잠재 고릴라",
  "King": "왕",
  "Prince": "왕자",
  "Chimpanzee": "침팬지",
  "Monkey": "원숭이",
  "Serf": "농노",
  "In Chasm": "캐즘 추락",
};

const ECO_ACCENT: Record<EcosystemId, { bar: string; tint: string }> = {
  "ai": { bar: "bg-blue-500", tint: "bg-blue-50" },
  "cybersecurity": { bar: "bg-rose-500", tint: "bg-rose-50" },
  "energy-transition": { bar: "bg-emerald-500", tint: "bg-emerald-50" },
  "defense": { bar: "bg-slate-600", tint: "bg-slate-50" },
  "korean-industrial": { bar: "bg-orange-500", tint: "bg-orange-50" },
  "crypto": { bar: "bg-violet-500", tint: "bg-violet-50" },
  "biotech": { bar: "bg-teal-500", tint: "bg-teal-50" },
  "auto-ev-battery": { bar: "bg-yellow-500", tint: "bg-yellow-50" },
  "space": { bar: "bg-indigo-600", tint: "bg-indigo-50" },
};

export default async function EcosystemsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ecosystems" });

  const [firms, classifications] = await Promise.all([
    getAllFirms(),
    getAllClassifications(locale),
  ]);
  const firmById = new Map(firms.map((f) => [f.id, f]));

  // Aggregate per-ecosystem stats
  const summaries = ECOSYSTEMS.map((eco) => {
    const primaries = ECOSYSTEM_MEMBERSHIPS.filter(
      (m) => m.ecosystemId === eco.id && m.role === "primary",
    );
    const secondaries = ECOSYSTEM_MEMBERSHIPS.filter(
      (m) => m.ecosystemId === eco.id && m.role === "secondary",
    );
    const tierCounts = new Map<ClassificationTier, number>();
    for (const m of primaries) {
      const c = classifications.get(m.firmId);
      if (!c) continue;
      tierCounts.set(c.tier, (tierCounts.get(c.tier) ?? 0) + 1);
    }
    const totalForBar = Array.from(tierCounts.values()).reduce((a, b) => a + b, 0) || 1;
    return { eco, primaries, secondaries, tierCounts, totalForBar };
  });

  const totals = {
    primary: ECOSYSTEM_MEMBERSHIPS.filter((m) => m.role === "primary").length,
    secondary: ECOSYSTEM_MEMBERSHIPS.filter((m) => m.role === "secondary").length,
    uncategorized: UNCATEGORIZED_FIRM_IDS.length,
  };

  const uncategorizedFirms = UNCATEGORIZED_FIRM_IDS
    .map((id) => firmById.get(id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  return (
    <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2">{t("title")}</h1>
        <p className="text-gray-500 text-[0.9375rem] leading-relaxed">{t("subtitle")}</p>
        <p className="text-xs text-gray-400 font-medium mt-3">
          {t("totalSummary", totals)}
        </p>
      </div>

      {/* Ecosystem cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {summaries.map(({ eco, primaries, secondaries, tierCounts, totalForBar }) => {
          const accent = ECO_ACCENT[eco.id];
          const ecoName = locale === "ko" ? eco.nameKo : eco.name;
          const ecoSubName = locale === "ko" ? eco.name : eco.nameKo;
          return (
            <Link
              key={eco.id}
              href={`/ecosystems/${eco.slug}`}
              className="group relative block toss-card hover:shadow-lg transition-shadow overflow-hidden"
            >
              {/* Color strip */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${accent.bar}`} />

              {/* Header */}
              <div className="pl-3">
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="font-extrabold text-gray-900 text-base">{ecoName}</h3>
                  <span className="text-[0.6875rem] font-bold text-gray-400 tracking-wider uppercase">
                    {ecoSubName}
                  </span>
                </div>
                <p className="text-[0.8125rem] text-gray-600 leading-snug mb-3">
                  {eco.tagline}
                </p>

                {/* Stats line */}
                <div className="flex items-center gap-3 text-[0.6875rem] font-bold text-gray-500 mb-3">
                  <span>{t("stats", { layers: eco.layers.length, firms: primaries.length })}</span>
                  {secondaries.length > 0 && (
                    <span className="text-gray-400">
                      +{secondaries.length} cross-cut
                    </span>
                  )}
                </div>

                {/* Tier mini bar */}
                {primaries.length > 0 ? (
                  <div className="space-y-1.5">
                    <div className="flex h-2 rounded-full overflow-hidden bg-gray-100">
                      {TIER_ORDER.map((tier) => {
                        const n = tierCounts.get(tier) ?? 0;
                        if (n === 0) return null;
                        const pct = (n / totalForBar) * 100;
                        return (
                          <div
                            key={tier}
                            className={TIER_COLOR[tier]}
                            style={{ width: `${pct}%` }}
                            title={`${tier}: ${n}`}
                          />
                        );
                      })}
                    </div>
                    {/* Inline tier counts */}
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[0.6875rem] font-bold">
                      {TIER_ORDER.filter((tier) => (tierCounts.get(tier) ?? 0) > 0).map((tier) => (
                        <span key={tier} className="flex items-center gap-1 text-gray-600">
                          <span className={`inline-block w-1.5 h-1.5 rounded-full ${TIER_COLOR[tier]}`} />
                          {locale === "ko" ? TIER_LABEL_KO[tier] : tier} {tierCounts.get(tier)}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">{t("noFirms")}</p>
                )}

                {/* CTA */}
                <div className="mt-4 text-[0.75rem] font-bold text-[#0064FF] opacity-70 group-hover:opacity-100 transition-opacity">
                  {t("viewLayers")}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Uncategorized */}
      {uncategorizedFirms.length > 0 && (
        <section className="toss-card !bg-gray-50">
          <div className="font-extrabold text-gray-900 text-sm mb-1">
            {t("uncategorizedTitle")} · {uncategorizedFirms.length}
          </div>
          <p className="text-xs text-gray-500 mb-4">{t("uncategorizedHint")}</p>
          <div className="flex flex-wrap gap-2">
            {uncategorizedFirms.map((f) => (
              <Link
                key={f.id}
                href={`/firms/${f.slug}`}
                className="px-2.5 py-1 rounded-md bg-white text-xs font-bold text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-300 transition-colors"
              >
                {f.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
