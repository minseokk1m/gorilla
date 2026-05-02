import { getAllFirms, getAllClassifications } from "@/lib/data/providers/firm-provider";
import type { ClassificationResult, ClassificationTier, Signal } from "@/types/classification";
import type { Firm } from "@/types/firm";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { getSupabase } from "@/lib/supabase/admin";
import TALCPhaseView from "@/components/dashboard/TALCPhaseView";
import DashboardSearch from "@/components/dashboard/DashboardSearch";
import { FIRM_NAMES_KO } from "@/lib/data/mock/firm-names-ko";
import { detectMooreConflicts } from "@/lib/data/providers/ecosystem-provider";
import { getHotColdLayers } from "@/lib/data/providers/layer-momentum";
import { findEcosystem } from "@/lib/data/mock/ecosystems";
import { getGroupedSellCandidates } from "@/lib/data/providers/sell-signal-engine";
import { getFunnelCounts, getFirmsAtStage } from "@/lib/data/providers/funnel-engine";
import { getTopSentimentDrivenFirms } from "@/lib/data/providers/sentiment-driven-engine";
import { getSubstitutionPaths } from "@/lib/data/providers/product-category-provider";
import { PHASE_BADGE, phaseLabel } from "@/components/ecosystems/category-style";
import type { EcosystemId } from "@/types/ecosystem";
import type { FunnelStage } from "@/types/funnel";

const ECO_DOT: Record<EcosystemId, string> = {
  "ai": "bg-blue-500",
  "cybersecurity": "bg-rose-500",
  "energy-transition": "bg-emerald-500",
  "defense": "bg-slate-600",
  "korean-industrial": "bg-orange-500",
  "crypto": "bg-violet-500",
  "biotech": "bg-teal-500",
  "auto-ev-battery": "bg-yellow-500",
  "space": "bg-indigo-600",
};

/* ── Tier config — mirrors the Learn page 8-tier theory ── */
const TIERS: {
  tier: ClassificationTier;
  emoji: string;
  signal: Signal;
  dot: string;
  bg: string;
  ring: string;
  text: string;
  signalBg: string;
  signalText: string;
}[] = [
  { tier: "Gorilla",           emoji: "🦍", signal: "BUY",   dot: "bg-emerald-500", bg: "bg-emerald-50/60", ring: "ring-emerald-200", text: "text-emerald-700", signalBg: "bg-emerald-500", signalText: "text-white" },
  { tier: "Potential Gorilla", emoji: "🦍", signal: "BUY",   dot: "bg-teal-500",    bg: "bg-teal-50/60",    ring: "ring-teal-200",    text: "text-teal-700",    signalBg: "bg-teal-500",    signalText: "text-white" },
  { tier: "King",              emoji: "👑", signal: "WATCH", dot: "bg-[#0064FF]",   bg: "bg-blue-50/50",    ring: "ring-blue-200",    text: "text-[#0064FF]",   signalBg: "bg-blue-500",    signalText: "text-white" },
  { tier: "Prince",            emoji: "🤴", signal: "WATCH", dot: "bg-indigo-400",  bg: "bg-indigo-50/50",  ring: "ring-indigo-200",  text: "text-indigo-600",  signalBg: "bg-indigo-400",  signalText: "text-white" },
  { tier: "Serf",              emoji: "⛏️", signal: "AVOID", dot: "bg-stone-400",   bg: "bg-stone-50/50",   ring: "ring-stone-200",   text: "text-stone-600",   signalBg: "bg-stone-400",   signalText: "text-white" },
  { tier: "Chimpanzee",        emoji: "🐵", signal: "SELL",  dot: "bg-yellow-500",  bg: "bg-yellow-50/50",  ring: "ring-yellow-200",  text: "text-yellow-700",  signalBg: "bg-orange-500",  signalText: "text-white" },
  { tier: "Monkey",            emoji: "🐒", signal: "AVOID", dot: "bg-orange-500",  bg: "bg-orange-50/40",  ring: "ring-orange-200",  text: "text-orange-700",  signalBg: "bg-red-400",     signalText: "text-white" },
  { tier: "In Chasm",          emoji: "🕳️", signal: "AVOID", dot: "bg-red-500",     bg: "bg-red-50/40",     ring: "ring-red-200",     text: "text-red-600",     signalBg: "bg-red-500",     signalText: "text-white" },
];

const SIGNAL_LABEL: Record<Signal, string> = { BUY: "매수", WATCH: "관망", SELL: "매도", AVOID: "회피" };

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dashboard" });
  const tTiers = await getTranslations({ locale, namespace: "tiers" });

  const [firms, classificationsMap, mooreConflicts, hotCold, sellGroups, funnelCounts, holdFirms, confirmedFirms, potentialFirms, topSentimentFirms] = await Promise.all([
    getAllFirms(),
    getAllClassifications(locale),
    detectMooreConflicts(locale as "en" | "ko"),
    getHotColdLayers(3),
    getGroupedSellCandidates(),
    getFunnelCounts(),
    getFirmsAtStage("Hold"),
    getFirmsAtStage("Confirmed"),
    getFirmsAtStage("Potential"),
    getTopSentimentDrivenFirms(5),
  ]);
  const substitutionPaths = getSubstitutionPaths();
  const tEco = await getTranslations({ locale, namespace: "ecosystems" });
  const firmName = (id: string) => firms.find((f) => f.id === id)?.name ?? id;
  const firmSlug = (id: string) => firms.find((f) => f.id === id)?.slug ?? id;

  // Fetch discussion activity
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

  // Group firms by tier
  const tierGroups = new Map<ClassificationTier, { firm: Firm; cls: ClassificationResult }[]>();
  TIERS.forEach(({ tier }) => tierGroups.set(tier, []));
  for (const firm of firms) {
    const cls = classificationsMap.get(firm.id);
    if (!cls) continue;
    tierGroups.get(cls.tier)?.push({ firm, cls });
  }
  for (const arr of tierGroups.values()) {
    arr.sort((a, b) => b.cls.totalScore - a.cls.totalScore);
  }

  // Latest classification timestamp
  const latestDate = Array.from(classificationsMap.values())
    .map((c) => c.classifiedAt)
    .filter(Boolean)
    .sort()
    .pop();
  const evalDate = latestDate ? new Date(latestDate) : new Date();
  const evalDateStr = evalDate.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });

  return (
    <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* ── Header with evaluation timestamp ── */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="mb-0">{t("title")}</h1>
          <span className="toss-pill bg-[#0064FF] text-white text-[10px]">v1.0</span>
        </div>
        <p className="text-gray-500 max-w-2xl text-[0.9375rem] leading-relaxed mb-3">{t("subtitle")}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {evalDateStr} 기준 평가
          </span>
          <span className="text-gray-400 font-medium">{firms.length}개 기업 · 7차원 가중 점수 · 이중 트랙 8등급</span>
        </div>
        <div className="mt-3">
          <DashboardSearch firms={firms.map((f) => {
            const cls = classificationsMap.get(f.id);
            return { slug: f.slug, ticker: f.ticker, name: f.name, nameKo: FIRM_NAMES_KO[f.id] ?? f.nameKo, tier: cls?.tier ?? "", score: cls?.totalScore ?? 0 };
          })} />
        </div>
      </div>

      {/* ── TALC Phase View — 전체 시장 조망 (하입사이클 통합) ── */}
      <TALCPhaseView locale={locale} firms={firms} classifications={classificationsMap} />

      {/* ── Section divider: 기업 성격 분류 ── */}
      <div className="pt-4 space-y-3">
        <div>
          <h2 className="mb-1">기업 성격 분류</h2>
          <p className="text-sm text-gray-400 font-medium">
            초기 시장에서 하입사이클 과열을 타고 단기 수익을 빠르게 먹고, 캐즘을 넘긴 고릴라는 장기 매집하여 복리로 키운다. 7차원 가중 점수로 8등급을 분류하고, 매수 대상(고릴라·잠재 고릴라)을 선별합니다.
          </p>
        </div>

        {/* Tier distribution bar */}
        <div className="space-y-2">
          <div className="flex items-center gap-0.5 h-4 rounded-full overflow-hidden">
            {TIERS.map(({ tier, dot }) => {
              const count = tierGroups.get(tier)?.length ?? 0;
              if (count === 0) return null;
              return (
                <div key={tier} className={`h-full ${dot} opacity-80 rounded-sm relative group`} style={{ flex: count }}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-[9px] font-extrabold drop-shadow-sm">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-gray-500 font-bold">
            {TIERS.map(({ tier, dot }) => {
              const count = tierGroups.get(tier)?.length ?? 0;
              if (count === 0) return null;
              return (
                <span key={tier} className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-sm ${dot}`} />
                  {tTiers(`${tier}.label` as "Gorilla.label")} {count}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── BUY: Gorilla + Potential Gorilla (hero cards) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TIERS.filter((c) => c.signal === "BUY").map((config) => {
          const items = tierGroups.get(config.tier) ?? [];
          const isGorilla = config.tier === "Gorilla";
          return (
            <div
              key={config.tier}
              className={`relative rounded-2xl p-5 overflow-hidden ${
                isGorilla
                  ? "bg-gradient-to-br from-emerald-50 via-emerald-50/80 to-teal-50/60 ring-2 ring-emerald-300 shadow-lg shadow-emerald-100/50"
                  : "bg-gradient-to-br from-teal-50 via-teal-50/80 to-emerald-50/40 ring-2 ring-teal-300 shadow-md shadow-teal-100/40"
              }`}
            >
              {/* Subtle watermark */}
              <div className="absolute -right-4 -top-4 text-[100px] opacity-[0.04] leading-none select-none pointer-events-none">
                {config.emoji}
              </div>

              {/* Header */}
              <div className="flex items-center justify-between mb-2 relative">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{config.emoji}</span>
                  <div>
                    <h3 className={`font-extrabold text-base ${config.text} mb-0`}>
                      {tTiers(`${config.tier}.label` as "Gorilla.label")}
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-extrabold ${config.text}`}>{items.length}</div>
                  <span className={`inline-flex px-2.5 py-0.5 rounded-md text-[10px] font-extrabold ${config.signalBg} ${config.signalText}`}>
                    {SIGNAL_LABEL[config.signal]}
                  </span>
                </div>
              </div>

              <p className={`text-xs leading-relaxed mb-4 ${isGorilla ? "text-emerald-700/70" : "text-teal-700/70"}`}>
                {tTiers(`${config.tier}.desc` as "Gorilla.desc")}
              </p>

              {/* Firm list — 2 columns, scrollable */}
              <div className="grid grid-cols-2 gap-1.5 max-h-[320px] overflow-y-auto overscroll-contain pr-0.5" style={{ scrollbarWidth: "thin", scrollbarColor: "#d1d5db transparent" }}>
                {items.map(({ firm, cls }) => (
                  <Link key={firm.id} href={`/firms/${firm.slug}`}>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/80 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${config.dot}`} />
                      <span className="font-extrabold text-gray-900 text-sm">{firm.ticker}</span>
                      <span className={`ml-auto text-xs font-extrabold ${config.text}`}>{cls.totalScore}</span>
                    </div>
                  </Link>
                ))}
              </div>
              {items.length > 10 && (
                <div className="text-center text-[9px] text-gray-300 mt-1.5 select-none">
                  ↕ 스크롤하여 {items.length}개 전체 보기
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Other 6 tiers (compact grid) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {TIERS.filter((c) => c.signal !== "BUY").map((config) => {
          const items = tierGroups.get(config.tier) ?? [];
          return (
            <div key={config.tier} className={`rounded-2xl ${config.bg} ring-1 ${config.ring} p-3.5`}>
              {/* Tier header */}
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-base">{config.emoji}</span>
                <h3 className={`font-extrabold text-xs ${config.text} mb-0`}>
                  {tTiers(`${config.tier}.label` as "Gorilla.label")}
                </h3>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-extrabold ${config.signalBg} ${config.signalText}`}>
                  {SIGNAL_LABEL[config.signal]}
                </span>
                <span className="text-[10px] font-bold text-gray-400">{items.length}개</span>
              </div>

              <p className="text-[10px] text-gray-400 leading-relaxed mb-2.5 line-clamp-2">
                {tTiers(`${config.tier}.desc` as "Gorilla.desc")}
              </p>

              {/* Firm chips — scrollable */}
              <div className="space-y-1 max-h-[200px] overflow-y-auto overscroll-contain pr-0.5" style={{ scrollbarWidth: "thin", scrollbarColor: "#d1d5db transparent" }}>
                {items.map(({ firm, cls }) => (
                  <Link key={firm.id} href={`/firms/${firm.slug}`}>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/60 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
                      <span className="font-extrabold text-gray-900 text-[10px]">{firm.ticker}</span>
                      <span className="ml-auto text-[9px] font-bold text-gray-400">{cls.totalScore}</span>
                    </div>
                  </Link>
                ))}
                {items.length === 0 && (
                  <div className="text-center text-[9px] text-gray-300 py-1.5">해당 없음</div>
                )}
              </div>
              {items.length > 6 && (
                <div className="text-center text-[9px] text-gray-300 mt-1 select-none">
                  ↕ {items.length}개 전체
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Dual Track Explainer ── */}
      <div className="toss-card !bg-gray-50/80">
        <div className="text-center mb-4">
          <h3 className="font-extrabold text-sm text-gray-900 mb-1">이중 트랙 분류 체계</h3>
          <p className="text-xs text-gray-400">독점 아키텍처가 존재하는 시장과 개방형 시장은 서로 다른 트랙으로 분류됩니다</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Proprietary track */}
          <div className="rounded-xl bg-amber-50/60 p-4">
            <div className="text-[10px] font-extrabold text-amber-700 uppercase tracking-wide mb-3">독점 아키텍처 시장</div>
            <div className="flex items-center gap-2 flex-wrap">
              {(["Gorilla", "Potential Gorilla", "Chimpanzee", "Monkey"] as ClassificationTier[]).map((tier) => {
                const config = TIERS.find((t) => t.tier === tier)!;
                const count = tierGroups.get(tier)?.length ?? 0;
                return (
                  <span key={tier} className="inline-flex items-center gap-1 text-xs">
                    <span>{config.emoji}</span>
                    <span className={`font-bold ${config.text}`}>{tTiers(`${tier}.label` as "Gorilla.label")}</span>
                    <span className="text-gray-400 font-bold">{count}</span>
                    {tier !== "Monkey" && <span className="text-gray-300 mx-0.5">→</span>}
                  </span>
                );
              })}
            </div>
          </div>
          {/* Open track */}
          <div className="rounded-xl bg-indigo-50/60 p-4">
            <div className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wide mb-3">개방형 시장</div>
            <div className="flex items-center gap-2 flex-wrap">
              {(["King", "Prince", "Serf"] as ClassificationTier[]).map((tier) => {
                const config = TIERS.find((t) => t.tier === tier)!;
                const count = tierGroups.get(tier)?.length ?? 0;
                return (
                  <span key={tier} className="inline-flex items-center gap-1 text-xs">
                    <span>{config.emoji}</span>
                    <span className={`font-bold ${config.text}`}>{tTiers(`${tier}.label` as "Gorilla.label")}</span>
                    <span className="text-gray-400 font-bold">{count}</span>
                    {tier !== "Serf" && <span className="text-gray-300 mx-0.5">→</span>}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>


      {/* ── Investment Funnel ── */}
      <section className="toss-card">
        <div className="flex items-baseline justify-between mb-1">
          <h2 className="!text-base">{tEco("funnelTitle")}</h2>
          <span className="text-[0.6875rem] font-bold text-gray-400">
            {firms.length} → {funnelCounts.Potential} → {funnelCounts.Confirmed} → {funnelCounts.Hold}
          </span>
        </div>
        <p className="text-xs text-gray-500 leading-snug mb-4">{tEco("funnelHint")}</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {(
            [
              { stage: "Candidate" as FunnelStage, count: funnelCounts.Candidate, top: [], bg: "bg-gray-50",     ring: "ring-gray-200",     accent: "text-gray-600",   labelKey: "stageCandidate", widthClass: "w-full" },
              { stage: "Potential" as FunnelStage, count: funnelCounts.Potential, top: potentialFirms.slice(0, 3), bg: "bg-blue-50",     ring: "ring-blue-200",     accent: "text-blue-700",   labelKey: "stagePotential", widthClass: "w-[88%]" },
              { stage: "Confirmed" as FunnelStage, count: funnelCounts.Confirmed, top: confirmedFirms.slice(0, 3), bg: "bg-emerald-50",  ring: "ring-emerald-200",  accent: "text-emerald-700",labelKey: "stageConfirmed", widthClass: "w-[76%]" },
              { stage: "Hold" as FunnelStage,      count: funnelCounts.Hold,      top: holdFirms.slice(0, 5),      bg: "bg-emerald-100", ring: "ring-emerald-300",  accent: "text-emerald-800",labelKey: "stageHold", widthClass: "w-[64%]" },
            ] as const
          ).map((s, i) => (
            <div
              key={s.stage}
              className={`relative rounded-2xl ${s.bg} ring-1 ${s.ring} p-3 mx-auto ${s.widthClass} transition-shadow`}
            >
              <div className="flex items-baseline justify-between mb-1.5">
                <span className={`text-[0.6875rem] font-extrabold uppercase tracking-wider ${s.accent}`}>
                  {i + 1}. {tEco(s.labelKey as "stageCandidate")}
                </span>
                <span className={`text-lg font-extrabold ${s.accent}`}>{s.count}</span>
              </div>
              {s.top.length === 0 ? (
                <div className="text-[0.6875rem] text-gray-400 italic">
                  {s.stage === "Candidate" ? `전체 ${firms.length}` : "—"}
                </div>
              ) : (
                <div className="space-y-0.5">
                  {s.top.map((p) => {
                    const f = firms.find((x) => x.id === p.firmId);
                    if (!f) return null;
                    return (
                      <Link
                        key={p.firmId}
                        href={`/firms/${f.slug}`}
                        className="block text-[0.6875rem] font-bold text-gray-700 hover:text-gray-900 truncate"
                      >
                        · {f.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Category Substitution ── */}
      {substitutionPaths.length > 0 && (
        <section className="toss-card">
          <div className="flex items-baseline justify-between mb-1">
            <h2 className="!text-base">{tEco("substitutionTitle")}</h2>
            <span className="text-[0.6875rem] font-bold text-gray-400">{substitutionPaths.length} paths</span>
          </div>
          <p className="text-xs text-gray-500 leading-snug mb-4">{tEco("substitutionHint")}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {substitutionPaths.map((p) => {
              const fromPhase = PHASE_BADGE[p.from.phase];
              const toPhase = PHASE_BADGE[p.to.phase];
              return (
                <div key={`${p.from.id}-${p.to.id}`} className="rounded-2xl border border-gray-100 bg-white">
                  {/* From → To headline */}
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 p-3 border-b border-gray-100">
                    <Link
                      href={`/ecosystems/${p.from.ecosystemId}#layer-${p.from.layerId}`}
                      className="min-w-0 group"
                    >
                      <span className={`text-[0.625rem] font-extrabold px-1.5 py-0.5 rounded ${fromPhase.bg} ${fromPhase.text}`}>
                        {fromPhase.emoji} {phaseLabel(p.from.phase, locale)}
                      </span>
                      <div className="text-xs font-extrabold text-gray-800 mt-1 truncate group-hover:underline">
                        {locale === "ko" ? p.from.nameKo : p.from.name}
                      </div>
                    </Link>
                    <span className="text-gray-400 text-lg shrink-0 font-bold">→</span>
                    <Link
                      href={`/ecosystems/${p.to.ecosystemId}#layer-${p.to.layerId}`}
                      className="min-w-0 group text-right"
                    >
                      <span className={`text-[0.625rem] font-extrabold px-1.5 py-0.5 rounded ${toPhase.bg} ${toPhase.text}`}>
                        {toPhase.emoji} {phaseLabel(p.to.phase, locale)}
                      </span>
                      <div className="text-xs font-extrabold text-gray-800 mt-1 truncate group-hover:underline">
                        {locale === "ko" ? p.to.nameKo : p.to.name}
                      </div>
                    </Link>
                  </div>

                  {/* Firm groups */}
                  <div className="p-3 space-y-2">
                    {p.atRiskFirmIds.length > 0 && (
                      <div>
                        <div className="text-[0.625rem] font-extrabold uppercase tracking-wider text-rose-700 mb-0.5">
                          ⚠ {tEco("subAtRisk")}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {p.atRiskFirmIds.map((id) => {
                            const f = firms.find((x) => x.id === id);
                            if (!f) return null;
                            return (
                              <Link
                                key={id}
                                href={`/firms/${f.slug}`}
                                className="text-[0.6875rem] font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 px-1.5 py-0.5 rounded"
                              >
                                {f.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {p.positionedFirmIds.length > 0 && (
                      <div>
                        <div className="text-[0.625rem] font-extrabold uppercase tracking-wider text-emerald-700 mb-0.5">
                          ✓ {tEco("subPositioned")}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {p.positionedFirmIds.map((id) => {
                            const f = firms.find((x) => x.id === id);
                            if (!f) return null;
                            return (
                              <Link
                                key={id}
                                href={`/firms/${f.slug}`}
                                className="text-[0.6875rem] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-1.5 py-0.5 rounded"
                              >
                                {f.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {p.pureSuccessorFirmIds.length > 0 && (
                      <div>
                        <div className="text-[0.625rem] font-extrabold uppercase tracking-wider text-blue-700 mb-0.5">
                          🆕 {tEco("subPureSuccessor")}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {p.pureSuccessorFirmIds.map((id) => {
                            const f = firms.find((x) => x.id === id);
                            if (!f) return null;
                            return (
                              <Link
                                key={id}
                                href={`/firms/${f.slug}`}
                                className="text-[0.6875rem] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-1.5 py-0.5 rounded"
                              >
                                {f.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Sell · Rebalance · Warn ── */}
      {(sellGroups.exit.length > 0 || sellGroups.rebalance.length > 0 || sellGroups.warn.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* EXIT */}
          <div className="toss-card !bg-gradient-to-br !from-rose-50 !to-white">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-extrabold text-gray-900">{tEco("sellExitTitle")}</div>
              <div className="text-[0.6875rem] font-bold text-rose-700">{sellGroups.exit.length}</div>
            </div>
            {sellGroups.exit.length === 0 ? (
              <div className="text-xs text-gray-400 italic">{tEco("sellEmpty")}</div>
            ) : (
              <div className="space-y-1">
                {sellGroups.exit.slice(0, 4).map((c) => (
                  <Link
                    key={c.firmId}
                    href={`/firms/${firmSlug(c.firmId)}`}
                    className="block rounded-lg px-2.5 py-1.5 hover:bg-white/60 transition-colors"
                    title={c.topSignal.reasonKo}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-gray-900 truncate">{firmName(c.firmId)}</span>
                      <span className="shrink-0 text-[0.625rem] font-extrabold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                        {c.topSignal.kind.replace("EXIT-", "")}
                      </span>
                    </div>
                    <div className="text-[0.6875rem] text-gray-500 mt-0.5 line-clamp-1">
                      {c.topSignal.reasonKo}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* REBALANCE */}
          <div className="toss-card !bg-gradient-to-br !from-amber-50 !to-white">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-extrabold text-gray-900">{tEco("sellRebalanceTitle")}</div>
              <div className="text-[0.6875rem] font-bold text-amber-700">{sellGroups.rebalance.length}</div>
            </div>
            {sellGroups.rebalance.length === 0 ? (
              <div className="text-xs text-gray-400 italic">{tEco("sellEmpty")}</div>
            ) : (
              <div className="space-y-1">
                {sellGroups.rebalance.slice(0, 4).map((c) => (
                  <Link
                    key={c.firmId}
                    href={`/firms/${firmSlug(c.firmId)}`}
                    className="block rounded-lg px-2.5 py-1.5 hover:bg-white/60 transition-colors"
                    title={c.topSignal.reasonKo}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-gray-900 truncate">{firmName(c.firmId)}</span>
                      <span className="shrink-0 text-[0.625rem] font-extrabold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                        REBAL
                      </span>
                    </div>
                    <div className="text-[0.6875rem] text-gray-500 mt-0.5 line-clamp-1">
                      {c.topSignal.reasonKo}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* WARN */}
          <div className="toss-card !bg-gradient-to-br !from-yellow-50 !to-white">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-extrabold text-gray-900">{tEco("sellWarnTitle")}</div>
              <div className="text-[0.6875rem] font-bold text-yellow-700">{sellGroups.warn.length}</div>
            </div>
            {sellGroups.warn.length === 0 ? (
              <div className="text-xs text-gray-400 italic">{tEco("sellEmpty")}</div>
            ) : (
              <div className="space-y-1">
                {sellGroups.warn.slice(0, 4).map((c) => (
                  <Link
                    key={c.firmId}
                    href={`/firms/${firmSlug(c.firmId)}`}
                    className="block rounded-lg px-2.5 py-1.5 hover:bg-white/60 transition-colors"
                    title={c.topSignal.reasonKo}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-gray-900 truncate">{firmName(c.firmId)}</span>
                      <span className="shrink-0 text-[0.625rem] font-extrabold text-yellow-700 bg-yellow-100 px-1.5 py-0.5 rounded">
                        {c.topSignal.kind.replace("WARN-", "")}
                      </span>
                    </div>
                    <div className="text-[0.6875rem] text-gray-500 mt-0.5 line-clamp-1">
                      {c.topSignal.reasonKo}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Layer Momentum (Hot / Cold) + Sentiment-driven ── */}
      {(hotCold.hot.length > 0 || hotCold.cold.length > 0 || topSentimentFirms.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Hot */}
          <div className="toss-card !bg-gradient-to-br !from-emerald-50 !to-white">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-extrabold text-gray-900">{tEco("hotLayersTitle")}</div>
              <div className="text-[0.6875rem] font-bold text-gray-400">4w · Yahoo</div>
            </div>
            <div className="space-y-1.5">
              {hotCold.hot.map((m) => {
                const eco = findEcosystem(m.ecosystemId);
                const layer = eco?.layers.find((l) => l.id === m.layerId);
                if (!eco || !layer || m.priceMomentum === null) return null;
                return (
                  <Link
                    key={`${m.ecosystemId}-${m.layerId}`}
                    href={`/ecosystems/${eco.slug}`}
                    className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 hover:bg-white/60 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`shrink-0 inline-block w-2 h-2 rounded-full ${ECO_DOT[m.ecosystemId]}`} />
                      <span className="text-xs font-bold text-gray-700 truncate">
                        {locale === "ko" ? eco.nameKo : eco.name}
                      </span>
                      <span className="text-gray-300">›</span>
                      <span className="text-xs font-bold text-gray-900 truncate">
                        {locale === "ko" ? layer.nameKo : layer.name}
                      </span>
                    </div>
                    <span className="shrink-0 text-sm font-extrabold text-emerald-600">
                      +{(m.priceMomentum * 100).toFixed(1)}%
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Cold */}
          <div className="toss-card !bg-gradient-to-br !from-rose-50 !to-white">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-extrabold text-gray-900">{tEco("coldLayersTitle")}</div>
              <div className="text-[0.6875rem] font-bold text-gray-400">4w · Yahoo</div>
            </div>
            <div className="space-y-1.5">
              {hotCold.cold.map((m) => {
                const eco = findEcosystem(m.ecosystemId);
                const layer = eco?.layers.find((l) => l.id === m.layerId);
                if (!eco || !layer || m.priceMomentum === null) return null;
                return (
                  <Link
                    key={`${m.ecosystemId}-${m.layerId}`}
                    href={`/ecosystems/${eco.slug}`}
                    className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 hover:bg-white/60 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`shrink-0 inline-block w-2 h-2 rounded-full ${ECO_DOT[m.ecosystemId]}`} />
                      <span className="text-xs font-bold text-gray-700 truncate">
                        {locale === "ko" ? eco.nameKo : eco.name}
                      </span>
                      <span className="text-gray-300">›</span>
                      <span className="text-xs font-bold text-gray-900 truncate">
                        {locale === "ko" ? layer.nameKo : layer.name}
                      </span>
                    </div>
                    <span className="shrink-0 text-sm font-extrabold text-rose-600">
                      {(m.priceMomentum * 100).toFixed(1)}%
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Sentiment-driven */}
          <div className="toss-card !bg-gradient-to-br !from-indigo-50 !to-white">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-extrabold text-gray-900">{tEco("sentimentDrivenTitle")}</div>
              <div className="text-[0.6875rem] font-bold text-gray-400">/100</div>
            </div>
            <div className="space-y-1">
              {topSentimentFirms.map((p) => {
                const f = firms.find((x) => x.id === p.firmId);
                if (!f) return null;
                const tone = p.score >= 70 ? "text-indigo-700" : p.score >= 50 ? "text-indigo-600" : "text-gray-600";
                return (
                  <Link
                    key={p.firmId}
                    href={`/firms/${f.slug}`}
                    className="block rounded-lg px-2.5 py-1.5 hover:bg-white/60 transition-colors"
                    title={p.topDriversKo[0] ?? ""}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-extrabold text-gray-900 truncate">{f.name}</span>
                      <span className={`shrink-0 text-sm font-extrabold ${tone}`}>{p.score}</span>
                    </div>
                    <div className="text-[0.6875rem] text-gray-500 mt-0.5 line-clamp-1">
                      {locale === "ko" ? p.topDriversKo[0] ?? p.level : p.topDriversEn[0] ?? p.level}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Quick Navigation ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <Link href="/ecosystems">
          <div className="toss-card-interactive !p-4 text-center relative">
            <div className="text-2xl mb-1">🌐</div>
            <div className="text-sm font-extrabold text-gray-900">이코시스템</div>
            <div className="text-xs text-gray-400 font-medium mt-0.5">9개 거시 × 51 layer</div>
            {mooreConflicts.length > 0 && (
              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[0.625rem] font-extrabold">
                ⚠️ {mooreConflicts.length}
              </div>
            )}
          </div>
        </Link>
        <Link href="/categories">
          <div className="toss-card-interactive !p-4 text-center">
            <div className="text-2xl mb-1">🗺️</div>
            <div className="text-sm font-extrabold text-gray-900">카테고리 TALC</div>
            <div className="text-xs text-gray-400 font-medium mt-0.5">19개 섹터별 분류</div>
          </div>
        </Link>
        <Link href="/firms">
          <div className="toss-card-interactive !p-4 text-center">
            <div className="text-2xl mb-1">📊</div>
            <div className="text-sm font-extrabold text-gray-900">전체 기업 분류</div>
            <div className="text-xs text-gray-400 font-medium mt-0.5">{firms.length}개 기업 · 7차원 점수</div>
          </div>
        </Link>
        <Link href="/discuss">
          <div className="toss-card-interactive !p-4 text-center">
            <div className="text-2xl mb-1">💬</div>
            <div className="text-sm font-extrabold text-gray-900">토론 게시판</div>
            <div className="text-xs text-gray-400 font-medium mt-0.5">
              {openProposals > 0 ? `${openProposals}건 제안` : "합의 기반 편집"}
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

      <div className="text-center py-4">
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
