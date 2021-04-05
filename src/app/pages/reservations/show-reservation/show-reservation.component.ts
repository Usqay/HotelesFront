import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubSink } from 'subsink';
import { Guest } from 'src/app/shared/interfaces/guest';
import { Reservation } from 'src/app/shared/interfaces/reservation';
import { ReservationGuest } from 'src/app/shared/interfaces/reservation-guest';
import { ReservationRoom } from 'src/app/shared/interfaces/reservation-room';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { ReservationGuestsService } from 'src/app/shared/services/reservation-guests.service';
import { ReservationRoomsService } from 'src/app/shared/services/reservation-rooms.service';
import { ReservationsService } from 'src/app/shared/services/reservations.service';
import { ReservationRoomTemp } from '../create-reservation/create-reservation.component';

@Component({
  selector: 'app-show-reservation',
  templateUrl: './show-reservation.component.html',
  styleUrls: ['./show-reservation.component.scss']
})
export class ShowReservationComponent implements OnInit {

  reservationId : string = null
  activeEdition : string = null
  activePanel = 'reservation'
  today = new Date()
  reservation : Reservation
  private subs = new SubSink();

  constructor(private alert : AlertService,
    private reservationsService : ReservationsService,
    private reservationGuestsService : ReservationGuestsService,
    private reservationRoomsService : ReservationRoomsService,
    private route : ActivatedRoute,
    private errorService : ErrorService) { }

  ngOnInit() {
    this.subs.add(
      this.route.params
      .subscribe(params => {
        this.reservationId = params.id
        this.getReservation()
      })
    );
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  getReservation(){
    this.subs.add(
      this.reservationsService.show(this.reservationId)
      .subscribe(data => {
        this.reservation = data
      }, error => {
        this.alert.error('Ooops', this.errorService.make(error.error))
      })
    );
  }

  changeReservationState(stateId : number){
    this.subs.add(
      this.reservationsService.update(this.reservationId, {reservation_state_id : stateId})
        .subscribe(data => {
          this.alert.success()
          this.getReservation()
        }, error => {
          this.alert.error('Ooops', this.errorService.make(error.error))
        })
    );
  }

  onChangeReservationState(stateId : number){
    let message = ''
    switch(stateId){
      case 2 : message = 'El estado de la reservación será actualizado.'; break;
      case 3 : message = 'El estado de la reservación será actualizado.'; break;
      case 4 : message = 'La reservación será anulada permanentemente.'; break;
    }
    this.alert.question(message)
    .then(result => {
      if(result.isConfirmed){
        this.changeReservationState(stateId)
      }
    })
  }

  addGuest(guest : Guest){
    this.alert.loading()
    const reservationGuest : ReservationGuest = {
      reservation_id : this.reservation.id,
      guest_id : guest.id
    }
    this.subs.add(
      this.reservationGuestsService.create(reservationGuest)
      .subscribe(data =>{
        this.alert.hide()
        this.getReservation()
      }, error =>{
        this.alert.error('Ooops', this.errorService.make(error.error))
      })
    );
  }

  addRoom(reservationRoomTemp : ReservationRoomTemp){
    this.alert.loading()
    const reservationRoom : ReservationRoom = {
      room_id : reservationRoomTemp.room.id,
      reservation_id : this.reservation.id,
      currency_id : reservationRoomTemp.currency.id,
      price_type : reservationRoomTemp.priceType,
      price_value : reservationRoomTemp.priceValue,
    }
    this.subs.add(
      this.reservationRoomsService.create(reservationRoom)
      .subscribe(data => {
        this.alert.hide()
        this.getReservation()
      }, error => {
        this.alert.error('Ooops', this.errorService.make(error.error));
      })
    );
  }

  deleteRoom(reservationRoomId : number){
    this.alert.loading()
    this.subs.add(
      this.reservationRoomsService.delete(reservationRoomId)
      .subscribe(data => {
        this.alert.success('Operación exitosa', 'Habitación eliminada')
        this.getReservation()
      }, error => {
        this.alert.error('Ooops', this.errorService.make(error.error));
      })
    );
  }

}
