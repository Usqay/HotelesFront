import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ReservationOrigin } from 'src/app/interfaces/reservation-origin';
import { AlertService } from 'src/app/services/alert.service';
import { ReservationOriginsService } from 'src/app/services/reservation-origins.service';

@Component({
  selector: 'app-reservation-time',
  templateUrl: './reservation-time.component.html',
  styleUrls: ['./reservation-time.component.scss']
})
export class ReservationTimeComponent implements OnInit {
  @Output() reservationTime = new EventEmitter<{start : Date, end : Date, originId : number}>()

  _today = new Date()
  _endDate = new Date()
  form : FormGroup
  reservationOrigins : ReservationOrigin[] = []

  formListenerSubscription : Subscription = null
  getOriginsSubscription : Subscription = null

  constructor(private formBuilder : FormBuilder,
    private alert : AlertService,
    private originsService : ReservationOriginsService) { }

  ngOnInit() {
    this._today.setSeconds(0)
    this._endDate.setHours(23,59,0)
    this.createForm()
    this.getReservationOrigins()
    
    this.reservationTime.emit({
      start : this._today,
      end : this._endDate,
      originId : 1
    })
  }

  ngOnDestroy(){
    if(this.formListenerSubscription != null) this.formListenerSubscription.unsubscribe()
    if(this.getOriginsSubscription != null) this.getOriginsSubscription.unsubscribe()
  }

  createForm(){
    this.form = this.formBuilder.group({
      startDate : this.formBuilder.control(this._today, Validators.required),
      endDate : this.formBuilder.control(this._endDate, Validators.required),
      originId : this.formBuilder.control(1, Validators.required)
    })

    this.formListenerSubscription = this.form.valueChanges
    .subscribe(data => {
      this.onSubmit(data)
    })
  }

  onSubmit(value){
    this.reservationTime.emit({
      start : value.startDate,
      end : value.endDate,
      originId : value.originId
    })
  }
  
  private getReservationOrigins(){
    this.alert.loading()
    this.getOriginsSubscription = this.originsService.list(null,1, 9999)
    .subscribe(data => {
      this.reservationOrigins = data.data
      this.alert.hide()
    }, error => {
      this.alert.error()
    })
  }
}
