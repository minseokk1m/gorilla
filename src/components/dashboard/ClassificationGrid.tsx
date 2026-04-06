"use client";
import type { Firm } from "@/types/firm";
import type { ClassificationResult, ClassificationTier } from "@/types/classification";
import type { PriceHistory } from "@/types/market";
import FirmCard from "@/components/firms/FirmCard";
import { useTranslations } from "next-intl";

const TIERS: ClassificationTier[] = ["Gorilla", "Potential Gorilla", "King", "Prince", "Serf", "Chimpanzee", "Monkey", "In Chasm"];

const TIER_EMOJIS: Record<ClassificationTier, string> = {
  "Gorilla":           "🦍",
  "Potential Gorilla": "🦍",
  "King":              "👑",
  "Prince":            "🤴",
  "Serf":              "⛏️",
  "Chimpanzee":        "🐵",
  "Monkey":            "🐒",
  "In Chasm":          "🕳️",
};

interface Props {
  firms: Firm[];
  classifications: Map<string, ClassificationResult>;
  priceHistories: Map<string, PriceHistory>;
}

export default function ClassificationGrid({ firms, classifications, priceHistories }: Props) {
  const t = useTranslations("tiers");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {TIERS.map((tier) => {
        const tierFirms = firms.filter((f) => classifications.get(f.id)?.tier === tier);
        const emoji = TIER_EMOJIS[tier];
        const label = t(`${tier}.label` as "Gorilla.label");
        const desc = t(`${tier}.desc` as "Gorilla.desc");
        return (
          <div key={tier}>
            <div className="mb-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <span>{emoji}</span> {label}
                <span className="ml-auto text-xs text-gray-400 font-normal">{tierFirms.length}</span>
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
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
                <div className="col-span-2 py-6 text-center text-gray-400 text-sm border border-dashed border-gray-200 rounded-lg">
                  —
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
