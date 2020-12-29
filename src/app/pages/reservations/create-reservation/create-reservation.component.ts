import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReservationGuestResult } from 'src/app/components/reservations-components/reservation-guests/reservation-guests.component';
import { Currency } from 'src/app/interfaces/currency';
import { Reservation } from 'src/app/interfaces/reservation';
import { Room } from 'src/app/interfaces/room';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorService } from 'src/app/services/error.service';
import { ReservationsService } from 'src/app/services/reservations.service';

export interface ReservationRoomTemp {
  room: Room,
  priceType: string,
  priceValue: number,
  endPrice?: number,
  currency: Currency
}

export interface ReservationDurationTime {
  days: number,
  hours: number,
}

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss'],
})
export class CreateReservationComponent implements OnInit {

  activePanel = 'time'
  reservation: Reservation = null
  selectedRooms: ReservationRoomTemp[] = []
  endPricesByCurrencies = []
  durationTime: ReservationDurationTime = { days: 0, hours: 0 }

  storeReservationSubscription: Subscription = null

  constructor(private alert: AlertService,
    private reservationsService: ReservationsService,
    private router: Router,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.activePanel = 'time'
    this.selectedRooms = []
    this.endPricesByCurrencies = []
    this.durationTime = { days: 0, hours: 0 }
    this.reservation = {
      guests: []
    }
  }

  ngOnDestroy() {
    if (this.storeReservationSubscription != null) this.storeReservationSubscription.unsubscribe()
  }

  setReservationTimeAndOrigin(range: { start: Date, end: Date, originId: number }) {
    this.reservation.start_date = range.start
    this.reservation.end_date = range.end
    this.reservation.reservation_origin_id = range.originId
    this.calculateEndPrices()
  }

  addRoom(data: ReservationRoomTemp) {
    const index = this.selectedRooms.findIndex(i => i.room.id == data.room.id)

    if (index > -1) this.selectedRooms[index] = data
    else this.selectedRooms.push(data)
    this.calculateEndPrices()
  }

  deleteRoom(room: Room) {
    this.selectedRooms = this.selectedRooms.filter(i => i.room.id != room.id)
    this.calculateEndPrices()
  }

  onGuestComponentChange(result: ReservationGuestResult) {
    this.reservation.client_id = result.peopleClientId
    this.reservation.guests = result.guests
  }

  validReservation(): boolean {
    let isValid = true

    try {
      if (this.reservation.guests.length == 0) isValid = false
      if (this.selectedRooms.length == 0) isValid = false

      return isValid
    } catch {
      return false
    }
  }

  calculateEndPrices() {
    const start = new Date(this.reservation.start_date);
    const end = new Date(this.reservation.end_date);
    const dateDifference = Math.abs(start.getTime() - end.getTime())
    this.durationTime = {
      days: Math.floor(dateDifference / (1000 * 3600 * 24)),
      hours: Math.ceil(dateDifference / (1000 * 3600))
    }

    if (this.durationTime.hours == 24) {
      this.durationTime.days = 1
    }

    this.reservation.total_days = this.durationTime.days
    this.reservation.total_hours = this.durationTime.hours

    this.endPricesByCurrencies = []

    this.selectedRooms = this.selectedRooms.map(item => {
      const { currency, priceType, priceValue } = item
      let endPrice = 0

      if (priceType == 'day') {
        endPrice = priceValue * this.durationTime.days
      } else {
        endPrice = priceValue * this.durationTime.hours
      }

      const endPriceIndex = this.endPricesByCurrencies.findIndex(i => i.currency.id == currency.id)

      if (endPriceIndex == -1) {
        this.endPricesByCurrencies.push({
          currency: item.currency,
          amount: endPrice
        })
      } else {
        this.endPricesByCurrencies[endPriceIndex].amount += endPrice
      }

      return { ...item, endPrice }
    })

  }

  submitReservation() {
    this.alert.loading()
    const guestIds = this.reservation.guests.map(i => i.id)
    const rooms = this.selectedRooms.map(i => {
      return {
        id: i.room.id,
        price_type: i.priceType,
        price_value: i.priceValue,
        total_price: i.endPrice,
        currency_id: i.currency.id,
      }
    })

    const data = {
      ...this.reservation,
      start_date: this.reservation.start_date.toLocaleString(),
      end_date: this.reservation.end_date.toLocaleString(),
      guests: guestIds,
      rooms: rooms,
      end_prices: this.endPricesByCurrencies.map(i => {
        return {
          currency_id: i.currency.id,
          amount: i.amount
        }
      })
    }

    this.storeReservationSubscription = this.reservationsService.create(data)
      .subscribe((data: any) => {
        this.alert.success()
        this.router.navigate(['/reservations/show', data.data.id])
      }, error => {
        this.alert.error('Ooops', this.errorService.make(error.error))
      })
  }

}
