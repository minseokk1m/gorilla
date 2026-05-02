"use client";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";
import type { ClassificationScores } from "@/types/classification";

// Moore 4기준은 본 thesis(진한 라벨), 우리 클럽 추가 3차원은 보조(*표시 + 흐린 라벨).
const MOORE_KEYS: ReadonlySet<keyof ClassificationScores> = new Set([
  "architectureControl",
  "switchingCosts",
  "networkEffects",
  "ecosystemControl",
]);

const LABELS: Record<keyof ClassificationScores, string> = {
  marketShare: "Mkt Share*",
  switchingCosts: "Switching",
  architectureControl: "Architecture",
  networkEffects: "Network FX",
  ecosystemControl: "Ecosystem",
  revenueGrowth: "Growth*",
  marketConcentration: "Concentration*",
};

export default function ScoreRadar({ scores }: { scores: ClassificationScores }) {
  const data = (Object.keys(scores) as (keyof ClassificationScores)[]).map((key) => ({
    dimension: LABELS[key],
    score: scores[key],
    benchmark: 80,
    isMoore: MOORE_KEYS.has(key),
  }));

  return (
    <div>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#3f3f46" />
            <PolarAngleAxis
              dataKey="dimension"
              tick={(props) => {
                const { x, y, payload, textAnchor } = props as {
                  x: number; y: number; textAnchor: "start" | "middle" | "end" | "inherit";
                  payload: { value: string };
                };
                const isMoore = !payload.value.endsWith("*");
                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor={textAnchor}
                    fill={isMoore ? "#18181b" : "#a1a1aa"}
                    fontSize={10}
                    fontWeight={isMoore ? 700 : 400}
                  >
                    {payload.value}
                  </text>
                );
              }}
            />
            <Radar name="Score" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={2} />
            <Radar name="Gorilla Benchmark" dataKey="benchmark" stroke="#3f3f46" fill="transparent" strokeDasharray="4 4" />
            <Tooltip
              contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: 8, fontSize: 12 }}
              formatter={(value, name) => [value, name]}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-[10px] text-gray-400 mt-1 leading-snug">
        <strong>진한 글씨</strong> = Moore 4기준(본 thesis) · <strong>* 표시</strong> = 우리 클럽 추가 3차원(보조)
      </div>
    </div>
  );
}
