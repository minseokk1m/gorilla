"use client";
import type { Signal } from "@/types/classification";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

const CLASS_NAMES: Record<Signal, string> = {
  BUY:   "bg-emerald-100 text-emerald-700 border-emerald-300",
  WATCH: "bg-blue-100 text-blue-700 border-blue-300",
  SELL:  "bg-orange-100 text-orange-700 border-orange-300",
  AVOID: "bg-red-100 text-red-700 border-red-300",
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
