/**
 * Tiny SVG polyline sparkline — server-rendered, no client JS.
 * Auto-scales y to data range, evenly spaces x across `width`.
 */
export function InlineSparkline({
  data,
  width = 72,
  height = 22,
  color,
  strokeWidth = 1.25,
}: {
  data: number[];
  width?: number;
  height?: number;
  color: string;
  strokeWidth?: number;
}) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 1.5;
  const innerH = height - pad * 2;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = pad + innerH - ((v - min) / range) * innerH;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg width={width} height={height} className="block shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
