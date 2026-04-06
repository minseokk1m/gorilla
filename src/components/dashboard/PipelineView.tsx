import { getTranslations } from "next-intl/server";
import type { Firm } from "@/types/firm";
import type { ClassificationResult, MarketPhase } from "@/types/classification";
import type { NewsArticle } from "@/types/news";
import { Link } from "@/i18n/routing";
import SignalBadge from "@/components/firms/SignalBadge";

interface PipelineViewProps {
  locale: string;
  firms: Firm[];
  classifications: Map<string, ClassificationResult>;
  newsMap: Map<string, NewsArticle>;
}

const TALC_ORDER: MarketPhase[] = [
  "Bowling Alley",
  "Tornado",
  "Main Street",
  "End of Life",
  "Early Market",
];

const PHASE_INFO: Record<MarketPhase, { emoji: string }> = {
  "Early Market":  { emoji: "🌱" },
  "Bowling Alley": { emoji: "🎳" },
  "Tornado":       { emoji: "🌪️" },
  "Main Street":   { emoji: "🏙️" },
  "End of Life":   { emoji: "📉" },
};

function FirmCard({
  firm,
  classification,
  news,
}: {
  firm: Firm;
  classification: ClassificationResult;
  news?: NewsArticle;
}) {
  const phase = PHASE_INFO[classification.marketPhase];
  const nrr = Math.round(firm.classificationSignals.netRevenueRetention * 100);
  const rev = Math.round(firm.revenueGrowthYoY * 100);

  return (
    <Link href={`/firms/${firm.slug}`}>
      <div className="toss-card-interactive !p-3.5 !rounded-xl cursor-pointer space-y-1.5">
        <div className="flex items-start justify-between gap-1">
          <div className="min-w-0">
            <span className="font-extrabold text-gray-900 text-sm">{firm.ticker}</span>
            <span className="text-gray-400 text-xs ml-1.5 truncate hidden sm:inline">{firm.name}</span>
          </div>
          <span title={classification.marketPhase} className="text-sm leading-none shrink-0">
            {phase.emoji}
          </span>
        </div>
        <div className="text-xs font-medium text-gray-400 truncate">{firm.sector}</div>
        <div className="flex items-center gap-2">
          <SignalBadge signal={classification.signal} size="sm" />
          <span className="text-xs font-bold text-gray-400">{classification.totalScore}</span>
        </div>
        <div className="flex gap-2 text-xs font-bold text-gray-500">
          <span>+{rev}%</span>
          <span className="text-gray-200">·</span>
          <span>NRR {nrr}%</span>
        </div>
        {news && (
          <p className="text-xs text-gray-400 leading-snug line-clamp-2 pt-1.5 border-t border-gray-100">
            {news.title}
          </p>
        )}
      </div>
    </Link>
  );
}

function SectionHeader({
  emoji,
  title,
  desc,
  count,
}: {
  emoji: string;
  title: string;
  desc: string;
  count: number;
}) {
  return (
    <div className="flex items-start gap-2.5 mb-4">
      <span className="text-lg leading-tight">{emoji}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900 text-sm">{title}</span>
          <span className="text-xs font-bold text-gray-400 bg-gray-100 rounded-full px-2.5 py-0.5 shrink-0">
            {count}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

export default async function PipelineView({
  locale,
  firms,
  classifications,
  newsMap,
}: PipelineViewProps) {
  const t = await getTranslations({ locale, namespace: "pipeline" });
  const tPhases = await getTranslations({ locale, namespace: "marketPhases" });

  const byScore = (a: Firm, b: Firm) =>
    (classifications.get(b.id)?.totalScore ?? 0) - (classifications.get(a.id)?.totalScore ?? 0);

  const suspects: Firm[] = [];
  const prospects: Firm[] = [];
  const gorillas: Firm[] = [];
  const kings: Firm[] = [];
  const princes: Firm[] = [];
  const chimps: Firm[] = [];
  const monkeys: Firm[] = [];
  const serfs: Firm[] = [];

  for (const firm of firms) {
    const c = classifications.get(firm.id);
    if (!c) continue;
    switch (c.tier) {
      case "In Chasm":          suspects.push(firm); break;
      case "Potential Gorilla": prospects.push(firm); break;
      case "Gorilla":           gorillas.push(firm); break;
      case "King":              kings.push(firm); break;
      case "Prince":            princes.push(firm); break;
      case "Serf":              serfs.push(firm); break;
      case "Chimpanzee":        chimps.push(firm); break;
      case "Monkey":            monkeys.push(firm); break;
    }
  }

  [suspects, prospects, gorillas, kings, princes, chimps, monkeys, serfs].forEach((arr) => arr.sort(byScore));

  // Group gorillas by TALC phase
  const gorillasByPhase = new Map<MarketPhase, Firm[]>();
  for (const f of gorillas) {
    const phase = classifications.get(f.id)!.marketPhase;
    if (!gorillasByPhase.has(phase)) gorillasByPhase.set(phase, []);
    gorillasByPhase.get(phase)!.push(f);
  }

  const exitFirms = [...chimps, ...monkeys, ...serfs];

  return (
    <div className="space-y-8">
      {/* Pipeline header */}
      <div>
        <h2 className="mb-1">{t("title")}</h2>
        <p className="text-sm text-gray-400 font-medium">{t("subtitle")}</p>
      </div>

      {/* Main pipeline: 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Stage 1: Suspects (In Chasm) */}
        <div className="toss-card !bg-red-50/40">
          <SectionHeader
            emoji="🕳️"
            title={t("suspectsTitle")}
            desc={t("suspectsDesc")}
            count={suspects.length}
          />
          <div className="space-y-2.5">
            {suspects.map((f) => (
              <FirmCard
                key={f.id}
                firm={f}
                classification={classifications.get(f.id)!}
                news={newsMap.get(f.id)}
              />
            ))}
          </div>
        </div>

        {/* Stage 2: Prospects (Potential Gorillas) */}
        <div className="toss-card !bg-teal-50/40">
          <SectionHeader
            emoji="🦍"
            title={t("prospectsTitle")}
            desc={t("prospectsDesc")}
            count={prospects.length}
          />
          <div className="space-y-2.5">
            {prospects.map((f) => (
              <FirmCard
                key={f.id}
                firm={f}
                classification={classifications.get(f.id)!}
                news={newsMap.get(f.id)}
              />
            ))}
          </div>
        </div>

        {/* Stage 3: Confirmed Gorillas by TALC phase */}
        <div className="toss-card !bg-emerald-50/40">
          <SectionHeader
            emoji="🦍"
            title={t("gorillasTitle")}
            desc={t("gorillasDesc")}
            count={gorillas.length}
          />
          <div className="space-y-4">
            {TALC_ORDER.filter((phase) => gorillasByPhase.has(phase)).map((phase) => (
              <div key={phase}>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-xs">{PHASE_INFO[phase].emoji}</span>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{tPhases(phase)}</span>
                </div>
                <div className="space-y-2.5">
                  {gorillasByPhase.get(phase)!.map((f) => (
                    <FirmCard
                      key={f.id}
                      firm={f}
                      classification={classifications.get(f.id)!}
                      news={newsMap.get(f.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
            {gorillas.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-4">—</p>
            )}
          </div>
        </div>
      </div>

      {/* Kings & Princes watch list */}
      <div>
        <SectionHeader
          emoji="👑"
          title={t("watchTitle")}
          desc={t("watchDesc")}
          count={kings.length + princes.length}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {[...kings, ...princes].map((f) => (
            <FirmCard
              key={f.id}
              firm={f}
              classification={classifications.get(f.id)!}
              news={newsMap.get(f.id)}
            />
          ))}
        </div>
      </div>

      {/* Exit candidates */}
      <div>
        <SectionHeader
          emoji="⚠️"
          title={t("exitTitle")}
          desc={t("exitDesc")}
          count={exitFirms.length}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {exitFirms.map((f) => (
            <FirmCard
              key={f.id}
              firm={f}
              classification={classifications.get(f.id)!}
              news={newsMap.get(f.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
