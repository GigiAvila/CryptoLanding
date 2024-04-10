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
    ath: apiCoin.ath,
    ath_change_percentage: apiCoin.ath_change_percentage,
    ath_date: apiCoin.ath_date,
    atl: apiCoin.atl,
    atl_change_percentage: apiCoin.atl_change_percentage,
    atl_date: apiCoin.atl_date,
    circulating_supply: apiCoin.circulating_supply,
    current_price: apiCoin.current_price,
    fully_diluted_valuation: apiCoin.fully_diluted_valuation,
    high_24h: apiCoin.high_24h,
    id: apiCoin.id,
    image: apiCoin.image,
    last_updated: apiCoin.last_updated,
    low_24h: apiCoin.low_24h,
    market_cap: apiCoin.market_cap,
    market_cap_change_24h: apiCoin.market_cap_change_24h,
    market_cap_change_percentage_24h: apiCoin.market_cap_change_percentage_24h,
    market_cap_rank: apiCoin.market_cap_rank,
    max_supply: apiCoin.max_supply,
    name: apiCoin.name,
    price_change_24h: apiCoin.price_change_24h,
    price_change_percentage_24h: apiCoin.price_change_percentage_24h,
    price_change_percentage_24h_in_currency:
      apiCoin.price_change_percentage_24h_in_currency,
    roi: apiCoin.roi,
    symbol: apiCoin.symbol,
    total_supply: apiCoin.total_supply,
    total_volume: apiCoin.total_volume,
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
