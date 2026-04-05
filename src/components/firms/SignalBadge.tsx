"use client";
import type { Signal } from "@/types/classification";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

const CLASS_NAMES: Record<Signal, string> = {
  BUY:   "bg-emerald-50 text-emerald-700 border-emerald-200",
  WATCH: "bg-blue-50 text-[#0064FF] border-blue-200",
  SELL:  "bg-orange-50 text-orange-700 border-orange-200",
  AVOID: "bg-red-50 text-red-600 border-red-200",
};

export default function SignalBadge({ signal, size = "default" }: { signal: Signal; size?: "sm" | "default" | "lg" }) {
  const t = useTranslations("signals");
  const label = t(signal);
  const className = CLASS_NAMES[signal];
  return (
    <Badge variant="outline" className={`${className} font-bold ${size === "lg" ? "text-sm px-3 py-1 rounded-xl" : size === "sm" ? "text-xs rounded-lg" : "rounded-lg"}`}>
      {label}
    </Badge>
  );
}
