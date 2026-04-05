import { getAllFirms, getAllClassifications } from "@/lib/data/providers/firm-provider";
import { getLatestNews } from "@/lib/data/providers/news-provider";
import MarketSummaryBar from "@/components/dashboard/MarketSummaryBar";
import TALCChart from "@/components/dashboard/TALCChart";
import PipelineView from "@/components/dashboard/PipelineView";
import type { ClassificationResult, MarketPhase } from "@/types/classification";
import type { NewsArticle } from "@/types/news";
import type { Firm } from "@/types/firm";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { getSupabase } from "@/lib/supabase/admin";

/* ── Category definitions (same as categories page) ── */
const CATEGORIES = [
  { id: "ai-compute", name: "AI / GPU 가속", icon: "🧠", filter: (f: Firm) => ["nvda", "amd", "intc"].includes(f.id) || f.sector === "AI/ML Platform" },
  { id: "semi-chain", name: "반도체 밸류체인", icon: "⚡", filter: (f: Firm) => ["asml", "tsm", "arm"].includes(f.id) },
  { id: "cloud", name: "클라우드", icon: "☁️", filter: (f: Firm) => f.sector === "Cloud Infrastructure" },
  { id: "enterprise", name: "엔터프라이즈", icon: "🏢", filter: (f: Firm) => f.sector === "Enterprise Software" && ["crm", "now", "wday", "orcl", "sap", "hubs"].includes(f.id) },
  { id: "security", name: "보안", icon: "🔒", filter: (f: Firm) => f.sector === "Cybersecurity" },
  { id: "ads-social", name: "광고/소셜", icon: "📱", filter: (f: Firm) => ["googl", "meta", "ttd"].includes(f.id) },
  { id: "dev-data", name: "개발/데이터", icon: "🛠️", filter: (f: Firm) => f.sector === "Developer Tools" || f.sector === "Data & Analytics" },
];

const PHASE_COLORS: Record<MarketPhase, string> = {
  "Early Market": "text-gray-500",
  "Bowling Alley": "text-yellow-600",
  "Tornado": "text-emerald-600",
  "Main Street": "text-[#0064FF]",
  "End of Life": "text-red-500",
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dashboard" });

  const [firms, classificationsMap, allNews] = await Promise.all([
    getAllFirms(),
    getAllClassifications(locale),
    getLatestNews(200),
  ]);

  const classificationsList = Array.from(classificationsMap.values()) as ClassificationResult[];

  const newsMap = new Map<string, NewsArticle>();
  for (const article of allNews) {
    if (!newsMap.has(article.firmId)) {
      newsMap.set(article.firmId, article);
    }
  }

  // Fetch discussion activity counts
  let openProposals = 0;
  let totalComments = 0;
  try {
    const supabase = getSupabase();
    const [pRes, cRes] = await Promise.all([
      supabase.from("signal_proposals").select("id", { count: "exact", head: true }).eq("status", "open"),
      supabase.from("discussions").select("id", { count: "exact", head: true }),
    ]);
    openProposals = pRes.count ?? 0;
    totalComments = cRes.count ?? 0;
  } catch {}

  // Category summary
  const categorySummary = CATEGORIES.map((cat) => {
    const catFirms = firms.filter(cat.filter);
    const gorillas = catFirms.filter((f) => classificationsMap.get(f.id)?.tier === "Gorilla").length;
    // Dominant phase
    const phases = catFirms.map((f) => classificationsMap.get(f.id)?.marketPhase).filter(Boolean) as MarketPhase[];
    const phaseCounts = new Map<MarketPhase, number>();
    phases.forEach((p) => phaseCounts.set(p, (phaseCounts.get(p) ?? 0) + 1));
    const dominant = [...phaseCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Main Street";
    return { ...cat, total: catFirms.length, gorillas, dominant };
  });

  return (
    <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Framework v1.0 Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="mb-0">{t("title")}</h1>
          <span className="toss-pill bg-[#0064FF] text-white text-[10px]">Framework v1.0</span>
        </div>
        <p className="text-gray-500 max-w-2xl text-[0.9375rem] leading-relaxed">{t("subtitle")}</p>
      </div>

      <MarketSummaryBar classifications={classificationsList} />

      {/* ── Quick Navigation: Framework Pillars ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link href="/categories">
          <div className="toss-card-interactive !p-4 text-center">
            <div className="text-2xl mb-1">🗺️</div>
            <div className="text-sm font-extrabold text-gray-900">카테고리 TALC</div>
            <div className="text-xs text-gray-400 font-medium mt-0.5">{CATEGORIES.length}개 카테고리 · {categorySummary.reduce((s, c) => s + c.gorillas, 0)} 고릴라</div>
          </div>
        </Link>
        <Link href="/firms">
          <div className="toss-card-interactive !p-4 text-center">
            <div className="text-2xl mb-1">🦍</div>
            <div className="text-sm font-extrabold text-gray-900">전체 기업 분류</div>
            <div className="text-xs text-gray-400 font-medium mt-0.5">{firms.length}개 기업 · 7차원 점수</div>
          </div>
        </Link>
        <Link href="/discuss">
          <div className="toss-card-interactive !p-4 text-center">
            <div className="text-2xl mb-1">💬</div>
            <div className="text-sm font-extrabold text-gray-900">토론 게시판</div>
            <div className="text-xs text-gray-400 font-medium mt-0.5">
              {openProposals > 0 ? `${openProposals}건 제안 진행 중` : "합의 기반 편집"}
              {totalComments > 0 && ` · ${totalComments} 댓글`}
            </div>
          </div>
        </Link>
        <Link href="/learn">
          <div className="toss-card-interactive !p-4 text-center">
            <div className="text-2xl mb-1">📖</div>
            <div className="text-sm font-extrabold text-gray-900">10대 원칙 & 학습</div>
            <div className="text-xs text-gray-400 font-medium mt-0.5">GG 원칙 · 멤버 주석</div>
          </div>
        </Link>
      </div>

      {/* ── Category Overview Strip ── */}
      <section className="toss-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="!text-base mb-0">카테고리별 현황</h2>
          <Link href="/categories" className="text-xs font-bold text-[#0064FF] hover:underline">자세히 →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {categorySummary.map((cat) => (
            <Link key={cat.id} href="/categories">
              <div className="rounded-xl bg-gray-50 hover:bg-[#E8F0FE]/50 transition-colors p-3 text-center cursor-pointer">
                <div className="text-lg mb-0.5">{cat.icon}</div>
                <div className="text-xs font-bold text-gray-900 mb-1 truncate">{cat.name}</div>
                <div className={`text-[10px] font-extrabold ${PHASE_COLORS[cat.dominant]}`}>{cat.dominant}</div>
                {cat.gorillas > 0 && (
                  <div className="text-[10px] font-bold text-emerald-600 mt-0.5">🦍 {cat.gorillas}</div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TALC Curve */}
      <section className="toss-card">
        <TALCChart
          firms={firms}
          classifications={Object.fromEntries(classificationsMap)}
          newsMap={Object.fromEntries(newsMap)}
        />
      </section>

      {/* Pipeline */}
      <PipelineView
        locale={locale}
        firms={firms}
        classifications={classificationsMap}
        newsMap={newsMap}
      />

      <div className="text-center py-6">
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 text-[#0064FF] hover:underline font-bold text-[0.9375rem]"
        >
          {t("learnMore")}
        </Link>
      </div>
    </main>
  );
}
