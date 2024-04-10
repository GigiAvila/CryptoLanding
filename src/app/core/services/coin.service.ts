import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map, tap } from 'rxjs';
import { Coin } from './models/coins.model';
import { ApiCoin, ApiCoinsResponse } from './models/api-coins.model';
import {
  transformApiCoin,
  transformApiCoinDetailResponse,
  transformApiCoinResponse,
} from './helpers/coin.helpers';
import { ApiCoinDetailsResponse } from './models/api-coinDetail';
import { CoinDetail } from './models/coinDetail';
import { ApiCoinGraphicalCurrencyResponse } from './models/api-graphicalCurrencyData';
import { GraphicalCurrencyData } from './models/graphicalCurrencyData';

@Injectable({
  providedIn: 'root',
})
export class CoinService {
  constructor(private http: HttpClient) {}

  public getCurrency(currency: string): Observable<Coin[]> {
    return this.http
      .get<ApiCoinsResponse>(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false`
      )
      .pipe(
        map((apiCoinsResponse) => transformApiCoinResponse(apiCoinsResponse))
      );
  }

  public getTrendingCurrency(currency: string): Observable<Coin[]> {
    return this.http
      .get<ApiCoinsResponse>(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h
        `
      )
      .pipe(
        map((apiCoinsResponse) => transformApiCoinResponse(apiCoinsResponse))
      );
  }

  public getCurrencyById(coinId: string): Observable<CoinDetail> {
    return this.http
      .get<ApiCoinDetailsResponse>(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      )
      .pipe(
        tap((data) => {
          console.log('Datos devueltos por la API:', data),
            transformApiCoinDetailResponse(data);
        })
      );
  }

  public getGraphicalCurrencyData(
    coinId: string,
    days: number
  ): Observable<GraphicalCurrencyData> {
    return this.http.get<ApiCoinGraphicalCurrencyResponse>(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=USD&days=${days.toString()}`
    );
  }
}
