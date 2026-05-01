"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import type { EcosystemId } from "@/types/ecosystem";

export interface OverlayEcosystemSeries {
  id: EcosystemId;
  name: string;       // localised display name
  color: string;      // hex
  sparkline: number[]; // 12-week normalised series, base 100
  pct4w: number | null;
}

export function EcosystemOverlayChart({
  series,
  locale,
  title,
  subtitle,
}: {
  series: OverlayEcosystemSeries[];
  locale: string;
  title: string;
  subtitle: string;
}) {
  // All ecosystems start enabled; clicking the legend toggles individual lines.
  const [hidden, setHidden] = useState<Set<EcosystemId>>(new Set());
  const visibleSeries = series.filter((s) => !hidden.has(s.id));

  // Pivot per-ecosystem sparkline arrays into a single chart-friendly array.
  // Each row: { day: i, [ecoId]: value, ... }
  const maxLen = Math.max(0, ...visibleSeries.map((s) => s.sparkline.length));
  const chartData = Array.from({ length: maxLen }, (_, i) => {
    const row: Record<string, number | string> = { day: i };
    for (const s of visibleSeries) {
      const v = s.sparkline[i];
      if (typeof v === "number") row[s.id] = v;
    }
    return row;
  });

  function toggle(id: EcosystemId) {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const ko = locale === "ko";

  return (
    <section className="toss-card">
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="!text-base">{title}</h2>
        <span className="text-[0.6875rem] font-bold text-gray-400">{subtitle}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-5">
        {/* Chart */}
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 6, right: 12, left: 0, bottom: 6 }}>
              <CartesianGrid stroke="#f3f4f6" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                tickLine={false}
                axisLine={false}
                ticks={[0, 15, 30, 45, 60]}
                tickFormatter={(d) => (ko ? `${Math.round((d as number) / 5)}주 전` : `${Math.round((d as number) / 5)}w ago`).replace(/^0주 전$|^0w ago$/, ko ? "오늘" : "Now")}
                reversed
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                tickLine={false}
                axisLine={false}
                domain={["auto", "auto"]}
                width={35}
                tickFormatter={(v) => `${v}`}
              />
              <ReferenceLine y={100} stroke="#d1d5db" strokeDasharray="3 3" />
              <Tooltip
                cursor={{ stroke: "#cbd5e1", strokeWidth: 1 }}
                contentStyle={{
                  fontSize: "11px",
                  padding: "6px 8px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                }}
                formatter={(value, name) => {
                  const s = visibleSeries.find((x) => x.id === name);
                  return [Number(value).toFixed(1), s ? s.name : String(name)];
                }}
                labelFormatter={(d) => ko ? `${Math.round(((maxLen - 1) - (d as number)) / 5)}주 전 (index)` : `${Math.round(((maxLen - 1) - (d as number)) / 5)}w ago (index)`}
              />
              {visibleSeries.map((s) => (
                <Line
                  key={s.id}
                  type="monotone"
                  dataKey={s.id}
                  stroke={s.color}
                  strokeWidth={1.75}
                  dot={false}
                  isAnimationActive={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend (clickable) */}
        <div className="space-y-1">
          <div className="text-[0.625rem] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5">
            {ko ? "이코시스템 (클릭으로 표시/숨김)" : "Ecosystems (click to toggle)"}
          </div>
          {series.map((s) => {
            const isHidden = hidden.has(s.id);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => toggle(s.id)}
                className={`flex items-center justify-between w-full gap-2 rounded-lg px-2 py-1.5 text-left transition-colors ${
                  isHidden
                    ? "bg-gray-50 opacity-50 hover:opacity-80"
                    : "bg-white hover:bg-gray-50 ring-1 ring-gray-100"
                }`}
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: isHidden ? "#d1d5db" : s.color }}
                  />
                  <span className="text-xs font-bold text-gray-800 truncate">{s.name}</span>
                </span>
                {s.pct4w !== null && (
                  <span
                    className={`text-[0.6875rem] font-extrabold shrink-0 ${
                      s.pct4w >= 0 ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {s.pct4w > 0 ? "+" : ""}
                    {(s.pct4w * 100).toFixed(1)}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
