import { getTranslations } from "next-intl/server";
import type { Firm } from "@/types/firm";
import type { ClassificationResult } from "@/types/classification";
import type { NewsArticle } from "@/types/news";
import { Link } from "@/i18n/routing";
import SignalBadge from "@/components/firms/SignalBadge";
import ClassificationBadge from "@/components/firms/ClassificationBadge";

interface PipelineViewProps {
  locale: string;
  firms: Firm[];
  classifications: Map<string, ClassificationResult>;
  newsMap: Map<string, NewsArticle>;
}

function FirmRow({
  firm,
  classification,
  news,
}: {
  firm: Firm;
  classification: ClassificationResult;
  news?: NewsArticle;
}) {
  const rev = Math.round(firm.revenueGrowthYoY * 100);
  return (
    <Link href={`/firms/${firm.slug}`}>
      <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/70 hover:bg-white hover:shadow-sm transition-all cursor-pointer group">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-gray-900 text-sm group-hover:text-[#0064FF] transition-colors">{firm.ticker}</span>
            <span className="text-gray-400 text-xs truncate hidden sm:inline">{firm.name}</span>
          </div>
          {news && (
            <p className="text-[10px] text-gray-400 leading-snug line-clamp-1 mt-0.5">{news.title}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-gray-400 hidden sm:block">+{rev}%</span>
          <span className="text-xs font-extrabold text-gray-500">{classification.totalScore}</span>
          <SignalBadge signal={classification.signal} size="sm" />
        </div>
      </div>
    </Link>
  );
}

export default async function PipelineView({
  locale,
  firms,
  classifications,
  newsMap,
}: PipelineViewProps) {
  const t = await getTranslations({ locale, namespace: "pipeline" });

  const byScore = (a: Firm, b: Firm) =>
    (classifications.get(b.id)?.totalScore ?? 0) - (classifications.get(a.id)?.totalScore ?? 0);

  const gorillas: Firm[] = [];
  const prospects: Firm[] = [];
  const kings: Firm[] = [];
  const princes: Firm[] = [];
  const chimps: Firm[] = [];
  const monkeys: Firm[] = [];
  const serfs: Firm[] = [];
  const suspects: Firm[] = [];

  for (const firm of firms) {
    const c = classifications.get(firm.id);
    if (!c) continue;
    switch (c.tier) {
      case "Gorilla":           gorillas.push(firm); break;
      case "Potential Gorilla": prospects.push(firm); break;
      case "King":              kings.push(firm); break;
      case "Prince":            princes.push(firm); break;
      case "Chimpanzee":        chimps.push(firm); break;
      case "Monkey":            monkeys.push(firm); break;
      case "Serf":              serfs.push(firm); break;
      case "In Chasm":          suspects.push(firm); break;
    }
  }

  [gorillas, prospects, kings, princes, chimps, monkeys, serfs, suspects].forEach((arr) => arr.sort(byScore));

  const buyFirms = [...gorillas, ...prospects];
  const watchFirms = [...kings, ...princes];
  const exitFirms = [...chimps, ...monkeys, ...serfs];

  const stages = [
    {
      key: "buy",
      emoji: "🟢",
      number: "①",
      title: t("buyTitle"),
      desc: t("buyDesc"),
      bg: "bg-emerald-50/50",
      ring: "ring-emerald-200",
      accent: "text-emerald-700",
      firms: buyFirms,
    },
    {
      key: "watch",
      emoji: "🔵",
      number: "②",
      title: t("watchTitle"),
      desc: t("watchDesc"),
      bg: "bg-blue-50/50",
      ring: "ring-blue-200",
      accent: "text-[#0064FF]",
      firms: watchFirms,
    },
    {
      key: "exit",
      emoji: "🟠",
      number: "③",
      title: t("exitTitle"),
      desc: t("exitDesc"),
      bg: "bg-orange-50/40",
      ring: "ring-orange-200",
      accent: "text-orange-600",
      firms: exitFirms,
    },
    {
      key: "avoid",
      emoji: "🔴",
      number: "④",
      title: t("avoidTitle"),
      desc: t("avoidDesc"),
      bg: "bg-red-50/40",
      ring: "ring-red-200",
      accent: "text-red-500",
      firms: suspects,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Pipeline header */}
      <div>
        <h2 className="mb-1">{t("title")}</h2>
        <p className="text-sm text-gray-400 font-medium">{t("subtitle")}</p>
      </div>

      {/* Flow indicator */}
      <div className="flex items-center gap-1 text-xs font-bold">
        {stages.map((s, i) => (
          <div key={s.key} className="flex items-center gap-1 flex-1 min-w-0">
            <span className={`truncate ${s.accent} font-extrabold`}>
              {s.number} {s.title.split("—")[0].trim()}
            </span>
            <span className="text-xs font-extrabold text-gray-300 bg-gray-100 rounded-full px-1.5 py-0.5 shrink-0">
              {s.firms.length}
            </span>
            {i < stages.length - 1 && <span className="text-gray-200 shrink-0 mx-1">→</span>}
          </div>
        ))}
      </div>

      {/* Stage cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stages.map((stage) => (
          <div key={stage.key} className={`rounded-2xl p-4 ${stage.bg} ring-1 ${stage.ring}`}>
            {/* Stage header */}
            <div className="flex items-start gap-2.5 mb-4">
              <span className="text-lg">{stage.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-extrabold text-sm ${stage.accent}`}>{stage.number} {stage.title}</span>
                  <span className="text-xs font-bold text-gray-400 bg-white/80 rounded-full px-2 py-0.5 shrink-0">
                    {stage.firms.length}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{stage.desc}</p>
              </div>
            </div>

            {/* Firm list */}
            <div className="space-y-1.5">
              {stage.firms.slice(0, 10).map((f) => (
                <FirmRow
                  key={f.id}
                  firm={f}
                  classification={classifications.get(f.id)!}
                  news={newsMap.get(f.id)}
                />
              ))}
              {stage.firms.length > 10 && (
                <Link href="/firms">
                  <div className="text-center text-xs text-gray-400 font-bold py-2 hover:text-[#0064FF] transition-colors cursor-pointer">
                    +{stage.firms.length - 10} {t("more")} →
                  </div>
                </Link>
              )}
              {stage.firms.length === 0 && (
                <div className="text-center text-xs text-gray-300 py-4">—</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
