import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  viewChild
} from '@angular/core'
import { CoinService } from '../../core/services/coin.service'
import { ActivatedRoute, Router } from '@angular/router'
import { CoinDetail } from '../../core/services/models/coinDetail'
import { CommonModule } from '@angular/common'
import { ChartConfiguration, ChartType } from 'chart.js'
import { BaseChartDirective } from 'ng2-charts'
import { Chart } from 'chart.js/auto'

@Component({
  selector: 'app-coin-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coin-detail.component.html',
  styleUrl: './coin-detail.component.scss'
})
export class CoinDetailComponent implements OnInit {
  public chart?: Chart
  coin?: CoinDetail
  coinId: string = ''
  days: number = 30
  currency: string = 'UDS'

  constructor(
    private CoinService: CoinService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.coinId = ''
  }

  public ngOnInit() {
    this.listenRouteParamsChange()
    this.getCoinData()
    this.getGraphData(this.days)

    const data = {
      labels: [],
      datasets: [
        {
          label: `Price Trends`,
          data: [],
          fill: false,
          borderColor: 'rgb(75,192,192)',
          tension: 0.1
        }
      ]
    }

    this.chart = new Chart('chart', {
      type: 'line',
      data
    })
  }

  public listenRouteParamsChange() {
    this.activatedRoute.params.subscribe((params) => {
      this.coinId = params['id']
      if (!this.coinId) {
        return
      }
    })
  }

  getCoinData() {
    this.CoinService.getCurrencyById(this.coinId).subscribe((res) => {
      console.log('getCurrencyById', res)
      this.coin = res
    })
  }

  getGraphData(days: number) {
    this.days = days
    this.CoinService.getGraphicalCurrencyData(this.coinId, this.days).subscribe(
      (res) => {
        console.log('getGraphicalCurrencyData:', res)

        setTimeout(() => {
          if (this.chart) {
            this.chart.update()
          }
        }, 200)

        if (this.chart) {
          this.chart.data.labels = res.prices.map((a: any) => {
            let date = new Date(a[0])
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
                : `${date.getHours()}: ${date.getMinutes()} AM`
            return this.days === 1 ? time : date.toLocaleDateString()
          })

          this.chart.data.datasets[0].data = res.prices.map((a: any) => {
            return a[1]
          })
        }
      },
      (error) => {
        console.error('error', error)
      }
    )
  }
}
