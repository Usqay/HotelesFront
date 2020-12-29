import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Service } from 'src/app/interfaces/service';
import { ServicePrice } from 'src/app/interfaces/service-price';

@Component({
  selector: 'app-service-prices-form',
  templateUrl: './service-prices-form.component.html',
  styleUrls: ['./service-prices-form.component.scss']
})
export class ServicePricesFormComponent implements OnInit {
  @Input() service : Service
  @Output() onSubmit = new EventEmitter<Service>()
  @Output() onCancel = new EventEmitter<any>()

  servicePrices : ServicePrice[] = []

  constructor() { }

  ngOnInit() {
    if(this.service){
      this.servicePrices = this.service.prices
    }
  }
  
  _onSubmit = () => {
    const service : any = {
      ...this.service,
      prices : this.servicePrices.map(i => {
        return {
          currency_id : i.currency.id,
          sale_price : i.sale_price,
        }
      })
    }
    service.sunat_code = service.sunat_code.code
    this.onSubmit.emit(service)
  }

  _onCancel = () => {
    this.onCancel.emit(true)
  }
}
