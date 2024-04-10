export interface CoinDetail {
  description: {
    en: string;
  };
  image: {
    large: string;
    small: string;
    thumb: string;
  };
  name: string;
  market_cap_rank: number;
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
  };
}
