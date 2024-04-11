import { Coin } from '../models/coins.model';
import { ApiCoin, ApiCoinsResponse } from '../models/api-coins.model';
import {
  ApiCoinDetail,
  ApiCoinDetailsResponse,
} from '../models/api-coinDetail';
import { CoinDetail } from '../models/coinDetail';
import {
  ApiCoinGraphicalCurrencyResponse,
  ApiGraphicalCurrencyData,
} from '../models/api-graphicalCurrencyData';
import { GraphicalCurrencyData } from '../models/graphicalCurrencyData';

export function transformApiCoinResponse(
  apiCoinsResponse: ApiCoinsResponse
): Coin[] {
  return apiCoinsResponse.map((ApiCoin) => transformApiCoin(ApiCoin));
}

export function transformApiCoin(apiCoin: ApiCoin): Coin {
  return {
    current_price: apiCoin.current_price,
    id: apiCoin.id,
    image: apiCoin.image,
    market_cap_change_percentage_24h: apiCoin.market_cap_change_percentage_24h,
    name: apiCoin.name,
    price_change_24h: apiCoin.price_change_24h,
    price_change_percentage_24h: apiCoin.price_change_percentage_24h,
    symbol: apiCoin.symbol,
  };
}

export function transformApiCoinDetailResponse(
  apiCoinDetailsResponse: ApiCoinDetailsResponse
): CoinDetail {
  return transformApiCoinDetails(apiCoinDetailsResponse);
}

export function transformApiCoinDetails(
  apiCoinDetail: ApiCoinDetail
): CoinDetail {
  return {
    description: apiCoinDetail.description,
    image: apiCoinDetail.image,
    name: apiCoinDetail.name,
    market_cap_rank: apiCoinDetail.market_cap_rank,
    market_data: {
      current_price: apiCoinDetail.market_data.current_price,
      market_cap: apiCoinDetail.market_data.market_cap,
    },
  };
}
export function transformApiCoinGraphicalCurrencyResponse(
  apiCoinGraphicalCurrencyResponse: ApiCoinGraphicalCurrencyResponse
): GraphicalCurrencyData {
  return transformApiCoinGraphicalCurrency(apiCoinGraphicalCurrencyResponse);
}

export function transformApiCoinGraphicalCurrency(
  apiGraphicalCurrencyData: ApiGraphicalCurrencyData
): GraphicalCurrencyData {
  return {
    prices: apiGraphicalCurrencyData.prices,
  };
}
