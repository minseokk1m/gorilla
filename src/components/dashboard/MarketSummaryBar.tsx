import type { ClassificationResult } from "@/types/classification";
import type { MarketPhase } from "@/types/classification";

const TIER_COLORS: Record<string, string> = {
  "Gorilla": "text-emerald-400",
  "Potential Gorilla": "text-teal-400",
  "King": "text-blue-400",
  "Chimpanzee": "text-yellow-400",
  "Monkey": "text-orange-400",
  "In Chasm": "text-red-400",
};

const PHASE_COLOR: Record<MarketPhase, string> = {
  "Tornado": "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
  "Bowling Alley": "bg-teal-500/20 text-teal-400 border-teal-500/40",
  "Main Street": "bg-blue-500/20 text-blue-400 border-blue-500/40",
  "Early Market": "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
  "End of Life": "bg-red-500/20 text-red-400 border-red-500/40",
};

export default function MarketSummaryBar({ classifications }: { classifications: ClassificationResult[] }) {
  const tierCounts = classifications.reduce<Record<string, number>>((acc, c) => {
    acc[c.tier] = (acc[c.tier] ?? 0) + 1;
    return acc;
  }, {});

  const buys = classifications.filter((c) => c.signal === "BUY").length;
  const avoids = classifications.filter((c) => ["SELL", "AVOID"].includes(c.signal)).length;

  // Dominant market phase
  const phaseCounts = classifications.reduce<Record<string, number>>((acc, c) => {
    acc[c.marketPhase] = (acc[c.marketPhase] ?? 0) + 1;
    return acc;
  }, {});
  const dominantPhase = Object.entries(phaseCounts).sort((a, b) => b[1] - a[1])[0][0] as MarketPhase;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-wrap items-center gap-6">
      <div>
        <div className="text-xs text-zinc-500 mb-1">Market Phase</div>
        <span className={`text-xs font-semibold px-2 py-1 rounded border ${PHASE_COLOR[dominantPhase]}`}>
          {dominantPhase}
        </span>
      </div>
      <div className="h-8 w-px bg-zinc-800 hidden sm:block" />
      <div className="flex gap-4 flex-wrap">
        {Object.entries(tierCounts).sort((a, b) => b[1] - a[1]).map(([tier, count]) => (
          <div key={tier} className="text-center">
            <div className={`text-lg font-bold ${TIER_COLORS[tier] ?? "text-white"}`}>{count}</div>
            <div className="text-xs text-zinc-500">{tier}</div>
          </div>
        ))}
      </div>
      <div className="h-8 w-px bg-zinc-800 hidden sm:block" />
      <div className="flex gap-6">
        <div className="text-center">
          <div className="text-lg font-bold text-emerald-400">{buys}</div>
          <div className="text-xs text-zinc-500">BUY Signals</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-red-400">{avoids}</div>
          <div className="text-xs text-zinc-500">SELL / AVOID</div>
        </div>
      </div>
      <div className="ml-auto text-xs text-zinc-600 hidden lg:block">
        Based on Geoffrey Moore&apos;s Gorilla Game framework · 50 US tech firms
      </div>
    </div>
  );
}
