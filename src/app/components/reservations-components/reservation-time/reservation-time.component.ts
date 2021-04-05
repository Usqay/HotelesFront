import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SubSink } from 'subsink';
import { ReservationOrigin } from 'src/app/shared/interfaces/reservation-origin';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ReservationOriginsService } from 'src/app/shared/services/reservation-origins.service';

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
  private subs = new SubSink();

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
    this.subs.unsubscribe();
  }

  createForm(){
    this.form = this.formBuilder.group({
      startDate : this.formBuilder.control(this._today, Validators.required),
      endDate : this.formBuilder.control(this._endDate, Validators.required),
      originId : this.formBuilder.control(1, Validators.required)
    })

    this.subs.add(
      this.form.valueChanges
      .subscribe(data => {
        this.onSubmit(data)
      })
    );
  }

  onSubmit(value){
    this.reservationTime.emit({
      start : value.startDate,
      end : value.endDate,
      originId : value.originId
    })
  }

  private getReservationOrigins(){

    this.subs.add(
      this.originsService.list(null,1, 9999)
      .subscribe(data => {
        this.reservationOrigins = data.data

      }, error => {
        this.alert.error()
      })
    );
  }
}
