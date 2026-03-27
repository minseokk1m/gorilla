export interface OHLCVCandle {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface PriceHistory {
  firmId: string;
  ticker: string;
  candles: OHLCVCandle[];
  rsi: (number | null)[];
  currentPrice: number;
  priceChange1D: number;
  priceChange1W: number;
  priceChange1M: number;
}
