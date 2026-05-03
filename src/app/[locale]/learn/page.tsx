import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import PrincipleAnnotations from "@/components/discuss/PrincipleAnnotations";
import TALCCurve from "@/components/learn/TALCCurve";
import HypeCycleCurve from "@/components/learn/HypeCycleCurve";
import ProductLifeCycleCurve from "@/components/learn/ProductLifeCycleCurve";

const PHASES = [
  { key: "earlyMarket", emoji: "🌱", color: "bg-white" },
  { key: "chasm", emoji: "🕳️", color: "bg-red-50/60" },
  { key: "bowlingAlley", emoji: "🎳", color: "bg-yellow-50/60" },
  { key: "tornado", emoji: "🌪️", color: "bg-emerald-50/60" },
  { key: "mainStreet", emoji: "🏙️", color: "bg-blue-50/60" },
  { key: "endOfLife", emoji: "📉", color: "bg-gray-50" },
];

// Moore 6등급(영장류 3 + 킹덤 3)을 그룹별로 정렬, 우리 클럽 보조 라벨 2개는 별도 그룹.
const TIER_GROUPS = [
  {
    group: "primate" as const,
    labelKey: "tiersPrimateLabel",
    descKey: "tiersPrimateDesc",
    tiers: [
      { key: "gorilla",     emoji: "🦍", color: "bg-emerald-50/60" },
      { key: "chimpanzee",  emoji: "🐵", color: "bg-yellow-50/60" },
      { key: "monkey",      emoji: "🐒", color: "bg-orange-50/60" },
    ],
  },
  {
    group: "kingdom" as const,
    labelKey: "tiersKingdomLabel",
    descKey: "tiersKingdomDesc",
    tiers: [
      { key: "king",   emoji: "👑", color: "bg-blue-50/60" },
      { key: "prince", emoji: "🤴", color: "bg-indigo-50/60" },
      { key: "serf",   emoji: "⛏️", color: "bg-stone-50/60" },
    ],
  },
  {
    group: "aux" as const,
    labelKey: "tiersAuxLabel",
    descKey: "tiersAuxDesc",
    tiers: [
      { key: "potentialGorilla", emoji: "🦍", color: "bg-teal-50/60" },
      { key: "inChasm",          emoji: "🕳️", color: "bg-red-50/60" },
    ],
  },
];

const BOOK_KEYS = [
  { key: "crossingTheChasm", isNew: false },
  { key: "insideTheTornado", isNew: false },
  { key: "theGorillaGame", isNew: false },
  { key: "strategicSelling", isNew: false },
  { key: "ciagiAdaptation", isNew: true },
];

const FUNNEL_STAGES = [
  { key: "prospecting", emoji: "🔭", color: "bg-gray-50" },
  { key: "qualifying", emoji: "🧺", color: "bg-yellow-50/60" },
  { key: "inTheFunnel", emoji: "🔍", color: "bg-blue-50/60" },
  { key: "bestFew", emoji: "🎯", color: "bg-emerald-50/60" },
];

const QUAL_SHEET_ITEMS = [
  { key: "objective", emoji: "🎯" },
  { key: "buyingInfluences", emoji: "👥" },
  { key: "responseModes", emoji: "📊" },
  { key: "redFlags", emoji: "🚩" },
  { key: "winResults", emoji: "🏆" },
  { key: "actionPlan", emoji: "📋" },
];

/* ── New section data ── */
const CHASM_ITEMS = [
  { key: "structural",       emoji: "🧬" },
  { key: "compellingReason", emoji: "💢" },
  { key: "discontinuous",    emoji: "⚡" },
  { key: "wholeProduct",     emoji: "📦" },
  { key: "beachhead",        emoji: "🏖️" },
];

const TORNADO_ITEMS = [
  { key: "herdBehavior", emoji: "🐑" },
  { key: "feedbackLoop", emoji: "🔄" },
  { key: "architectureWar", emoji: "⚔️" },
  { key: "winnerTakeAll", emoji: "🏆" },
];

// 비ICT 산업 케이스 — Moore 4기준의 산업 보편성 검증.
// 만화 시즌 3 Ep 25-26과 일관. 전문가 분석용 — "쉬운 비유"가 아니라 케이스 스터디 framing.
const NON_ICT_CASES = [
  { key: "cocaCola",     emoji: "🥤", color: "bg-rose-50/60",    accent: "text-rose-700" },
  { key: "telecom3",     emoji: "📱", color: "bg-indigo-50/60",  accent: "text-indigo-700" },
  { key: "emartCoupang", emoji: "🛒", color: "bg-orange-50/60",  accent: "text-orange-700" },
  { key: "dyson",        emoji: "🌀", color: "bg-blue-50/60",    accent: "text-blue-700" },
  { key: "kitchen",      emoji: "🔥", color: "bg-amber-50/60",   accent: "text-amber-700" },
] as const;

// Moore 책 정통 4기준 + 우리 클럽 추가 3차원 (보조). category로 시각 구분.
const DIMENSIONS = [
  { key: "architectureControl", weight: 22, emoji: "🏗️", color: "bg-emerald-50/60", category: "moore" as const },
  { key: "switchingCosts",      weight: 20, emoji: "🔒", color: "bg-emerald-50/60", category: "moore" as const },
  { key: "networkEffects",      weight: 15, emoji: "🌐", color: "bg-emerald-50/60", category: "moore" as const },
  { key: "ecosystemControl",    weight: 13, emoji: "🤝", color: "bg-emerald-50/60", category: "moore" as const },
  { key: "marketShare",         weight: 18, emoji: "📊", color: "bg-stone-50/60",   category: "aux" as const },
  { key: "revenueGrowth",       weight: 6,  emoji: "📈", color: "bg-stone-50/60",   category: "aux" as const },
  { key: "marketConcentration", weight: 6,  emoji: "🎯", color: "bg-stone-50/60",   category: "aux" as const },
];

const ACTION_PRINCIPLES = [
  { key: "1", emoji: "🔭", phase: "action1Phase", color: "bg-gray-50" },
  { key: "2", emoji: "🧺", phase: "action2Phase", color: "bg-yellow-50/60" },
  { key: "3", emoji: "🎯", phase: "action3Phase", color: "bg-emerald-50/60" },
  { key: "4", emoji: "💎", phase: "action4Phase", color: "bg-blue-50/60" },
  { key: "5", emoji: "🚪", phase: "action5Phase", color: "bg-red-50/40" },
];

const FLOW_STEPS = [
  { key: "flow1", emoji: "🌱" },
  { key: "flow2", emoji: "🕳️" },
  { key: "flow3", emoji: "🌪️" },
  { key: "flow4", emoji: "🔬" },
  { key: "flow5", emoji: "🏷️" },
  { key: "flow6", emoji: "📜" },
  { key: "flow7", emoji: "🎯" },
];

const PLC_GROUPS = [
  { key: "phase1", emoji: "⚔️", color: "bg-yellow-50/60", phaseKeys: ["Early Market", "Bowling Alley", "Tornado"] as const },
  { key: "phase2", emoji: "🏙️", color: "bg-blue-50/60",   phaseKeys: ["Thriving Main Street", "Maturing Main Street", "Declining Main Street"] as const },
  { key: "phase3", emoji: "📉", color: "bg-red-50/40",    phaseKeys: ["Fault Line", "End of Life"] as const },
];

const PLC_NEW_PHASES = [
  { key: "thriving",  emoji: "🌿", color: "bg-blue-50/60",  ring: "ring-blue-200" },
  { key: "maturing",  emoji: "🏙️", color: "bg-blue-50/40",  ring: "ring-blue-200" },
  { key: "declining", emoji: "🍂", color: "bg-amber-50/60", ring: "ring-amber-200" },
  { key: "faultLine", emoji: "⚡", color: "bg-red-50/60",   ring: "ring-red-300" },
];

const VIRTUES = [
  { key: "upside",             emoji: "🚀", color: "bg-emerald-50/60" },
  { key: "downside",           emoji: "🛡️", color: "bg-blue-50/60" },
  { key: "tolerantOfMistakes", emoji: "🎯", color: "bg-amber-50/60" },
] as const;

const CONSTRAINTS = [
  { key: "discipline", emoji: "📏", color: "bg-stone-50/60" },
  { key: "research",   emoji: "🔬", color: "bg-stone-50/60" },
  { key: "fairFunds",  emoji: "⚖️", color: "bg-stone-50/60" },
] as const;

const ALTERNATIVES = [
  { key: "concept",   emoji: "💭" },
  { key: "momentum",  emoji: "🌊" },
  { key: "theme",     emoji: "🎨" },
  { key: "value",     emoji: "💎" },
  { key: "technical", emoji: "📈" },
] as const;

const LANDSCAPE_MAP = [
  { key: "index",    emoji: "🌐", color: "bg-emerald-50/40", ring: "ring-emerald-200" },
  { key: "dividend", emoji: "💵", color: "bg-amber-50/40",   ring: "ring-amber-200" },
  { key: "garp",     emoji: "📐", color: "bg-blue-50/40",    ring: "ring-blue-200" },
  { key: "quality",  emoji: "🏰", color: "bg-blue-50/40",    ring: "ring-blue-200" },
  { key: "dca",      emoji: "📅", color: "bg-stone-50/40",   ring: "ring-stone-200" },
] as const;

const LANDSCAPE_AXES = [
  "horizon",
  "analysis",
  "portfolio",
  "efficiency",
  "style",
] as const;

const LANDSCAPE_RETAIL = [
  { key: "lowCapital",       color: "bg-emerald-50/60" },
  { key: "limitedTime",      color: "bg-blue-50/60" },
  { key: "limitedExpertise", color: "bg-amber-50/60" },
  { key: "emotionalRisk",    color: "bg-stone-50/60" },
] as const;

const AUDIENCE_FIT = [
  { key: "primary",   emoji: "👨‍👩‍👧" },
  { key: "knowledge", emoji: "📚" },
  { key: "goal",      emoji: "🎯" },
] as const;

const AUDIENCE_SECONDARY = [
  { key: "exec", emoji: "🏢" },
  { key: "vc",   emoji: "🌱" },
  { key: "fund", emoji: "📊" },
] as const;

export default async function LearnPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "learn" });
  const tPhases = await getTranslations({ locale, namespace: "marketPhases" });

  return (
    <main className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-10 space-y-14">
      {/* ══════ Hero — Thesis First ══════ */}
      <div>
        <h1 className="mb-4">{t("title")}</h1>
        <div className="toss-card !bg-gray-900 !text-white mb-5">
          <p className="text-[0.9375rem] sm:text-base leading-relaxed font-bold">{t("thesis")}</p>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">{t("subtitle")}</p>

        {/* Learning flow roadmap */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.key} className="flex items-center gap-1.5 sm:gap-2">
              <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full px-3 py-1.5">
                <span>{step.emoji}</span>
                <span>{t(step.key)}</span>
              </span>
              {i < FLOW_STEPS.length - 1 && (
                <span className="text-gray-300 text-xs font-bold">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ══════ ⓪ Why The Gorilla Game ══════ */}
      <section>
        <h2 className="mb-3">{t("whyTitle")}</h2>
        <p className="text-gray-500 text-sm font-medium mb-5">{t("whySubtitle")}</p>

        {/* Mission statement — direct quote from the book */}
        <div className="toss-card !bg-gray-900 !text-white mb-5">
          <p className="text-[0.9375rem] sm:text-base leading-relaxed font-bold">{t("whyThesis")}</p>
        </div>

        {/* Macro context — why this matters now */}
        <div className="toss-card !bg-[#E8F0FE]/60 ring-1 ring-[#0064FF]/10 mb-8">
          <p className="text-gray-800 text-sm leading-relaxed">{t("whyContext")}</p>
        </div>

        {/* 3 Virtues */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wide">
            {t("whyVirtuesLabel")}
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {VIRTUES.map((v) => (
            <div key={v.key} className={`toss-card ${v.color}`}>
              <div className="text-2xl mb-2">{v.emoji}</div>
              <div className="font-extrabold text-gray-900 text-sm mb-2">{t(`whyVirtues.${v.key}.title` as "whyVirtues.upside.title")}</div>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">{t(`whyVirtues.${v.key}.desc` as "whyVirtues.upside.desc")}</p>
              <span className="text-xs font-bold text-gray-400">{t(`whyVirtues.${v.key}.ref` as "whyVirtues.upside.ref")}</span>
            </div>
          ))}
        </div>

        {/* 3 Constraints */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wide">
            {t("whyConstraintsLabel")}
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {CONSTRAINTS.map((c) => (
            <div key={c.key} className={`toss-card ${c.color}`}>
              <div className="text-2xl mb-2">{c.emoji}</div>
              <div className="font-extrabold text-gray-900 text-sm mb-2">{t(`whyConstraints.${c.key}.title` as "whyConstraints.discipline.title")}</div>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">{t(`whyConstraints.${c.key}.desc` as "whyConstraints.discipline.desc")}</p>
              <span className="text-xs font-bold text-gray-400">{t(`whyConstraints.${c.key}.ref` as "whyConstraints.discipline.ref")}</span>
            </div>
          ))}
        </div>

        {/* Alternatives — 5 methodology comparisons */}
        <h3 className="text-lg mb-2">{t("whyAlternativesTitle")}</h3>
        <p className="text-gray-500 text-sm font-medium mb-5">{t("whyAlternativesSubtitle")}</p>
        <div className="space-y-3 mb-6">
          {ALTERNATIVES.map((a) => (
            <div key={a.key} className="toss-card">
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0 mt-0.5">{a.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-900 text-sm mb-1">{t(`whyAlternatives.${a.key}.name` as "whyAlternatives.concept.name")}</div>
                  <div className="toss-pill bg-gray-100 text-gray-700 text-[10px] font-extrabold mb-2 inline-block">{t(`whyAlternatives.${a.key}.vs` as "whyAlternatives.concept.vs")}</div>
                  <p className="text-gray-500 text-sm leading-relaxed">{t(`whyAlternatives.${a.key}.desc` as "whyAlternatives.concept.desc")}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing — 2 distinguishing features */}
        <div className="toss-card !bg-emerald-50/40 ring-1 ring-emerald-200/50">
          <p className="text-gray-800 text-sm leading-relaxed font-bold">{t("whyEssence")}</p>
        </div>
      </section>

      {/* ══════ ⓪-2 Landscape — Where the Gorilla Game Sits ══════ */}
      <section>
        <h2 className="mb-3">{t("landscapeTitle")}</h2>
        <p className="text-gray-500 text-sm font-medium mb-6">{t("landscapeSubtitle")}</p>

        {/* Sub-section A: 5 web-sourced methodologies */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wide">
            {t("landscapeMapLabel")}
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="space-y-3 mb-10">
          {LANDSCAPE_MAP.map((m) => (
            <div key={m.key} className={`toss-card ${m.color} ring-1 ${m.ring}`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0 mt-0.5">{m.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-bold text-gray-900 text-sm">{t(`landscapeMap.${m.key}.name` as "landscapeMap.index.name")}</span>
                    <span className="toss-pill bg-white/80 text-gray-700 text-[10px] font-extrabold">{t(`landscapeMap.${m.key}.fit` as "landscapeMap.index.fit")}</span>
                  </div>
                  <div className="toss-pill bg-gray-100 text-gray-700 text-[10px] font-extrabold mb-2 inline-block">{t(`landscapeMap.${m.key}.vs` as "landscapeMap.index.vs")}</div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-2">{t(`landscapeMap.${m.key}.desc` as "landscapeMap.index.desc")}</p>
                  <span className="text-xs font-bold text-gray-400">{t(`landscapeMap.${m.key}.ref` as "landscapeMap.index.ref")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sub-section B: 5-axis position */}
        <h3 className="text-lg mb-2">{t("landscapePositionLabel")}</h3>
        <p className="text-gray-500 text-sm font-medium mb-5">{t("landscapePositionSubtitle")}</p>
        <div className="space-y-3 mb-5">
          {LANDSCAPE_AXES.map((axis) => (
            <div key={axis} className="toss-card !p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0 mt-0.5">{t(`landscapePosition.${axis}.icon` as "landscapePosition.horizon.icon")}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wide">{t(`landscapePosition.${axis}.label` as "landscapePosition.horizon.label")}</span>
                    <span className="text-gray-300">→</span>
                    <span className="toss-pill bg-[#0064FF] text-white text-xs font-extrabold">{t(`landscapePosition.${axis}.value` as "landscapePosition.horizon.value")}</span>
                  </div>
                  <div className="text-[11px] font-bold text-gray-400 mb-1.5">{t(`landscapePosition.${axis}.scale` as "landscapePosition.horizon.scale")}</div>
                  <p className="text-gray-600 text-sm leading-relaxed">{t(`landscapePosition.${axis}.note` as "landscapePosition.horizon.note")}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="toss-card !bg-gray-900 !text-white mb-10">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wide">{t("landscapePositionTaxonomyLabel")}</span>
            <span className="toss-pill bg-white text-gray-900 text-xs font-extrabold">{t("landscapePositionTaxonomy")}</span>
          </div>
          <p className="text-gray-100 text-sm leading-relaxed">{t("landscapePositionEssence")}</p>
        </div>

        {/* Sub-section C: 4 retail-fit reasons */}
        <h3 className="text-lg mb-2">{t("landscapeRetailLabel")}</h3>
        <p className="text-gray-500 text-sm font-medium mb-5">{t("landscapeRetailSubtitle")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {LANDSCAPE_RETAIL.map((r) => (
            <div key={r.key} className={`toss-card ${r.color}`}>
              <div className="text-2xl mb-2">{t(`landscapeRetail.${r.key}.icon` as "landscapeRetail.lowCapital.icon")}</div>
              <div className="font-extrabold text-gray-900 text-sm mb-2">{t(`landscapeRetail.${r.key}.title` as "landscapeRetail.lowCapital.title")}</div>
              <p className="text-gray-600 text-sm leading-relaxed">{t(`landscapeRetail.${r.key}.desc` as "landscapeRetail.lowCapital.desc")}</p>
            </div>
          ))}
        </div>

        {/* Sub-section D: Recommended combo callout */}
        <div className="toss-card !bg-[#E8F0FE]/60 ring-1 ring-[#0064FF]/15">
          <div className="text-xs font-extrabold text-[#0064FF] uppercase tracking-wide mb-2">
            {t("landscapeComboLabel")}
          </div>
          <p className="text-gray-800 text-sm leading-relaxed">{t("landscapeCombo")}</p>
        </div>
      </section>

      {/* ══════ ⓪-3 Who Should Play ══════ */}
      <section>
        <h2 className="mb-3">{t("audienceTitle")}</h2>
        <p className="text-gray-500 text-sm font-medium mb-6">{t("audienceSubtitle")}</p>

        {/* Primary fit — the book's true reader */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-extrabold text-[#0064FF] uppercase tracking-wide">
            {t("audienceFitLabel")}
          </span>
          <div className="flex-1 h-px bg-[#0064FF]/20" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {AUDIENCE_FIT.map((a) => (
            <div key={a.key} className="toss-card !bg-[#E8F0FE]/40 ring-1 ring-[#0064FF]/15">
              <div className="text-2xl mb-2">{a.emoji}</div>
              <div className="font-extrabold text-gray-900 text-sm mb-2">{t(`audienceFit.${a.key}.title` as "audienceFit.primary.title")}</div>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">{t(`audienceFit.${a.key}.desc` as "audienceFit.primary.desc")}</p>
              <span className="text-xs font-bold text-gray-400">{t(`audienceFit.${a.key}.ref` as "audienceFit.primary.ref")}</span>
            </div>
          ))}
        </div>

        {/* Secondary fit */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wide">
            {t("audienceSecondaryLabel")}
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {AUDIENCE_SECONDARY.map((a) => (
            <div key={a.key} className="toss-card">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{a.emoji}</span>
                <div className="font-bold text-gray-900 text-sm">{t(`audienceSecondary.${a.key}.title` as "audienceSecondary.exec.title")}</div>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">{t(`audienceSecondary.${a.key}.desc` as "audienceSecondary.exec.desc")}</p>
            </div>
          ))}
        </div>

        {/* Misfit — day traders */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-extrabold text-red-500/80 uppercase tracking-wide">
            {t("audienceMisfitLabel")}
          </span>
          <div className="flex-1 h-px bg-red-200/60" />
        </div>
        <div className="toss-card !bg-red-50/40 ring-1 ring-red-200/50">
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0 mt-0.5">⛔</span>
            <div className="flex-1 min-w-0">
              <div className="font-extrabold text-gray-900 text-sm mb-2">{t("audienceMisfit.title")}</div>
              <p className="text-gray-700 text-sm leading-relaxed mb-2">{t("audienceMisfit.desc")}</p>
              <span className="text-xs font-bold text-gray-400">{t("audienceMisfit.ref")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ ① TALC Lifecycle ══════ */}
      <section>
        <h2 className="mb-3">{t("talcTitle")}</h2>
        <p className="text-gray-500 text-sm font-medium mb-6">{t("talcSubtitle")}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {PHASES.map((p, i) => (
            <div key={p.key} className={`toss-card !p-4 ${p.color}`}>
              <div className="text-2xl mb-2">{p.emoji}</div>
              <div className="flex items-center gap-1 mb-1">
                <span className="text-xs font-bold text-gray-400">{t("stage", { n: i + 1 })}</span>
              </div>
              <div className="font-bold text-gray-900 text-sm mb-2">{t(`phases.${p.key}.name`)}</div>
              <p className="text-gray-500 text-xs leading-relaxed">{t(`phases.${p.key}.desc`)}</p>
            </div>
          ))}
        </div>
        {/* TALC bell curve diagram */}
        <TALCCurve locale={locale} />

        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-400">
          <div className="flex-1 h-0.5 bg-gradient-to-r from-gray-200 via-[#0064FF] to-gray-200 rounded" />
          <span>{t("timeAxis")}</span>
        </div>
      </section>

      {/* ══════ ①-2 Hype Cycle ══════ */}
      <section>
        <h2 className="mb-3">{t("hypeTitle")}</h2>
        <p className="text-gray-500 text-sm font-medium mb-6">{t("hypeSubtitle")}</p>
        <div className="toss-card !bg-[#E8F0FE]/60 ring-1 ring-[#0064FF]/10 mb-5">
          <p className="text-gray-800 text-sm leading-relaxed font-bold">{t("hypeThesis")}</p>
        </div>
        <HypeCycleCurve locale={locale} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div className="toss-card">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📉</span>
              <div className="font-bold text-gray-900 text-sm">{t("hype.troughTitle")}</div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">{t("hype.troughDesc")}</p>
          </div>
          <div className="toss-card">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🔑</span>
              <div className="font-bold text-gray-900 text-sm">{t("hype.insightTitle")}</div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">{t("hype.insightDesc")}</p>
          </div>
        </div>
      </section>

      {/* ══════ ② The Chasm ══════ */}
      <section>
        <h2 className="mb-3">{t("chasmTitle")}</h2>
        <div className="toss-card !bg-red-50/40 ring-1 ring-red-200/50 mb-5">
          <p className="text-gray-800 text-sm leading-relaxed font-bold">{t("chasmThesis")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CHASM_ITEMS.map((item) => (
            <div key={item.key} className="toss-card">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{item.emoji}</span>
                <div className="font-bold text-gray-900 text-sm">{t(`chasm.${item.key}.title`)}</div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{t(`chasm.${item.key}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ ③ The Tornado ══════ */}
      <section>
        <h2 className="mb-3">{t("tornadoTitle")}</h2>
        <div className="toss-card !bg-emerald-50/40 ring-1 ring-emerald-200/50 mb-5">
          <p className="text-gray-800 text-sm leading-relaxed font-bold">{t("tornadoThesis")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TORNADO_ITEMS.map((item, i) => (
            <div key={item.key} className="toss-card">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-xs font-extrabold text-gray-400">{i + 1}/4</span>
              </div>
              <div className="font-bold text-gray-900 text-sm mb-2">{t(`tornado.${item.key}.title`)}</div>
              <p className="text-gray-500 text-sm leading-relaxed">{t(`tornado.${item.key}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ ③-2 Product Life Cycle ══════ */}
      <section id="product-life-cycle" className="scroll-mt-20">
        <h2 className="mb-3">{t("productLifeCycleTitle")}</h2>
        <p className="text-gray-500 text-sm font-medium mb-5">{t("productLifeCycleSubtitle")}</p>

        <div className="toss-card !bg-[#E8F0FE]/60 ring-1 ring-[#0064FF]/10 mb-6">
          <p className="text-gray-800 text-sm leading-relaxed font-bold">{t("productLifeCycleThesis")}</p>
        </div>

        {/* Full product life cycle curve (Moore's extended model) */}
        <ProductLifeCycleCurve locale={locale} />

        {/* 3 phase groups (Moore's Phase 1/2/3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 mt-8">
          {PLC_GROUPS.map((g) => (
            <div key={g.key} className={`toss-card !p-5 ${g.color}`}>
              <div className="text-2xl mb-2">{g.emoji}</div>
              <div className="font-extrabold text-gray-900 text-sm mb-2">{t(`productLifeCycleGroups.${g.key}.title` as "productLifeCycleGroups.phase1.title")}</div>
              <p className="text-gray-500 text-xs leading-relaxed mb-3">{t(`productLifeCycleGroups.${g.key}.desc` as "productLifeCycleGroups.phase1.desc")}</p>
              <div className="flex flex-wrap gap-1.5">
                {g.phaseKeys.map((pk) => (
                  <span key={pk} className="toss-pill text-[10px] bg-white/80 text-gray-700 font-extrabold">
                    {tPhases(pk)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* New 4 phases introduced by Living on the Fault Line */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wide">
            기본 TALC에 새로 추가되는 4단계
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {PLC_NEW_PHASES.map((p) => (
            <div key={p.key} className={`toss-card !p-4 ${p.color} ring-1 ${p.ring}`}>
              <div className="text-2xl mb-2">{p.emoji}</div>
              <div className="font-extrabold text-gray-900 text-sm mb-1">{t(`productLifeCycleNew.${p.key}.name` as "productLifeCycleNew.thriving.name")}</div>
              <div className="text-[10px] text-gray-500 font-bold mb-2">{t(`productLifeCycleNew.${p.key}.growth` as "productLifeCycleNew.thriving.growth")}</div>
              <div className="toss-pill bg-gray-100 text-gray-800 text-[10px] font-extrabold mb-2 inline-block">{t(`productLifeCycleNew.${p.key}.action` as "productLifeCycleNew.thriving.action")}</div>
              <p className="text-gray-500 text-xs leading-relaxed">{t(`productLifeCycleNew.${p.key}.desc` as "productLifeCycleNew.thriving.desc")}</p>
            </div>
          ))}
        </div>

        <Link href="/" className="toss-card !bg-emerald-50/40 ring-1 ring-emerald-200/50 hover:ring-2 block transition-all">
          <p className="text-gray-800 text-sm leading-relaxed font-bold">{t("productLifeCycleDashboardCallout")}</p>
        </Link>
      </section>

      {/* ══════ ④ Anatomy — Moore 4 + 우리 클럽 추가 3 ══════ */}
      <section>
        <h2 className="mb-3">{t("anatomyTitle")}</h2>
        <div className="toss-card !bg-[#E8F0FE]/60 ring-1 ring-[#0064FF]/10 mb-5">
          <p className="text-gray-800 text-sm leading-relaxed font-bold">{t("anatomyThesis")}</p>
        </div>

        {/* Moore 4기준 (본 thesis) */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="!text-base font-extrabold text-emerald-700">{t("anatomyMooreLabel")}</h3>
            <span className="toss-pill bg-emerald-100 text-emerald-700 text-[10px]">70%</span>
          </div>
          <p className="text-xs text-gray-500 leading-snug">{t("anatomyMooreDesc")}</p>
        </div>
        <div className="space-y-3 mb-6">
          {DIMENSIONS.filter((d) => d.category === "moore").map((dim) => (
            <div key={dim.key} className={`toss-card ${dim.color}`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0 mt-0.5">{dim.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900 text-sm">{t(`anatomy.${dim.key}.title`)}</span>
                    <span className="toss-pill bg-[#0064FF] text-white text-[10px]">{dim.weight}%</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{t(`anatomy.${dim.key}.desc`)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 우리 클럽 추가 3차원 (보조 도구) */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="!text-base font-extrabold text-stone-600">{t("anatomyAuxLabel")}</h3>
            <span className="toss-pill bg-stone-200 text-stone-700 text-[10px]">30%</span>
          </div>
          <p className="text-xs text-gray-500 leading-snug">{t("anatomyAuxDesc")}</p>
        </div>
        <div className="space-y-3">
          {DIMENSIONS.filter((d) => d.category === "aux").map((dim) => (
            <div key={dim.key} className={`toss-card ${dim.color}`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0 mt-0.5">{dim.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900 text-sm">{t(`anatomy.${dim.key}.title`)}</span>
                    <span className="toss-pill bg-stone-300 text-stone-700 text-[10px]">{dim.weight}%</span>
                    <span className="toss-pill bg-stone-100 text-stone-500 text-[10px]">보조</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{t(`anatomy.${dim.key}.desc`)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ ④-B Non-ICT Cases — Moore 4기준의 산업 보편성 ══════ */}
      <section>
        <h2 className="mb-3">{t("nonIctTitle")}</h2>
        <p className="text-gray-500 text-sm font-medium mb-6">{t("nonIctSubtitle")}</p>
        <div className="space-y-3">
          {NON_ICT_CASES.map((c) => (
            <div key={c.key} className={`toss-card ${c.color}`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0 mt-0.5">{c.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <span className={`font-extrabold text-sm ${c.accent}`}>{t(`nonIct.${c.key}.title`)}</span>
                    <span className="toss-pill bg-white/70 text-gray-600 text-[10px]">{t(`nonIct.${c.key}.industry`)}</span>
                    <span className="text-[10px] font-bold text-gray-400">{t(`nonIct.${c.key}.period`)}</span>
                  </div>
                  <div className="text-[0.8125rem] text-gray-700 leading-relaxed mb-2">
                    <span className="font-bold text-gray-500 text-xs uppercase tracking-wide mr-1">4기준:</span>
                    {t(`nonIct.${c.key}.criteria`)}
                  </div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs">
                    <span><span className="font-bold text-gray-500 uppercase tracking-wide">위치:</span> <span className="text-gray-800 font-bold">{t(`nonIct.${c.key}.status`)}</span></span>
                  </div>
                  <p className="text-[0.8125rem] text-gray-600 leading-relaxed mt-1.5 italic">→ {t(`nonIct.${c.key}.insight`)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-amber-50/60 ring-1 ring-amber-200 px-4 py-3">
          <p className="text-[0.8125rem] text-amber-900 leading-relaxed">{t("nonIctClosing")}</p>
        </div>
      </section>

      {/* ══════ ⑤ Classification Tiers — 영장류 + 킹덤 + 보조 라벨 ══════ */}
      <section>
        <h2 className="mb-3">{t("tiersTitle")}</h2>
        <p className="text-gray-500 text-sm font-medium mb-6">{t("tiersSubtitle")}</p>

        {TIER_GROUPS.map((g) => {
          const groupAccent =
            g.group === "primate" ? "text-emerald-700"
            : g.group === "kingdom" ? "text-blue-700"
            : "text-stone-600";
          const groupPill =
            g.group === "primate" ? "bg-emerald-100 text-emerald-700"
            : g.group === "kingdom" ? "bg-blue-100 text-blue-700"
            : "bg-stone-200 text-stone-700";
          return (
            <div key={g.group} className="mb-7 last:mb-0">
              <div className="mb-3">
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className={`!text-base font-extrabold ${groupAccent}`}>{t(g.labelKey)}</h3>
                  <span className={`toss-pill ${groupPill} text-[10px]`}>
                    {g.group === "aux" ? "보조 도구" : "Moore 책"}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-snug">{t(g.descKey)}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {g.tiers.map((tier) => {
                  const signal = t(`tiers.${tier.key}.signal`);
                  const signalColor =
                    signal === "BUY" || signal === "매수" ? "bg-emerald-100 text-emerald-700" :
                    signal === "WATCH" || signal === "관망" ? "bg-blue-100 text-[#0064FF]" :
                    signal === "SELL" || signal === "매도" ? "bg-orange-100 text-orange-700" :
                    "bg-red-100 text-red-600";
                  return (
                    <div key={tier.key} className={`toss-card ${tier.color}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{tier.emoji}</span>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-extrabold text-gray-900">{t(`tiers.${tier.key}.name`)}</span>
                            {g.group === "aux" && (
                              <span className="toss-pill bg-stone-100 text-stone-500 text-[9px]">보조</span>
                            )}
                          </div>
                          <span className={`toss-pill ${signalColor}`}>{signal}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-2">{t(`tiers.${tier.key}.desc`)}</p>
                      <span className="text-xs font-bold text-gray-400">{t("source", { book: t(`tiers.${tier.key}.book`) })}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      {/* ══════ ⑥ 5 Action Principles ══════ */}
      <section>
        <h2 className="mb-2">{t("actionTitle")}</h2>
        <p className="text-gray-500 text-sm font-medium mb-6">{t("actionSubtitle")}</p>
        <div className="space-y-3">
          {ACTION_PRINCIPLES.map((ap) => (
            <div key={ap.key} className={`toss-card ${ap.color}`}>
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-8 h-8 rounded-full bg-gray-900 text-white text-sm font-extrabold flex items-center justify-center mt-0.5">
                  {ap.key}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-bold text-gray-900 text-sm">{t(`action${ap.key}Title`)}</span>
                    <span className="toss-pill bg-gray-200 text-gray-600 text-[10px]">{t(ap.phase)}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{t(`action${ap.key}Desc`)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ ⑦ 10 Investment Principles ══════ */}
      <section>
        <h2 className="mb-2">{t("rulesTitle")}</h2>
        <p className="text-gray-500 text-sm font-medium mb-6">{t("rulesSubtitle")}</p>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <div key={n} className="toss-card">
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full bg-[#0064FF] text-white text-xs font-extrabold flex items-center justify-center mt-0.5">
                  {n}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-900 mb-1">{t(`rule${n}Title`)}</div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-2">{t(`rule${n}Desc`)}</p>
                  <p className="text-xs text-gray-400 font-medium italic leading-relaxed">{t(`rule${n}En`)}</p>
                  <PrincipleAnnotations principleNumber={n} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ ⑦ Gorilla Investment Funnel ══════ */}
      <section>
        <h2 className="mb-2">{t("funnelTitle")}</h2>
        <p className="text-gray-500 text-sm font-medium mb-6">{t("funnelSubtitle")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FUNNEL_STAGES.map((stage, i) => (
            <div key={stage.key} className={`toss-card ${stage.color} relative`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{stage.emoji}</span>
                <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wide">{t("stage", { n: i + 1 })}</span>
              </div>
              <div className="font-bold text-gray-900 text-sm mb-2">{t(`funnel.${stage.key}.title`)}</div>
              <p className="text-gray-500 text-xs leading-relaxed mb-2">{t(`funnel.${stage.key}.desc`)}</p>
              <p className="text-xs font-bold text-[#0064FF]">{t(`funnel.${stage.key}.action`)}</p>
              {i < FUNNEL_STAGES.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 text-gray-300 text-lg z-10">→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══════ ⑧ Gorilla Qualification Sheet ══════ */}
      <section>
        <h2 className="mb-2">{t("qualSheetTitle")}</h2>
        <p className="text-gray-500 text-sm font-medium mb-6">{t("qualSheetSubtitle")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUAL_SHEET_ITEMS.map((item) => (
            <div key={item.key} className="toss-card">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{item.emoji}</span>
                <div className="font-bold text-gray-900 text-sm">{t(`qualSheet.${item.key}.title`)}</div>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">{t(`qualSheet.${item.key}.desc`)}</p>
            </div>
          ))}
        </div>
        <div className="toss-card !bg-[#E8F0FE] mt-4">
          <p className="text-sm text-[#0064FF] font-bold leading-relaxed">{t("qualSheetNote")}</p>
        </div>
      </section>

      {/* ══════ Books ══════ */}
      <section>
        <h2 className="mb-4">{t("booksTitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BOOK_KEYS.map((b) => (
            <div key={b.key} className={`toss-card ${b.isNew ? "!bg-[#E8F0FE]/40 ring-1 ring-[#0064FF]/20" : ""}`}>
              {b.isNew && (
                <span className="toss-pill bg-[#0064FF] text-white mb-3">NEW</span>
              )}
              <div className="text-xs font-bold text-gray-400 mb-1">{t(`books.${b.key}.subtitle`)}</div>
              <h3 className="text-lg mb-1">{t(`books.${b.key}.title`)}</h3>
              <div className="text-xs font-bold text-gray-400 mb-3">{t(`books.${b.key}.author`)}</div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{t(`books.${b.key}.keyIdea`)}</p>
              <div className="space-y-1">
                {t(`books.${b.key}.concepts`).split(", ").map((c) => (
                  <span key={c} className="inline-block text-xs font-bold bg-gray-100 text-gray-600 rounded-lg px-2.5 py-1 mr-1 mb-1">{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center py-8">
        <Link href="/firms" className="inline-flex items-center gap-2 bg-[#0064FF] hover:bg-[#0050CC] text-white font-bold px-7 py-3.5 rounded-2xl transition-colors text-[0.9375rem]">
          {t("viewAllFirms")}
        </Link>
      </div>
    </main>
  );
}
