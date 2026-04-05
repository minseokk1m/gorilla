"use client";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";
import type { ClassificationScores } from "@/types/classification";

const LABELS: Record<keyof ClassificationScores, string> = {
  marketShare: "Mkt Share",
  switchingCosts: "Switching",
  architectureControl: "Architecture",
  networkEffects: "Network FX",
  ecosystemControl: "Ecosystem",
  revenueGrowth: "Growth",
  marketConcentration: "Concentration",
};

export default function ScoreRadar({ scores }: { scores: ClassificationScores }) {
  const data = (Object.keys(scores) as (keyof ClassificationScores)[]).map((key) => ({
    dimension: LABELS[key],
    score: scores[key],
    benchmark: 80,
  }));

  return (
    <div className="h-52">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#3f3f46" />
          <PolarAngleAxis dataKey="dimension" tick={{ fill: "#a1a1aa", fontSize: 10 }} />
          <Radar name="Score" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={2} />
          <Radar name="Gorilla Benchmark" dataKey="benchmark" stroke="#3f3f46" fill="transparent" strokeDasharray="4 4" />
          <Tooltip
            contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: 8, fontSize: 12 }}
            formatter={(value, name) => [value, name]}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
