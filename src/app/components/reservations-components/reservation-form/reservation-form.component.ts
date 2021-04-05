import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Reservation } from 'src/app/shared/interfaces/reservation';
import { ReservationOrigin } from 'src/app/shared/interfaces/reservation-origin';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ReservationOriginsService } from 'src/app/shared/services/reservation-origins.service';
import { ReservationsService } from 'src/app/shared/services/reservations.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit {
  @Input() reservation : Reservation
  @Output() reload = new EventEmitter<boolean>()
  @Output() cancel = new EventEmitter<boolean>()

  form : FormGroup
  reservationOrigins : ReservationOrigin[] = []

  formListenerSubscription : Subscription = null
  getOriginsSubscription : Subscription = null
  updateReservaitonSubscription : Subscription = null

  constructor(private formBuilder : FormBuilder,
    private alert : AlertService,
    private reservationService : ReservationsService,
    private originsService : ReservationOriginsService) { }

  ngOnInit() {
    this.createForm()
    this.getReservationOrigins()
  }

  ngAfterViewInit(){
  }

  ngOnDestroy(){
    if(this.formListenerSubscription != null) this.formListenerSubscription.unsubscribe()
    if(this.getOriginsSubscription != null) this.getOriginsSubscription.unsubscribe()
    if(this.updateReservaitonSubscription != null) this.updateReservaitonSubscription.unsubscribe()
  }

  createForm(){
    const start = new Date(this.reservation.start_date);
    const end = new Date(this.reservation.end_date);
    const client_id = this.reservation.client != null ? this.reservation.client.people_id : null
    this.form = this.formBuilder.group({
      start_date : this.formBuilder.control(start, Validators.required),
      end_date : this.formBuilder.control(end, Validators.required),
      client_id : this.formBuilder.control(client_id),
      reservation_origin_id : this.formBuilder.control(this.reservation.reservation_origin_id, Validators.required),
      description : this.formBuilder.control(this.reservation.description),
    })

    this.formListenerSubscription = this.form.valueChanges.subscribe(data => {
      const dateDifference = Math.abs(data.start_date.getTime() - data.end_date.getTime())
      const days = Math.floor(dateDifference / (1000 * 3600 * 24))
      const hours = Math.ceil(dateDifference / (1000 * 3600))
      this.reservation.total_days = days
      this.reservation.total_hours = hours
    })
  }

  private getReservationOrigins(){

    this.getOriginsSubscription = this.originsService.list(null,1, 9999)
    .subscribe(data => {
      this.reservationOrigins = data.data
      this.alert.hide()
    }, error => {
      this.alert.error()
    })
  }

  onSubmit(){
    this.alert.loading()
    const formData = this.form.value
    this.reservation.start_date = formData.start_date
    this.reservation.end_date = formData.end_date
    this.reservation.client_id = formData.client_id
    this.reservation.reservation_origin_id = formData.reservation_origin_id
    this.reservation.description = formData.description

    this.updateReservaitonSubscription = this.reservationService.update(this.reservation.id, {
      ...this.reservation,
      start_date : this.reservation.start_date.toLocaleString(),
      end_date : this.reservation.end_date.toLocaleString()
    })
    .subscribe(data => {
      this.alert.success()
      this.reload.emit(true)
    }, error => {
      this.alert.error('Ooops', 'No se pudo actualizar la reservación')
    })
  }

  onFormCancel(){
    this.cancel.emit(true)
  }

}
