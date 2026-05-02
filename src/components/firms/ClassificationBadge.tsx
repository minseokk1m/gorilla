"use client";
import type { ClassificationTier } from "@/types/classification";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

const CLASS_NAMES: Record<ClassificationTier, string> = {
  "Gorilla":           "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Potential Gorilla": "bg-teal-50 text-teal-700 border-teal-200",
  "King":              "bg-blue-50 text-[#0064FF] border-blue-200",
  "Prince":            "bg-indigo-50 text-indigo-600 border-indigo-200",
  "Serf":              "bg-stone-50 text-stone-600 border-stone-200",
  "Chimpanzee":        "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Monkey":            "bg-orange-50 text-orange-700 border-orange-200",
  "In Chasm":          "bg-red-50 text-red-600 border-red-200",
};

// Pot Gorilla, In Chasm은 Moore 책 6등급에 없는 우리 클럽 보조 라벨 — 큰 사이즈
// (firm detail 등 학습 컨텍스트)에서만 명시 표시.
const AUX_TIERS: ReadonlySet<ClassificationTier> = new Set(["Potential Gorilla", "In Chasm"]);

export default function ClassificationBadge({ tier, size = "default" }: { tier: ClassificationTier; size?: "sm" | "default" | "lg" }) {
  const t = useTranslations("tiers");
  const label = t(`${tier}.label` as "Gorilla.label");
  const className = CLASS_NAMES[tier];
  const isAux = AUX_TIERS.has(tier);
  const auxTitle = isAux
    ? tier === "In Chasm"
      ? "Moore 책 6등급에 없는 위치/상태. 우리 클럽 보조 라벨."
      : "Moore 책 6등급에 없는 보조 라벨. 토네이도 진입 전 후보 표시용."
    : undefined;
  return (
    <span className="inline-flex items-center gap-1.5">
      <Badge
        variant="outline"
        className={`${className} font-bold ${size === "lg" ? "text-sm px-3 py-1 rounded-xl" : size === "sm" ? "text-xs rounded-lg" : "rounded-lg"}`}
        title={auxTitle}
      >
        {label}
      </Badge>
      {isAux && size === "lg" && (
        <span
          className="text-[10px] font-bold text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded-md whitespace-nowrap"
          title={auxTitle}
        >
          클럽 보조 라벨
        </span>
      )}
    </span>
  );
}
