"use client";
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from "recharts";
import type { PriceHistory } from "@/types/market";

export default function StockChart({ priceHistory }: { priceHistory: PriceHistory }) {
  const data = priceHistory.candles.map((c) => ({
    date: c.date.slice(5),
    close: c.close,
    volume: c.volume / 1_000_000,
    open: c.open,
    high: c.high,
    low: c.low,
  }));

  const prices = data.map((d) => d.close);
  const minPrice = Math.min(...prices) * 0.98;
  const maxPrice = Math.max(...prices) * 1.02;

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis dataKey="date" tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} interval={14} />
          <YAxis yAxisId="price" domain={[minPrice, maxPrice]} tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v.toFixed(0)}`} width={50} />
          <YAxis yAxisId="vol" orientation="right" tick={false} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: "#a1a1aa" }}
            itemStyle={{ color: "#e4e4e7" }}
            formatter={(value, name) => {
              const v = typeof value === "number" ? value : 0;
              if (name === "close") return [`$${v.toFixed(2)}`, "Close"];
              if (name === "volume") return [`${v.toFixed(1)}M`, "Volume"];
              return [value, String(name)];
            }}
          />
          <Bar yAxisId="vol" dataKey="volume" fill="#3f3f46" opacity={0.5} />
          <Line yAxisId="price" type="monotone" dataKey="close" stroke="#10b981" strokeWidth={2} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
