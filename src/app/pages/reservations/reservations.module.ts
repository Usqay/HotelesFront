import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsComponent } from './reservations.component';
import { ListReservationsComponent } from './list-reservations/list-reservations.component';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { ShowReservationComponent } from './show-reservation/show-reservation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { ReservationsComponentsModule } from 'src/app/components/reservations-components/reservations-components.module';

@NgModule({
  imports: [
    CommonModule,
    ReservationsRoutingModule,
    SharedModule,
    MaterialModule,
    ReservationsComponentsModule
  ],
  declarations: [ReservationsComponent, ListReservationsComponent, CreateReservationComponent, ShowReservationComponent]
})
export class ReservationsModule { }
