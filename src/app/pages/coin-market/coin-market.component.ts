import { Component, OnInit } from '@angular/core'
import { CoinService } from '../../core/services/coin.service'
import { CommonModule } from '@angular/common'
import { Coin } from '../../core/services/models/coins.model'
import { Router } from '@angular/router'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'

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

  constructor(private coinService: CoinService, private router: Router) {}

  ngOnInit(): void {
    this.getAllData()
  }

  gotoDetails(coinId: string) {
    this.router.navigate(['coin-detail', coinId])
  }

  getAllData() {
    this.coinService.getCurrency(this.currency).subscribe((res) => {
      this.marketData = res
      this.totalPages = Array.from(
        { length: Math.ceil(this.marketData.length / this.itemsPerPage) },
        (_, i) => i + 1
      )
      this.filteredData = [...this.marketData]
    })
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
    console.log(value)
    if (this.marketData) {
      this.filteredData = this.marketData.filter((coin) =>
        coin.name.toLowerCase().includes(value.toLowerCase())
      )
    }
    this.currentPage = 1
  }
}
