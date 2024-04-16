import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Coin } from '../../core/services/models/coins.model';
import { CoinService } from '../../core/services/coin.service';
import { CacheService } from '../../core/services/cache.service';

@Component({
  selector: 'app-coin-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coin-list.component.html',
  styleUrl: './coin-list.component.scss',
})
export class CoinListComponent implements OnInit {
  topCurrencies?: Coin[] = [];
  currency = 'USD';

  constructor(
    private coinService: CoinService,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    this.getBannerData();
  }

  getBannerData() {
    // console.log('getting banner data...');
    if (this.cacheService.has('trending-currency')) {
      const cachedData = this.cacheService.get('trending-currency');
      this.topCurrencies = cachedData;
      // console.log('using my cache in banner data...');
    } else {
      this.coinService.getTrendingCurrency().subscribe((res) => {
        this.cacheService.set('trending-currency', res);
        this.topCurrencies = res;
      });
    }
  }
}
