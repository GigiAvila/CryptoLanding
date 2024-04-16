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
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class CoinService {
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  // public getCurrency(): Observable<Coin[]> {
  //   const cacheKey = `all-currencies`;
  //   console.log('just in case, checking again if i have my own cache ');
  //   if (this.cacheService.has(cacheKey)) {
  //     return this.cacheService.get(cacheKey);
  //   } else {
  //     console.log('nop. ok, i fetch again...');
  //     return this.http
  //       .get<ApiCoinsResponse>(
  //         `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&sparkline=false`
  //       )
  //       .pipe(
  //         tap((apiCoinsResponse) => {
  //           this.cacheService.set(cacheKey, apiCoinsResponse);
  //         }),
  //         map((apiCoinsResponse) => transformApiCoinResponse(apiCoinsResponse))
  //       );
  //   }
  // }

  public getCurrency(): Observable<Coin[]> {
    const cacheKey = `all-currencies`;
    const cachedData = this.cacheService.get(cacheKey);
    // console.log(`checking in my cache if i have something in ${cacheKey} `);
    if (cachedData) {
      // console.log('it seems i have something...');
      return new Observable((observer) => {
        observer.next(cachedData);
        observer.complete();
      });
    } else {
      // console.log('nop. ok, i will fetch again...');
      return this.http
        .get<ApiCoinsResponse>(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&sparkline=false`
        )
        .pipe(
          tap((apiCoinsResponse) => {
            this.cacheService.set(cacheKey, apiCoinsResponse);
          }),
          map((apiCoinsResponse) => transformApiCoinResponse(apiCoinsResponse))
        );
    }
  }

  public getTrendingCurrency(): Observable<Coin[]> {
    const cacheKey = `trending-currency`;
    const cachedData = this.cacheService.get(cacheKey);
    // console.log(`checking in my cache if i have something in ${cacheKey} `);
    if (cachedData) {
      // console.log('it seems i have something...');
      return new Observable((observer) => {
        observer.next(cachedData);
        observer.complete();
      });
    } else {
      return this.http
        .get<ApiCoinsResponse>(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
        )
        .pipe(
          tap((apiCoinsResponse) => {
            this.cacheService.set(cacheKey, apiCoinsResponse);
          }),
          map((apiCoinsResponse) => transformApiCoinResponse(apiCoinsResponse))
        );
    }
  }

  public getCurrencyById(coinId: string): Observable<CoinDetail> {
    const cacheKey = `currency-by-id-${coinId}`;
    const cachedData = this.cacheService.get(cacheKey);
    // console.log(`checking in my cache if i have something in ${cacheKey} `);
    if (cachedData) {
      // console.log('it seems i have something...');
      return new Observable((observer) => {
        observer.next(cachedData);
        observer.complete();
      });
    } else {
      return this.http
        .get<ApiCoinDetailsResponse>(
          `https://api.coingecko.com/api/v3/coins/${coinId}`
        )
        .pipe(
          tap((apiCoinDetailsResponse) => {
            this.cacheService.set(cacheKey, apiCoinDetailsResponse);
          }),
          map((apiCoinDetailsResponse) =>
            transformApiCoinDetailResponse(apiCoinDetailsResponse)
          )
        );
    }
  }

  public getGraphicalCurrencyData(
    coinId: string,
    days: number
  ): Observable<GraphicalCurrencyData> {
    const cacheKey = `graphical-currency-data`;
    if (this.cacheService.has(cacheKey)) {
      return this.cacheService.get(cacheKey);
    } else {
      return this.http.get<ApiCoinGraphicalCurrencyResponse>(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=USD&days=${days.toString()}`
      );
    }
  }
}
