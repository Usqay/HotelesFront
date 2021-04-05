import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Currency } from 'src/app/shared/interfaces/currency';
import { Room } from 'src/app/shared/interfaces/room';
import { RoomPrice } from 'src/app/shared/interfaces/room-price';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CurrenciesService } from 'src/app/shared/services/currencies.service';

@Component({
  selector: 'app-room-prices-form',
  templateUrl: './room-prices-form.component.html',
  styleUrls: ['./room-prices-form.component.scss']
})
export class RoomPricesFormComponent implements OnInit {
  @Input() room : Room
  @Output() onSubmit = new EventEmitter<Room>()
  @Output() onCancel = new EventEmitter<any>()

  roomPrices : RoomPrice[] = []
  currencies : Currency[] = []

  getCurrenciesSubscription : Subscription = null

  constructor(private currenciesService : CurrenciesService,
    private alert : AlertService) { }

  ngOnInit() {
    this.getCurrencies()
  }

  ngOnDestroy(){
    if(this.getCurrenciesSubscription != null) this.getCurrenciesSubscription.unsubscribe()
  }

  _onSubmit = () => {
    const room : Room = {
      ...this.room,
      room_prices : this.roomPrices.map(i => {
        return {
          currency_id : i.currency.id,
          day_price : i.day_price,
          hour_price : i.hour_price,
        }
      })
    }
    this.onSubmit.emit(room)
  }

  _onCancel = () => {
    this.onCancel.emit(true)
  }

  private getCurrencies(){
    this.alert.loading()
    this.getCurrenciesSubscription = this.currenciesService.list(null, 1, 999)
    .subscribe(data => {
      this.currencies = data.data
      this.alert.hide()
      this.buildList()
    }, error => {
      this.alert.error()
    })
  }

  private buildList(){
    if(this.room){
      this.roomPrices = this.room.room_prices
      this.roomPrices = this.currencies.map(currency => {

        const index = this.room.room_prices.findIndex(i => i.currency.id == currency.id)

        if(index != -1){
          const aux = this.room.room_prices[index]
          return {
            currency_id : currency.id,
            currency : currency,
            day_price : aux.day_price,
            hour_price : aux.hour_price,
          }
        }else{
          return {
            currency_id : currency.id,
            currency : currency,
            day_price : 0,
            hour_price : 0,
          }
        }
      })
    }
  }

}
