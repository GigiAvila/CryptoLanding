import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'market',
    loadComponent: () =>
      import('./pages/coin-market/coin-market.component').then(
        (c) => c.CoinMarketComponent
      ),
  },
  {
    path: 'coin-detail/:id',
    loadComponent: () =>
      import('./pages/coin-detail/coin-detail.component').then(
        (c) => c.CoinDetailComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
