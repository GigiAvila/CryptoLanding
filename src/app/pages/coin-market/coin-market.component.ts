import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { CoinService } from '../../core/services/coin.service'
import { CommonModule } from '@angular/common'
import { Coin } from '../../core/services/models/coins.model'
import { Router } from '@angular/router'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { CacheService } from '../../core/services/cache.service'

@Component({
  selector: 'app-coin-market',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './coin-market.component.html',
  styleUrl: './coin-market.component.scss'
})
export class CoinMarketComponent implements OnInit {
  marketData?: Coin[] = []
  currency = 'USD'
  itemsPerPage: number = 10
  totalPages: number[] = []
  currentPage: number = 1
  filteredData: Coin[] = []
  filterForm = new FormGroup({
    filterInput: new FormControl('')
  })
  // @Output() public addCoinToFavourites: EventEmitter<void> =
  //   new EventEmitter<void>()

  constructor(
    private coinService: CoinService,
    private router: Router,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    this.getAllData()
  }

  gotoDetails(coinId: string) {
    this.router.navigate(['coin-detail', coinId])
  }

  getAllData() {
    // console.log('getting all data...')
    if (this.cacheService.has('all-currencies')) {
      const cachedData = this.cacheService.get('all-currencies')
      // console.log('using my cache in market')
      this.processData(cachedData)
    } else {
      this.coinService.getCurrency().subscribe((res) => {
        this.cacheService.set('all-currencies', res)
        this.processData(res)
      })
    }
  }

  private processData(data: any[]) {
    this.marketData = data
    this.totalPages = Array.from(
      { length: Math.ceil(this.marketData.length / this.itemsPerPage) },
      (_, i) => i + 1
    )
    this.filteredData = [...this.marketData]
  }

  changePage(page: number) {
    this.currentPage = page
  }

  getPageData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    const filterValue = this.filterForm.get('filterInput')?.value
    if (!filterValue) {
      return this.marketData?.slice(startIndex, endIndex)
    }
    const filteredData = this.marketData?.filter((coin) =>
      coin.name.toLowerCase().includes(filterValue.toLowerCase())
    )

    return filteredData?.slice(startIndex, endIndex)
  }

  filterData(value: string) {
    if (this.marketData) {
      this.filteredData = this.marketData.filter((coin) =>
        coin.name.toLowerCase().includes(value.toLowerCase())
      )
    }
    this.currentPage = 1
  }

  // public onAddCoinToFavourites(): void {
  //   this.addCoinToFavourites.emit()
  // }
}
