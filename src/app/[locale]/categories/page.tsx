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
const CATEGORIES = [
  // ── Tech ──
  {
    id: "ai-compute",
    name: "AI / GPU 가속 컴퓨팅",
    nameEn: "AI / GPU Accelerated Computing",
    description: "AI 훈련·추론을 위한 GPU, 가속기, CUDA 생태계",
    icon: "🧠",
    firmFilter: (f: Firm) => ["nvda", "amd", "intc", "avgo", "mu"].includes(f.id) || f.sector === "AI/ML Platform",
  },
  {
    id: "semiconductor-chain",
    name: "반도체 밸류체인",
    nameEn: "Semiconductor Value Chain",
    description: "파운드리, 장비, 칩 설계 IP, 소재 — 반도체 생산의 핵심 인프라",
    icon: "⚡",
    firmFilter: (f: Firm) => ["asml", "tsm", "arm", "lrcx", "amat", "tsem", "simo", "axti"].includes(f.id) || f.sector === "Semiconductor Equipment" || f.sector === "Foundry" || f.sector === "Chip Architecture/IP" || f.sector === "EDA & Semiconductor Tools",
  },
  {
    id: "optical-photonics",
    name: "광학 / 포토닉스",
    nameEn: "Optical & Photonics",
    description: "광트랜시버, 레이저, 광섬유 — AI 데이터센터 네트워킹 인프라",
    icon: "💡",
    firmFilter: (f: Firm) => f.sector === "Optical & Photonics",
  },
  {
    id: "data-storage",
    name: "데이터 스토리지",
    nameEn: "Data Storage",
    description: "HDD, SSD, NAND 플래시 — 데이터 저장 인프라",
    icon: "💾",
    firmFilter: (f: Firm) => f.sector === "Data Storage",
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
    firmFilter: (f: Firm) => f.sector === "Enterprise Software",
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
    id: "consumer-platform",
    name: "소비자 플랫폼 / 핀테크",
    nameEn: "Consumer Platforms / Fintech",
    description: "소비자향 기술, 이커머스, 스트리밍, 핀테크",
    icon: "📲",
    firmFilter: (f: Firm) => ["amzn", "aapl", "nflx", "tsla"].includes(f.id) || f.sector === "Consumer Tech" || f.sector === "Fintech" || f.sector === "E-Commerce",
  },
  // ── Non-Tech ──
  {
    id: "defense-aerospace",
    name: "방위산업 / 우주항공",
    nameEn: "Defense & Aerospace",
    description: "방위 계약, 전투 시스템, 우주 발사, 위성 — 국가 안보 인프라",
    icon: "🛡️",
    firmFilter: (f: Firm) => f.sector === "Defense & Aerospace" || f.sector === "Space Technology",
  },
  {
    id: "energy-infra",
    name: "에너지 / 인프라",
    nameEn: "Energy & Infrastructure",
    description: "발전 설비, 데이터센터 전력, 재생에너지, 원자력, 전력망",
    icon: "⚡",
    firmFilter: (f: Firm) => f.sector === "Energy Infrastructure" || f.sector === "Renewable Energy" || f.sector === "Nuclear Energy",
  },
  {
    id: "oil-gas",
    name: "석유 / 가스",
    nameEn: "Oil & Gas",
    description: "탐사, 생산, 정제, 운송 — 전통 에너지 밸류체인",
    icon: "🛢️",
    firmFilter: (f: Firm) => f.sector === "Oil & Gas",
  },
  {
    id: "crypto-digital",
    name: "크립토 / 디지털 자산",
    nameEn: "Crypto & Digital Assets",
    description: "거래소, 스테이블코인, 디지털 자산 인프라",
    icon: "🔗",
    firmFilter: (f: Firm) => f.sector === "Crypto & Digital Assets",
  },
  {
    id: "finance-payments",
    name: "금융 / 결제",
    nameEn: "Finance & Payments",
    description: "글로벌 결제 네트워크, 투자은행, 보험",
    icon: "💳",
    firmFilter: (f: Firm) => f.sector === "Financial Services" || f.sector === "Payment Processing",
  },
  {
    id: "healthcare-pharma",
    name: "헬스케어 / 제약",
    nameEn: "Healthcare & Pharma",
    description: "신약 개발, 의료서비스, 보험 — 생명과학 밸류체인",
    icon: "💊",
    firmFilter: (f: Firm) => f.sector === "Pharmaceuticals" || f.sector === "Healthcare Services",
  },
  {
    id: "industrial",
    name: "산업재 / 소재",
    nameEn: "Industrials & Materials",
    description: "중장비, 산업용 가스, 특수 소재, 건설 장비",
    icon: "🏗️",
    firmFilter: (f: Firm) => f.sector === "Industrial Manufacturing" || f.sector === "Materials & Specialty",
  },
  {
    id: "telecom",
    name: "통신",
    nameEn: "Telecommunications",
    description: "무선 통신, 광네트워크, 위성 통신",
    icon: "📡",
    firmFilter: (f: Firm) => f.sector === "Telecommunications" || f.sector === "Networking",
  },
  {
    id: "retail-consumer",
    name: "유통 / 소비재",
    nameEn: "Retail & Consumer Goods",
    description: "대형 유통, 소비재, 음료, 생활용품",
    icon: "🛒",
    firmFilter: (f: Firm) => f.sector === "Retail & Consumer",
  },
];

const PHASE_ORDER: MarketPhase[] = [
  "Early Market",
  "Bowling Alley",
  "Tornado",
  "Thriving Main Street",
  "Maturing Main Street",
  "Declining Main Street",
  "Fault Line",
  "End of Life",
];
const PHASE_STYLES: Record<MarketPhase, { bg: string; text: string; border: string }> = {
  "Early Market":           { bg: "bg-gray-50",       text: "text-gray-600",    border: "border-gray-200" },
  "Bowling Alley":          { bg: "bg-yellow-50/60",  text: "text-yellow-700",  border: "border-yellow-200" },
  "Tornado":                { bg: "bg-emerald-50/60", text: "text-emerald-700", border: "border-emerald-200" },
  "Thriving Main Street":   { bg: "bg-blue-50/60",    text: "text-[#0064FF]",   border: "border-blue-200" },
  "Maturing Main Street":   { bg: "bg-blue-50/40",    text: "text-blue-600",    border: "border-blue-200" },
  "Declining Main Street":  { bg: "bg-amber-50/60",   text: "text-amber-700",   border: "border-amber-200" },
  "Fault Line":             { bg: "bg-red-50/60",     text: "text-red-600",     border: "border-red-200" },
  "End of Life":            { bg: "bg-gray-50/40",    text: "text-gray-500",    border: "border-gray-200" },
};
const PHASE_EMOJI: Record<MarketPhase, string> = {
  "Early Market": "🌱",
  "Bowling Alley": "🎳",
  "Tornado": "🌪️",
  "Thriving Main Street": "🌿",
  "Maturing Main Street": "🏙️",
  "Declining Main Street": "🍂",
  "Fault Line": "⚡",
  "End of Life": "📉",
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
          각 섹터 카테고리가 기술 수용 주기(TALC)의 어느 단계에 있는지, 그리고 해당 카테고리 내 기업들의 고릴라/침프/원숭이 분류를 한눈에 파악합니다. 테크부터 방산·에너지·금융·헬스케어까지, 모든 섹터에서 고릴라를 찾습니다.
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
        {CATEGORIES.map((cat) => {
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
          const dominantPhase = phaseCounts.sort((a, b) => b.count - a.count)[0]?.phase ?? "Maturing Main Street";

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
