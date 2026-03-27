import type { ClassificationTier } from "@/types/classification";
import { Badge } from "@/components/ui/badge";

const CONFIG: Record<ClassificationTier, { label: string; className: string }> = {
  "Gorilla":           { label: "🦍 Gorilla",          className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" },
  "Potential Gorilla": { label: "🦍 Potential Gorilla", className: "bg-teal-500/20 text-teal-400 border-teal-500/40" },
  "King":              { label: "👑 King",              className: "bg-blue-500/20 text-blue-400 border-blue-500/40" },
  "Chimpanzee":        { label: "🐵 Chimpanzee",        className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40" },
  "Monkey":            { label: "🐒 Monkey",            className: "bg-orange-500/20 text-orange-400 border-orange-500/40" },
  "In Chasm":          { label: "🕳️ In Chasm",         className: "bg-red-500/20 text-red-400 border-red-500/40" },
};

export default function ClassificationBadge({ tier, size = "default" }: { tier: ClassificationTier; size?: "sm" | "default" | "lg" }) {
  const { label, className } = CONFIG[tier];
  return (
    <Badge variant="outline" className={`${className} font-medium ${size === "lg" ? "text-sm px-3 py-1" : size === "sm" ? "text-xs" : ""}`}>
      {label}
    </Badge>
  );
}
