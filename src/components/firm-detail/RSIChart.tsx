"use client";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ReferenceArea } from "recharts";

export default function RSIChart({ rsi, dates }: { rsi: (number | null)[]; dates: string[] }) {
  const data = rsi.map((v, i) => ({ date: dates[i]?.slice(5) ?? "", rsi: v })).filter((d) => d.rsi !== null);

  return (
    <div className="h-28">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis dataKey="date" tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} interval={14} />
          <YAxis domain={[0, 100]} tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} axisLine={false} width={30} ticks={[30, 50, 70]} />
          <ReferenceArea y1={70} y2={100} fill="#ef4444" fillOpacity={0.07} />
          <ReferenceArea y1={0} y2={30} fill="#10b981" fillOpacity={0.07} />
          <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="4 4" strokeOpacity={0.5} />
          <ReferenceLine y={30} stroke="#10b981" strokeDasharray="4 4" strokeOpacity={0.5} />
          <Tooltip
            contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: 8, fontSize: 12 }}
            formatter={(value) => [typeof value === "number" ? value.toFixed(1) : value, "RSI(14)"]}
          />
          <Line type="monotone" dataKey="rsi" stroke="#a78bfa" strokeWidth={1.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
