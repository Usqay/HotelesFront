import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Currency } from 'src/app/shared/interfaces/currency';
import { Sale } from 'src/app/shared/interfaces/sale';
import { AlertService } from 'src/app/shared/services/alert.service';
import { SalesService } from 'src/app/shared/services/sales.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-show-sale',
  templateUrl: './show-sale.component.html',
  styleUrls: ['./show-sale.component.scss']
})
export class ShowSaleComponent implements OnInit {
  saleId: string
  sale: Sale
  total : number = 0
  baseCurrency : Currency = null

  paramsSubscription: Subscription = null
  showSaleSubscription: Subscription = null

  constructor(private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private userService : UserService,
    private salesService: SalesService) { }

  ngOnInit(): void {
    this.baseCurrency = this.userService.enviroment('base_currency')
    this.paramsSubscription = this.route.params
      .subscribe(params => {
        this.saleId = params.id
        this.showSale()
    })
  }

  ngOnDestroy() {
    if (this.paramsSubscription != null) this.paramsSubscription.unsubscribe()
    if (this.showSaleSubscription != null) this.showSaleSubscription.unsubscribe()
  }

  showSale() {
    this.alert.loading()
    this.total = 0
    this.showSaleSubscription = this.salesService.show(this.saleId)
      .subscribe(data => {
        this.sale = data
        this.total =  this.sale.totals.reduce((a, b) => a + (parseFloat(b['total']) || 0), 0)
        this.alert.hide()
      }, error => {
        this.alert.error()
        this.router.navigate(['/sales'])
      })
  }

  calculateTotalPrice(item) {
    return item.unit_price * item.quantity
  }

}
