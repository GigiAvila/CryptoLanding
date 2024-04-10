export type ApiCoinGraphicalCurrencyResponse = ApiGraphicalCurrencyData;

export interface ApiGraphicalCurrencyData {
  market_caps: [number, number][];
  prices: [number, number][];
  total_volumes: [number, number][];
}
