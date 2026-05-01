"use client";

import { useState } from "react";
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from "recharts";
import type { LayerMomentum, Timeframe } from "@/lib/data/providers/layer-momentum";

const TIMEFRAMES: Timeframe[] = ["1w", "4w", "12w"];

function priceColor(pct: number): string {
  if (pct >= 0.05) return "text-emerald-600";
  if (pct >= 0.01) return "text-emerald-500";
  if (pct <= -0.05) return "text-rose-600";
  if (pct <= -0.01) return "text-rose-500";
  return "text-gray-500";
}

function newsColor(s: number): string {
  if (s >= 0.4) return "text-emerald-600";
  if (s >= 0.1) return "text-emerald-500";
  if (s <= -0.4) return "text-rose-600";
  if (s <= -0.1) return "text-rose-500";
  return "text-gray-500";
}

function fmtPct(p: number): string {
  const sign = p > 0 ? "+" : "";
  return `${sign}${(p * 100).toFixed(1)}%`;
}

function fmtSentiment(s: number, ko: boolean): string {
  if (ko) {
    if (s >= 0.6) return "매우 긍정";
    if (s >= 0.2) return "긍정";
    if (s <= -0.6) return "매우 부정";
    if (s <= -0.2) return "부정";
    return "중립";
  }
  if (s >= 0.6) return "Very positive";
  if (s >= 0.2) return "Positive";
  if (s <= -0.6) return "Very negative";
  if (s <= -0.2) return "Negative";
  return "Neutral";
}

export interface MomentumPanelLabels {
  title: string;
  priceLabel: string;
  newsLabel: string;
  sampleSize: (n: number) => string;
  noData: string;
  tf: Record<Timeframe, string>;
  trendBase: string;
}

export function MomentumPanel({
  m,
  locale,
  labels,
}: {
  m: LayerMomentum;
  locale: string;
  labels: MomentumPanelLabels;
}) {
  const ko = locale === "ko";
  const [tf, setTf] = useState<Timeframe>("4w");
  const price = m.priceMomentumByTimeframe[tf];
  const sparklineData =
    m.priceSparkline?.map((v, i) => ({ x: i, v })) ?? [];
  const sparkColor =
    (m.priceMomentumByTimeframe["12w"] ?? 0) >= 0 ? "#10b981" : "#f43f5e";

  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-3 space-y-2.5 mb-3">
      <div className="flex items-center justify-between">
        <div className="text-[0.625rem] font-extrabold text-gray-500 uppercase tracking-wider">
          {labels.title}
        </div>
        {/* Timeframe toggle */}
        <div className="inline-flex rounded-md bg-white border border-gray-200 p-0.5">
          {TIMEFRAMES.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setTf(opt)}
              className={`px-1.5 py-0.5 text-[0.625rem] font-extrabold rounded-sm transition-colors ${
                tf === opt
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {labels.tf[opt]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        {/* Price (timeframe-aware) */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-gray-500">📈 {labels.priceLabel}</span>
          {price !== null ? (
            <span className={`font-extrabold ${priceColor(price)}`}>
              {fmtPct(price)}
              <span className="font-medium text-gray-400 ml-1">
                ({labels.sampleSize(m.sampleSize.price)})
              </span>
            </span>
          ) : (
            <span className="text-gray-400 font-bold">{labels.noData}</span>
          )}
        </div>

        {/* News (timeframe-independent) */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-gray-500">🗞️ {labels.newsLabel}</span>
          {m.newsSentiment !== null ? (
            <span className={`font-extrabold ${newsColor(m.newsSentiment)}`}>
              {fmtSentiment(m.newsSentiment, ko)}
              <span className="font-medium text-gray-400 ml-1">
                ({labels.sampleSize(m.sampleSize.news)})
              </span>
            </span>
          ) : (
            <span className="text-gray-400 font-bold">{labels.noData}</span>
          )}
        </div>
      </div>

      {/* Sparkline (always 12W window — base 100) */}
      {sparklineData.length > 5 && (
        <div className="pt-2 border-t border-gray-200/60">
          <div className="flex items-center justify-between text-[0.625rem] font-bold text-gray-400 mb-1">
            <span>{labels.trendBase}</span>
          </div>
          <div className="h-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                <YAxis hide domain={["dataMin", "dataMax"]} />
                <Tooltip
                  cursor={{ stroke: "#cbd5e1", strokeWidth: 1 }}
                  contentStyle={{
                    fontSize: "10px",
                    padding: "2px 6px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "4px",
                  }}
                  formatter={(value) => [Number(value).toFixed(1), "Index"]}
                  labelFormatter={() => ""}
                />
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke={sparkColor}
                  strokeWidth={1.5}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
