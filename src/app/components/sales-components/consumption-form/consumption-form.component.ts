import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Reservation } from 'src/app/interfaces/reservation';
import { ReservationRoom } from 'src/app/interfaces/reservation-room';
import { AlertService } from 'src/app/services/alert.service';
import { ReservationsService } from 'src/app/services/reservations.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-consumption-form',
  templateUrl: './consumption-form.component.html',
  styleUrls: ['./consumption-form.component.scss'],
  animations: [
    trigger('hover', [
      state('hoverIn', style({
        backgroundColor: '#0A5C9E',
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
        color: '#fff',
      })),
      state('hoverOut', style({
        backgroundColor: '#ffffff',
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        color: '#2B2B2B',
      })),
      transition('hoverIn => hoverOut', [
        animate('0.25s')
      ]),
      transition('hoverOut => hoverIn', [
        animate('0.1s'),

      ]),
    ]),
    trigger('active', [
      state('active', style({
        backgroundColor: '#0A5C9E',
        color: '#fff',
      })),
      state('inactive', style({
        backgroundColor: '#ffffff',
        color: '#2B2B2B',
      })),
      transition('active => inactive', [
        animate('0.25s')
      ]),
      transition('inactive => active', [
        animate('0.1s'),

      ]),
    ]),
  ]
})
export class ConsumptionFormComponent implements OnInit {
  @Input() total: number = 1
  @Output() onCancel = new EventEmitter<boolean>()
  @Output() onSubmit = new EventEmitter<any>()

  reservations: Reservation[] = []
  reservationRooms: ReservationRoom[] = []

  getReservationsSubscription: Subscription = null

  constructor(private alert: AlertService,
    private reservationsService: ReservationsService) { }

  ngOnInit(): void {
    this.getReservations()
  }

  ngOnDestroy() {
    if (this.getReservationsSubscription != null) this.getReservationsSubscription.unsubscribe()
  }

  private getReservations() {
    this.alert.loading()
    this.getReservationsSubscription = this.reservationsService.list(null, 1, 999, 2)
      .subscribe(data => {
        this.reservations = data.data
        this.reservations.forEach(i => {
          i.rooms.forEach(r => {
            const people = (i.client) ? i.client.people : null
            this.reservationRooms.push({
              ...r,
              people
            })
          })
        })
        this.alert.hide()
      }, error => {
        this.alert.error()
      })
  }

  async selectReservation(reservationRoom) {
    const result = await this.alert.question('Se agregará esta venta a los consumos de la habitación seleccionada', '¿Agregar a la habitación?')
    if(result.value){
      this.onSubmit.emit({
        reservation_id : reservationRoom.reservation_id,
        room_id : reservationRoom.room_id
      })
    }
  }

  _onCancel() {
    this.onCancel.emit(true)
  }

}
