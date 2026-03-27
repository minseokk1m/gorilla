import type { Signal } from "@/types/classification";
import { Badge } from "@/components/ui/badge";

const CONFIG: Record<Signal, { label: string; className: string }> = {
  BUY:   { label: "▲ BUY",   className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" },
  WATCH: { label: "◎ WATCH", className: "bg-blue-500/20 text-blue-400 border-blue-500/40" },
  SELL:  { label: "▼ SELL",  className: "bg-orange-500/20 text-orange-400 border-orange-500/40" },
  AVOID: { label: "✕ AVOID", className: "bg-red-500/20 text-red-400 border-red-500/40" },
};

export default function SignalBadge({ signal, size = "default" }: { signal: Signal; size?: "sm" | "default" | "lg" }) {
  const { label, className } = CONFIG[signal];
  return (
    <Badge variant="outline" className={`${className} font-semibold ${size === "lg" ? "text-sm px-3 py-1" : size === "sm" ? "text-xs" : ""}`}>
      {label}
    </Badge>
  );
}
