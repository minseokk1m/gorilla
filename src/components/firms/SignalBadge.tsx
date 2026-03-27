"use client";
import type { Signal } from "@/types/classification";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

const CLASS_NAMES: Record<Signal, string> = {
  BUY:   "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
  WATCH: "bg-blue-500/20 text-blue-400 border-blue-500/40",
  SELL:  "bg-orange-500/20 text-orange-400 border-orange-500/40",
  AVOID: "bg-red-500/20 text-red-400 border-red-500/40",
};

export default function SignalBadge({ signal, size = "default" }: { signal: Signal; size?: "sm" | "default" | "lg" }) {
  const t = useTranslations("signals");
  const label = t(signal);
  const className = CLASS_NAMES[signal];
  return (
    <Badge variant="outline" className={`${className} font-semibold ${size === "lg" ? "text-sm px-3 py-1" : size === "sm" ? "text-xs" : ""}`}>
      {label}
    </Badge>
  );
}
