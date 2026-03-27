export function formatMarketCap(billions: number): string {
  if (billions >= 1000) return `$${(billions / 1000).toFixed(1)}T`;
  if (billions >= 1) return `$${billions.toFixed(0)}B`;
  return `$${(billions * 1000).toFixed(0)}M`;
}

export function formatPercent(decimal: number, showSign = false): string {
  const pct = (decimal * 100).toFixed(1);
  if (showSign && decimal > 0) return `+${pct}%`;
  return `${pct}%`;
}

export function formatPrice(price: number): string {
  return price >= 100 ? `$${price.toFixed(0)}` : `$${price.toFixed(2)}`;
}

export function formatScore(score: number): string {
  return score.toFixed(0);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
