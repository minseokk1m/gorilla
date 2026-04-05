"use client";
import type { ClassificationTier } from "@/types/classification";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

const CLASS_NAMES: Record<ClassificationTier, string> = {
  "Gorilla":           "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Potential Gorilla": "bg-teal-50 text-teal-700 border-teal-200",
  "King":              "bg-blue-50 text-[#0064FF] border-blue-200",
  "Chimpanzee":        "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Monkey":            "bg-orange-50 text-orange-700 border-orange-200",
  "In Chasm":          "bg-red-50 text-red-600 border-red-200",
};

export default function ClassificationBadge({ tier, size = "default" }: { tier: ClassificationTier; size?: "sm" | "default" | "lg" }) {
  const t = useTranslations("tiers");
  const label = t(`${tier}.label` as "Gorilla.label");
  const className = CLASS_NAMES[tier];
  return (
    <Badge variant="outline" className={`${className} font-bold ${size === "lg" ? "text-sm px-3 py-1 rounded-xl" : size === "sm" ? "text-xs rounded-lg" : "rounded-lg"}`}>
      {label}
    </Badge>
  );
}
