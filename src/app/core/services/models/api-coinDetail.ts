export type ApiCoinDetailsResponse = ApiCoinDetail;

export interface ApiCoinDetail {
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

  [key: string]: any;
}
