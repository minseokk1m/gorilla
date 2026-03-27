import type { Firm } from "@/types/firm";
import type { ClassificationResult, ClassificationTier } from "@/types/classification";
import type { PriceHistory } from "@/types/market";
import FirmCard from "@/components/firms/FirmCard";

const TIERS: ClassificationTier[] = ["Gorilla", "Potential Gorilla", "King", "Chimpanzee", "Monkey", "In Chasm"];

const TIER_LABELS: Record<ClassificationTier, { emoji: string; desc: string }> = {
  "Gorilla":           { emoji: "🦍", desc: "Dominant standard-setter. Buy and hold." },
  "Potential Gorilla": { emoji: "🦍", desc: "Competing for the standard. Early entry." },
  "King":              { emoji: "👑", desc: "Market leader, no architecture lock-in." },
  "Chimpanzee":        { emoji: "🐵", desc: "Lost the standard war. Exit position." },
  "Monkey":            { emoji: "🐒", desc: "Commodity clone. No sustainable moat." },
  "In Chasm":          { emoji: "🕳️", desc: "Pre-mainstream. High risk, avoid." },
};

interface Props {
  firms: Firm[];
  classifications: Map<string, ClassificationResult>;
  priceHistories: Map<string, PriceHistory>;
}

export default function ClassificationGrid({ firms, classifications, priceHistories }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {TIERS.map((tier) => {
        const tierFirms = firms.filter((f) => classifications.get(f.id)?.tier === tier);
        const { emoji, desc } = TIER_LABELS[tier];
        return (
          <div key={tier}>
            <div className="mb-3">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <span>{emoji}</span> {tier}
                <span className="ml-auto text-xs text-zinc-500 font-normal">{tierFirms.length} firms</span>
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">{desc}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {tierFirms.slice(0, 4).map((firm) => (
                <FirmCard
                  key={firm.id}
                  firm={firm}
                  classification={classifications.get(firm.id)!}
                  priceHistory={priceHistories.get(firm.id)}
                />
              ))}
              {tierFirms.length === 0 && (
                <div className="col-span-2 py-6 text-center text-zinc-600 text-sm border border-dashed border-zinc-800 rounded-lg">
                  No firms in this tier
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
