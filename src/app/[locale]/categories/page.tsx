import { getAllFirms, getAllClassifications } from "@/lib/data/providers/firm-provider";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import type { Firm } from "@/types/firm";
import type { ClassificationResult, MarketPhase } from "@/types/classification";

/**
 * Technology categories for TALC mapping.
 * Each category groups related sectors into a meaningful "habitat"
 * that can be analyzed as a unit on the TALC curve.
 */
const TECH_CATEGORIES = [
  {
    id: "ai-compute",
    name: "AI / GPU 가속 컴퓨팅",
    nameEn: "AI / GPU Accelerated Computing",
    description: "AI 훈련·추론을 위한 GPU, 가속기, CUDA 생태계",
    icon: "🧠",
    firmFilter: (f: Firm) => ["nvda", "amd", "intc"].includes(f.id) || f.sector === "AI/ML Platform",
  },
  {
    id: "semiconductor-chain",
    name: "반도체 밸류체인",
    nameEn: "Semiconductor Value Chain",
    description: "파운드리, 장비, 칩 설계 IP — 반도체 생산의 핵심 인프라",
    icon: "⚡",
    firmFilter: (f: Firm) => ["asml", "tsm", "arm"].includes(f.id),
  },
  {
    id: "cloud-infra",
    name: "클라우드 인프라",
    nameEn: "Cloud Infrastructure",
    description: "IaaS/PaaS 플랫폼, 클라우드 컴퓨팅 인프라",
    icon: "☁️",
    firmFilter: (f: Firm) => f.sector === "Cloud Infrastructure",
  },
  {
    id: "enterprise-platform",
    name: "엔터프라이즈 플랫폼",
    nameEn: "Enterprise Platforms",
    description: "CRM, ITSM, HCM, ERP 등 기업용 핵심 플랫폼 소프트웨어",
    icon: "🏢",
    firmFilter: (f: Firm) => f.sector === "Enterprise Software" && ["crm", "now", "wday", "orcl", "sap", "hubs"].includes(f.id),
  },
  {
    id: "cybersecurity",
    name: "사이버보안",
    nameEn: "Cybersecurity",
    description: "엔드포인트 보안, 네트워크 보안, ID 관리",
    icon: "🔒",
    firmFilter: (f: Firm) => f.sector === "Cybersecurity",
  },
  {
    id: "digital-ads-social",
    name: "디지털 광고 / 소셜",
    nameEn: "Digital Advertising / Social",
    description: "검색, 소셜 네트워크, 디지털 광고 플랫폼",
    icon: "📱",
    firmFilter: (f: Firm) => ["googl", "meta", "ttd"].includes(f.id) || f.sector === "Digital Advertising" || f.sector === "Social Media",
  },
  {
    id: "dev-data",
    name: "개발자 도구 / 데이터",
    nameEn: "Developer Tools / Data",
    description: "관측성, 데이터 플랫폼, CI/CD, 개발자 인프라",
    icon: "🛠️",
    firmFilter: (f: Firm) => f.sector === "Developer Tools" || f.sector === "Data & Analytics",
  },
  {
    id: "ecommerce-consumer",
    name: "이커머스 / 소비자",
    nameEn: "E-Commerce / Consumer",
    description: "온라인 쇼핑, 소비자향 기술, 핀테크",
    icon: "🛒",
    firmFilter: (f: Firm) => ["amzn"].includes(f.id) || f.sector === "Consumer Tech" || f.sector === "Fintech" || f.sector === "E-Commerce",
  },
];

const PHASE_ORDER: MarketPhase[] = ["Early Market", "Bowling Alley", "Tornado", "Main Street", "End of Life"];
const PHASE_STYLES: Record<MarketPhase, { bg: string; text: string; border: string }> = {
  "Early Market":  { bg: "bg-gray-50",      text: "text-gray-600",    border: "border-gray-200" },
  "Bowling Alley": { bg: "bg-yellow-50/60", text: "text-yellow-700",  border: "border-yellow-200" },
  "Tornado":       { bg: "bg-emerald-50/60", text: "text-emerald-700", border: "border-emerald-200" },
  "Main Street":   { bg: "bg-blue-50/60",   text: "text-[#0064FF]",  border: "border-blue-200" },
  "End of Life":   { bg: "bg-red-50/60",    text: "text-red-600",    border: "border-red-200" },
};
const PHASE_EMOJI: Record<MarketPhase, string> = {
  "Early Market": "🌱", "Bowling Alley": "🎳", "Tornado": "🌪️", "Main Street": "🏙️", "End of Life": "📉",
};

const TIER_COLORS: Record<string, string> = {
  Gorilla: "bg-emerald-100 text-emerald-700",
  "Potential Gorilla": "bg-teal-100 text-teal-700",
  King: "bg-blue-100 text-[#0064FF]",
  Prince: "bg-indigo-100 text-indigo-600",
  Serf: "bg-stone-100 text-stone-600",
  Chimpanzee: "bg-yellow-100 text-yellow-700",
  Monkey: "bg-orange-100 text-orange-700",
  "In Chasm": "bg-red-100 text-red-600",
};

export default async function CategoriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [firms, classifications] = await Promise.all([
    getAllFirms(),
    getAllClassifications(locale),
  ]);

  return (
    <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 space-y-10">
      <div>
        <h1 className="mb-2">카테고리별 TALC 매핑</h1>
        <p className="text-gray-500 text-[0.9375rem] leading-relaxed max-w-3xl">
          각 기술 카테고리가 기술 수용 주기(TALC)의 어느 단계에 있는지, 그리고 해당 카테고리 내 기업들의 고릴라/침프/원숭이 분류를 한눈에 파악합니다.
        </p>
      </div>

      {/* TALC Phase Legend */}
      <div className="flex flex-wrap gap-2">
        {PHASE_ORDER.map((phase) => (
          <span key={phase} className={`toss-pill ${PHASE_STYLES[phase].bg} ${PHASE_STYLES[phase].text} border ${PHASE_STYLES[phase].border}`}>
            {PHASE_EMOJI[phase]} {phase}
          </span>
        ))}
      </div>

      {/* Category Cards */}
      <div className="space-y-6">
        {TECH_CATEGORIES.map((cat) => {
          const catFirms = firms.filter(cat.firmFilter);
          if (catFirms.length === 0) return null;

          // Group firms by TALC phase
          const byPhase = new Map<MarketPhase, { firm: Firm; cls: ClassificationResult }[]>();
          PHASE_ORDER.forEach((p) => byPhase.set(p, []));

          for (const firm of catFirms) {
            const cls = classifications.get(firm.id);
            if (!cls) continue;
            byPhase.get(cls.marketPhase)?.push({ firm, cls });
          }

          // Sort each phase by score desc
          for (const arr of byPhase.values()) {
            arr.sort((a, b) => b.cls.totalScore - a.cls.totalScore);
          }

          // Determine dominant phase
          const phaseCounts = PHASE_ORDER.map((p) => ({ phase: p, count: byPhase.get(p)!.length }));
          const dominantPhase = phaseCounts.sort((a, b) => b.count - a.count)[0]?.phase ?? "Main Street";

          // Count gorillas
          const gorillaCount = catFirms.filter((f) => classifications.get(f.id)?.tier === "Gorilla").length;

          return (
            <div key={cat.id} className="toss-card">
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl sm:text-2xl">{cat.icon}</span>
                  <div>
                    <h2 className="!text-base sm:!text-lg mb-0.5">{locale === "ko" ? cat.name : cat.nameEn}</h2>
                    <p className="text-xs text-gray-400 font-medium hidden sm:block">{cat.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`toss-pill text-[10px] sm:text-xs ${PHASE_STYLES[dominantPhase].bg} ${PHASE_STYLES[dominantPhase].text}`}>
                    {PHASE_EMOJI[dominantPhase]} {dominantPhase}
                  </span>
                  {gorillaCount > 0 && (
                    <span className="toss-pill text-[10px] sm:text-xs bg-emerald-50 text-emerald-700">🦍 {gorillaCount}</span>
                  )}
                </div>
              </div>

              {/* TALC Phase Timeline — scrollable on mobile */}
              <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2 min-w-[500px] sm:min-w-0">
                {PHASE_ORDER.map((phase) => {
                  const items = byPhase.get(phase)!;
                  const isActive = items.length > 0;

                  return (
                    <div
                      key={phase}
                      className={`rounded-xl p-2 sm:p-3 min-h-[60px] sm:min-h-[80px] transition-all ${
                        isActive
                          ? `${PHASE_STYLES[phase].bg} border ${PHASE_STYLES[phase].border}`
                          : "bg-gray-50/50 border border-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-1 mb-1.5">
                        <span className="text-[10px] sm:text-xs">{PHASE_EMOJI[phase]}</span>
                        <span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-wide ${isActive ? PHASE_STYLES[phase].text : "text-gray-300"}`}>
                          {phase}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {items.map(({ firm, cls }) => (
                          <Link key={firm.id} href={`/firms/${firm.slug}`}>
                            <div className="flex items-center gap-1 sm:gap-1.5 bg-white rounded-lg px-1.5 sm:px-2 py-1 sm:py-1.5 hover:shadow-sm transition-all cursor-pointer">
                              <span className="font-extrabold text-gray-900 text-[10px] sm:text-xs">{firm.ticker}</span>
                              <span className={`toss-pill !px-1 sm:!px-1.5 !py-0 text-[8px] sm:text-[9px] ${TIER_COLORS[cls.tier] ?? ""}`}>
                                {cls.tier === "Gorilla" ? "🦍" : cls.tier === "Potential Gorilla" ? "🦍?" : cls.tier === "King" ? "👑" : cls.tier === "Prince" ? "🤴" : cls.tier === "Serf" ? "⛏️" : cls.tier === "Chimpanzee" ? "🐵" : cls.tier === "Monkey" ? "🐒" : "🕳️"}
                              </span>
                              <span className="text-[8px] sm:text-[10px] font-bold text-gray-400 ml-auto hidden sm:block">{cls.totalScore}</span>
                            </div>
                          </Link>
                        ))}
                        {items.length === 0 && (
                          <span className="text-[10px] text-gray-300">—</span>
                        )}
                      </div>
                    </div>
                  );
                })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
