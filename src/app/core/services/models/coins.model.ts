export interface Coin {
  current_price: number;
  id: string;
  image: string;
  price_change_24h: number;
  market_cap_change_percentage_24h: number;
  name: string;
  price_change_percentage_24h: number;
  symbol: string;
  // isFavourite?: boolean;
}
