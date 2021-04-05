import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Currency } from 'src/app/shared/interfaces/currency';
import { People } from 'src/app/shared/interfaces/people';
import { Sale } from 'src/app/shared/interfaces/sale';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { SalesService } from 'src/app/shared/services/sales.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-create-sale',
  templateUrl: './create-sale.component.html',
  styleUrls: ['./create-sale.component.scss']
})
export class CreateSaleComponent implements OnInit {

  items: any[] = []
  activeItem: any = null
  showPayment : boolean = false
  showConsumption : boolean = false
  baseCurrency : Currency = null
  totalPrice : number = 0
  payment : any = null
  reservationRoom = null

  people: People = null

  saleSubscription : Subscription = null

  constructor(private userService : UserService,
    private salesService : SalesService,
    private errorService : ErrorService,
    private alert : AlertService) { }

  ngOnInit(): void {
    this.items = []
    this.activeItem = null
    this.totalPrice = 0
    this.payment = null
    this.reservationRoom = null
    this.people = null
    this.baseCurrency = this.userService.enviroment('base_currency')
  }

  ngOnDestroy(){
    if(this.saleSubscription != null) this.saleSubscription.unsubscribe()
  }

  onAddProduct(item: any) {
    const newItem = {
      ...item,
      price: item.price,
      quantity: 1,
    }
    this.activeItem = newItem

    const index = this.items.findIndex(i => {
      if (i.product != null) {
        return i.product.name == newItem.product.name && i.product.id == newItem.product.id
      }
    })

    if (index == -1) this.items.unshift(newItem)
    else this.items[index] = newItem
    this.calculateTotals()
  }

  onAddService(item: any) {
    const newItem = {
      ...item,
      price: item.price,
      quantity: 1,
    }
    this.activeItem = newItem

    const index = this.items.findIndex(i => {
      if (i.service != null) {
        return i.service.name == newItem.service.name && i.service.id == newItem.service.id
      }
    })

    if (index == -1) this.items.unshift(newItem)
    else this.items[index] = newItem
    this.calculateTotals()
  }

  incrementOrDecrement(item, increment = false) {
    if (increment) {
      item.quantity++
    } else {
      if (item.quantity > 1) item.quantity--
    }
    this.calculateTotals()
  }

  calculateTotalPrice(item) {
    return item.price * item.quantity
  }

  deleteItem(index) {
    this.items.splice(index, 1)
    this.calculateTotals()
  }

  calculateTotals() {
    this.totalPrice = 0
    this.items.forEach(i => {
      this.totalPrice += this.calculateTotalPrice(i) * i.rateValue
    })
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2))
  }

  onSubmitWithPayment() {

    if(this.totalPrice > 750 && this.people == null){
      this.alert.warning('Para montos mayores a 750, necesita completar los datos del cliente')
    }else{
      this.alert.loading()

      const sale: Sale = {}

      sale.products = this.items.filter(i => 'product' in i)
        .map(i => {
          return {
            product_id: i.product.id,
            currency_id: i.currency.id,
            price: parseFloat(i.price),
            quantity: i.quantity,
            rate_value : i.rateValue
          }
        });

      sale.services = this.items.filter(i => 'service' in i)
        .map(i => {
          return {
            service_id: i.service.id,
            currency_id: i.currency.id,
            price: parseFloat(i.price),
            quantity: i.quantity,
            rate_value : i.rateValue
          }
        });

      sale.people = this.people;
      sale.totals = [{
        currency_id : this.baseCurrency.id,
        total : this.totalPrice
      }]
      sale.payments = [this.payment]

      // console.log(sale)

      this.saleSubscription = this.salesService.create(sale)
      .subscribe((data : any) => {
        if(data.data.success == true){
          this.alert.success()
          this.showConsumption = false
          this.showPayment = false

          var win = window.open();
          win.document.open();
          win.document.write(data.data.imprimir);
          win.document.close();
          win.focus();
          this.ngOnInit()
        }else{
          this.alert.error('Ooops', data.data.error)
        }
      }, error => {
        this.alert.error('Ooops', this.errorService.make(error.error))
      })
    }

  }

  onSubmitWithConsumption() {
    this.alert.loading()

    const sale: Sale = {}

    sale.products = this.items.filter(i => 'product' in i)
      .map(i => {
        return {
          product_id: i.product.id,
          currency_id: i.currency.id,
          price: parseFloat(i.price),
          quantity: i.quantity,
          rate_value : i.rateValue
        }
      });

    sale.services = this.items.filter(i => 'service' in i)
      .map(i => {
        return {
          service_id: i.service.id,
          currency_id: i.currency.id,
          price: parseFloat(i.price),
          quantity: i.quantity,
          rate_value : i.rateValue
        }
      });

    sale.totals = [{
      currency_id : this.baseCurrency.id,
      total : this.totalPrice
    }]
    sale.payments = []
    sale.reservation_id = this.reservationRoom.reservation_id
    sale.room_id = this.reservationRoom.room_id

    this.saleSubscription = this.salesService.create(sale)
    .subscribe((data : any) => {

      if(data.data.success == true){
        this.alert.success()
        this.showConsumption = false
        this.showPayment = false

        this.ngOnInit()
      }else{
        this.alert.error('Ooops', data.data.error)
      }
    }, error => {
      this.alert.error('Ooops', this.errorService.make(error.error))
    })

  }

  onPayment() {
    this.showPayment = true
    this.activeItem = null
  }

  onConsumption() {
    this.showConsumption = true
    this.activeItem = null
  }

}
