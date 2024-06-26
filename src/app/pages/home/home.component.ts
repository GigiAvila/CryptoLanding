import { Component, OnInit } from '@angular/core';
import { Coin } from '../../core/services/models/coins.model';
import { CoinService } from '../../core/services/coin.service';
import { CommonModule } from '@angular/common';
import { CoinListComponent } from '../coin-list/coin-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CoinListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
