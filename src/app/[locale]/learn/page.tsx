import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

const PHASES = [
  { phase: "Early Market", emoji: "🌱", color: "border-gray-200 bg-white", desc: "Visionaries and tech enthusiasts buy. No mainstream adoption yet. High risk." },
  { phase: "Chasm", emoji: "🕳️", color: "border-red-200 bg-red-50", desc: "The gap between visionaries and pragmatists. Most companies die here. Avoid investing." },
  { phase: "Bowling Alley", emoji: "🎳", color: "border-yellow-200 bg-yellow-50", desc: "Niche-by-niche adoption begins. A gorilla candidate is forming. Watch closely." },
  { phase: "Tornado", emoji: "🌪️", color: "border-emerald-200 bg-emerald-50", desc: "Explosive mass-market adoption. The gorilla emerges. This is the BUY window." },
  { phase: "Main Street", emoji: "🏙️", color: "border-blue-200 bg-blue-50", desc: "Growth normalizes. Gorilla dominates. Hold your position; switching costs protect you." },
  { phase: "End of Life", emoji: "📉", color: "border-gray-200 bg-gray-50", desc: "New paradigm displacing the old. Exit the gorilla. Find the next tornado." },
];

const TIERS = [
  { tier: "Gorilla", emoji: "🦍", signal: "BUY", color: "border-emerald-200 bg-emerald-50", desc: "Controls the proprietary architecture that becomes the market standard. Competitors must conform to its interfaces. Switching costs are prohibitively high. Investors should buy and hold indefinitely.", book: "The Gorilla Game" },
  { tier: "Potential Gorilla", emoji: "🦍", signal: "BUY", color: "border-teal-200 bg-teal-50", desc: "Competing in a tornado where the standard is not yet decided. Has the technical and market momentum to become the gorilla. Buy now before the market recognizes the winner.", book: "The Gorilla Game" },
  { tier: "King", emoji: "👑", signal: "WATCH", color: "border-blue-200 bg-blue-50", desc: "Market leader in a category without a single proprietary architecture. Has scale advantages but faces credible competition. Generates steady returns but won't compound like a gorilla.", book: "The Gorilla Game" },
  { tier: "Chimpanzee", emoji: "🐵", signal: "SELL", color: "border-yellow-200 bg-yellow-50", desc: "Competed for gorilla status but lost the architecture war. Survives in niche segments but cannot expand into the mainstream. Sell and redeploy into gorillas or potential gorillas.", book: "The Gorilla Game" },
  { tier: "Monkey", emoji: "🐒", signal: "AVOID", color: "border-orange-200 bg-orange-50", desc: "Clones the gorilla architecture at a discount price. Has no sustainable moat — the gorilla can reclaim their customers at will. Do not hold for the long term.", book: "The Gorilla Game" },
  { tier: "In Chasm", emoji: "🕳️", signal: "AVOID", color: "border-red-200 bg-red-50", desc: "Has early adopter enthusiasm but has not crossed to the pragmatist mainstream. Most companies in this position never cross. High risk, avoid until clear beachhead emerges.", book: "Crossing the Chasm" },
];

const BOOKS = [
  {
    title: "Crossing the Chasm",
    subtitle: "3rd Edition (2014)",
    author: "Geoffrey A. Moore",
    keyIdea: "The critical gap between early adopters and the pragmatist early majority. Most tech products die here. The solution: pick one beachhead niche, build a whole product for it, and use that win as a reference to cross into the mainstream.",
    concepts: ["Technology Adoption Life Cycle", "The Chasm", "Whole Product", "Beachhead Strategy", "D-Day Analogy"],
  },
  {
    title: "Inside the Tornado",
    subtitle: "1995",
    author: "Geoffrey A. Moore",
    keyIdea: "What happens after you cross the chasm. The Bowling Alley (niche adoption), the Tornado (explosive mainstream growth), and Main Street (mature market) each require completely different strategies. In the tornado: ship fast, attack competitors, expand channels.",
    concepts: ["Bowling Alley", "Tornado", "Main Street", "Pragmatist Herd Behavior", "+1 Marketing"],
  },
  {
    title: "The Gorilla Game",
    subtitle: "1999",
    author: "Geoffrey A. Moore, Paul Johnson, Tom Kippola",
    keyIdea: "The investment thesis derived from the tornado framework. In every tornado, one company emerges as the gorilla — the architecture standard-setter with compounding competitive advantage. Buy gorillas and potential gorillas. Sell everything else.",
    concepts: ["Gorilla / Chimp / Monkey", "King / Prince / Serf", "Competitive Advantage Period (CAP)", "Architecture Lock-in", "Switching Costs"],
  },
  {
    title: "The New Strategic Selling",
    subtitle: "Revised & Updated",
    author: "Robert B. Miller, Stephen E. Heiman",
    keyIdea: "How enterprise companies win complex B2B deals by identifying all buying influences — Economic Buyer, User Buyers, Technical Buyers, and a Coach. Gorillas dominate not just through technology but through superior coverage of every decision-maker in the customer organization.",
    concepts: ["Complex Sale", "Buying Influences", "Economic Buyer", "Response Modes", "Win-Results", "Sales Funnel", "Red Flags"],
  },
];

export default async function LearnPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "learn" });

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{t("title")}</h1>
        <p className="text-gray-500 max-w-2xl leading-relaxed">{t("subtitle")}</p>
      </div>

      {/* TALC Lifecycle */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">{t("talcTitle")}</h2>
        <p className="text-gray-500 text-sm mb-6">{t("talcSubtitle")}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {PHASES.map((p, i) => (
            <div key={p.phase} className={`border rounded-xl p-4 ${p.color}`}>
              <div className="text-2xl mb-2">{p.emoji}</div>
              <div className="flex items-center gap-1 mb-1">
                <span className="text-xs text-gray-400">{t("stage", { n: i + 1 })}</span>
              </div>
              <div className="font-semibold text-gray-900 text-sm mb-2">{p.phase}</div>
              <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
          <div className="flex-1 h-0.5 bg-gradient-to-r from-gray-200 via-emerald-500 to-gray-200 rounded" />
          <span>{t("timeAxis")}</span>
        </div>
      </section>

      {/* Classification tiers */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">{t("tiersTitle")}</h2>
        <p className="text-gray-500 text-sm mb-6">{t("tiersSubtitle")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TIERS.map((tier) => (
            <div key={tier.tier} className={`border rounded-xl p-5 ${tier.color}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{tier.emoji}</span>
                <div>
                  <div className="font-bold text-gray-900">{tier.tier}</div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    tier.signal === "BUY" ? "bg-emerald-100 text-emerald-700" :
                    tier.signal === "WATCH" ? "bg-blue-100 text-blue-700" :
                    tier.signal === "SELL" ? "bg-orange-100 text-orange-700" :
                    "bg-red-100 text-red-700"
                  }`}>{tier.signal}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">{tier.desc}</p>
              <span className="text-xs text-gray-400">{t("source", { book: tier.book })}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Core investment rules */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">{t("rulesTitle")}</h2>
        <div className="space-y-3">
          {[
            ["Buy a basket, keep the gorilla", "During the bowling alley phase, buy all viable gorilla candidates in a category. As the tornado forms and a winner emerges, consolidate into the gorilla. Sell the chimpanzees."],
            ["Gorilla switching costs compound forever", "Once customers are locked into a gorilla's architecture, switching requires rebuilding workflows, retraining staff, and migrating data — an exponentially expensive proposition that grows with every passing year."],
            ["The tornado is the buy window", "The best time to buy is when you can identify that a market is in the tornado — before the gorilla status is obvious to mainstream investors. After the gorilla is obvious, most of the return is already priced in."],
            ["Never fight the gorilla", "Chimpanzees who directly attack the gorilla force the market to rally behind the incumbent. IBM's OS/2 vs. Windows is the archetypal example. Find a niche instead."],
            ["Sell when the gorilla dies", "Gorillas die when a discontinuous innovation creates a new market with its own tornado. The old gorilla becomes a chimp in the new market. Exit when you see the next paradigm forming."],
          ].map(([rule, explanation]) => (
            <div key={rule as string} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="font-semibold text-gray-900 mb-1">{rule}</div>
              <p className="text-gray-500 text-sm leading-relaxed">{explanation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Books */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">{t("booksTitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {BOOKS.map((b) => (
            <div key={b.title} className="border rounded-xl p-5 bg-white border-gray-200">
              <div className="text-xs text-gray-400 mb-1">{b.subtitle}</div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">{b.title}</h3>
              <div className="text-xs text-gray-400 mb-3">{b.author}</div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{b.keyIdea}</p>
              <div className="space-y-1">
                {b.concepts.map((c) => (
                  <span key={c} className="inline-block text-xs bg-gray-100 text-gray-600 rounded px-2 py-0.5 mr-1 mb-1">{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center py-6">
        <Link href="/firms" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
          {t("viewAllFirms")}
        </Link>
      </div>
    </main>
  );
}
