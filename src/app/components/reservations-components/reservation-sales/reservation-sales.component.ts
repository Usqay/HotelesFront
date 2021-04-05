import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Reservation } from 'src/app/shared/interfaces/reservation';
import { Sale } from 'src/app/shared/interfaces/sale';
import { AlertService } from 'src/app/shared/services/alert.service';
import { SalesService } from 'src/app/shared/services/sales.service';

@Component({
  selector: 'app-reservation-sales',
  templateUrl: './reservation-sales.component.html',
  styleUrls: ['./reservation-sales.component.scss']
})
export class ReservationSalesComponent implements OnInit {
  @Input() reservation: Reservation
  @Output() reload = new EventEmitter<boolean>()

  saleProducts : any[] = []
  saleServices : any[] = []

  getSalesSubscription : Subscription = null

  constructor(private alert : AlertService,
    private salesService : SalesService) { }

  ngOnInit(): void {
    this.getSales()
  }

  ngOnDestroy(){
    if(this.getSalesSubscription != null) this.getSalesSubscription.unsubscribe()
  }

  getSales(){
    this.saleProducts = []
    this.saleServices = []
    this.getSalesSubscription = this.salesService.list(null, 1, 999, this.reservation.id)
    .subscribe(data => {
      data.data.forEach(sale => {
        sale.products.forEach(p => {
          this.saleProducts.push(p)
        })
        sale.services.forEach(s => {
          this.saleServices.push(s)
        })
      })
    }, error =>{
      this.alert.error()
    })
  }

  calculateTotalPrice(item) {
    return item.unit_price * item.quantity
  }

}
