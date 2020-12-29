import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { DialogRoomDetail, RoomsComponent } from './rooms/rooms.component';
import { MaterialModule } from 'src/app/material.module';
import {
  NgxMatDatetimePickerModule, 
  NgxMatNativeDateModule, 
  NgxMatTimepickerModule 
} from '@angular-material-components/datetime-picker';
import { ReservationTimeComponent } from './reservation-time/reservation-time.component';
import { ReservationGuestsComponent } from './reservation-guests/reservation-guests.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationPaymentsComponent } from './reservation-payments/reservation-payments.component';
import { ReservationSalesComponent } from './reservation-sales/reservation-sales.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ReservationFormComponent, RoomsComponent, ReservationTimeComponent, DialogRoomDetail, ReservationGuestsComponent, ReservationPaymentsComponent, ReservationSalesComponent],
  exports: [ReservationFormComponent, RoomsComponent, ReservationTimeComponent, ReservationGuestsComponent, ReservationPaymentsComponent, ReservationSalesComponent],
})
export class ReservationsComponentsModule { }
