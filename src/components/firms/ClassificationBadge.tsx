"use client";
import type { ClassificationTier } from "@/types/classification";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

const CLASS_NAMES: Record<ClassificationTier, string> = {
  "Gorilla":           "bg-emerald-100 text-emerald-700 border-emerald-300",
  "Potential Gorilla": "bg-teal-100 text-teal-700 border-teal-300",
  "King":              "bg-blue-100 text-blue-700 border-blue-300",
  "Chimpanzee":        "bg-yellow-100 text-yellow-700 border-yellow-300",
  "Monkey":            "bg-orange-100 text-orange-700 border-orange-300",
  "In Chasm":          "bg-red-100 text-red-700 border-red-300",
};

export default function ClassificationBadge({ tier, size = "default" }: { tier: ClassificationTier; size?: "sm" | "default" | "lg" }) {
  const t = useTranslations("tiers");
  const label = t(`${tier}.label` as "Gorilla.label");
  const className = CLASS_NAMES[tier];
  return (
    <Badge variant="outline" className={`${className} font-medium ${size === "lg" ? "text-sm px-3 py-1" : size === "sm" ? "text-xs" : ""}`}>
      {label}
    </Badge>
  );
}
