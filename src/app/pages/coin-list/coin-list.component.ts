import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Coin } from '../../core/services/models/coins.model';
import { CoinService } from '../../core/services/coin.service';
import { COIN_MOCK } from './coin-mock';
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

  constructor(private coinService: CoinService) {}

  ngOnInit(): void {
    this.getBannerData();
  }

  getBannerData() {
    console.log('getBannerData...');
    this.coinService.getTrendingCurrency(this.currency).subscribe((res) => {
      console.log(res);
      this.topCurrencies = res;
    });
  }
}
