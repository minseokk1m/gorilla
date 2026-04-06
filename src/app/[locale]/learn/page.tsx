import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import PrincipleAnnotations from "@/components/discuss/PrincipleAnnotations";
import TALCCurve from "@/components/learn/TALCCurve";

const PHASES = [
  { key: "earlyMarket", emoji: "🌱", color: "bg-white" },
  { key: "chasm", emoji: "🕳️", color: "bg-red-50/60" },
  { key: "bowlingAlley", emoji: "🎳", color: "bg-yellow-50/60" },
  { key: "tornado", emoji: "🌪️", color: "bg-emerald-50/60" },
  { key: "mainStreet", emoji: "🏙️", color: "bg-blue-50/60" },
  { key: "endOfLife", emoji: "📉", color: "bg-gray-50" },
];

const TIERS = [
  { key: "gorilla", emoji: "🦍", color: "bg-emerald-50/60" },
  { key: "potentialGorilla", emoji: "🦍", color: "bg-teal-50/60" },
  { key: "king", emoji: "👑", color: "bg-blue-50/60" },
  { key: "prince", emoji: "🤴", color: "bg-indigo-50/60" },
  { key: "serf", emoji: "⛏️", color: "bg-stone-50/60" },
  { key: "chimpanzee", emoji: "🐵", color: "bg-yellow-50/60" },
  { key: "monkey", emoji: "🐒", color: "bg-orange-50/60" },
  { key: "inChasm", emoji: "🕳️", color: "bg-red-50/60" },
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
  { key: "whyDie", emoji: "💀" },
  { key: "wholeProduct", emoji: "📦" },
  { key: "beachhead", emoji: "🏖️" },
];

const TORNADO_ITEMS = [
  { key: "herdBehavior", emoji: "🐑" },
  { key: "feedbackLoop", emoji: "🔄" },
  { key: "architectureWar", emoji: "⚔️" },
  { key: "winnerTakeAll", emoji: "🏆" },
];

const DIMENSIONS = [
  { key: "architectureControl", weight: 22, emoji: "🏗️", color: "bg-emerald-50/60" },
  { key: "switchingCosts", weight: 20, emoji: "🔒", color: "bg-emerald-50/60" },
  { key: "marketShare", weight: 18, emoji: "📊", color: "bg-blue-50/60" },
  { key: "networkEffects", weight: 15, emoji: "🌐", color: "bg-blue-50/60" },
  { key: "ecosystemControl", weight: 13, emoji: "🤝", color: "bg-yellow-50/60" },
  { key: "revenueGrowth", weight: 6, emoji: "📈", color: "bg-gray-50" },
  { key: "marketConcentration", weight: 6, emoji: "🎯", color: "bg-gray-50" },
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

export default async function LearnPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "learn" });

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

      {/* ══════ ④ Anatomy — 7 Dimensions ══════ */}
      <section>
        <h2 className="mb-3">{t("anatomyTitle")}</h2>
        <div className="toss-card !bg-[#E8F0FE]/60 ring-1 ring-[#0064FF]/10 mb-5">
          <p className="text-gray-800 text-sm leading-relaxed font-bold">{t("anatomyThesis")}</p>
        </div>
        <div className="space-y-3">
          {DIMENSIONS.map((dim) => (
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
      </section>

      {/* ══════ ⑤ Classification Tiers ══════ */}
      <section>
        <h2 className="mb-3">{t("tiersTitle")}</h2>
        <p className="text-gray-500 text-sm font-medium mb-6">{t("tiersSubtitle")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TIERS.map((tier) => {
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
                    <div className="font-extrabold text-gray-900">{t(`tiers.${tier.key}.name`)}</div>
                    <span className={`toss-pill ${signalColor}`}>{signal}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-2">{t(`tiers.${tier.key}.desc`)}</p>
                <span className="text-xs font-bold text-gray-400">{t("source", { book: t(`tiers.${tier.key}.book`) })}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════ ⑥ 10 Investment Principles ══════ */}
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
