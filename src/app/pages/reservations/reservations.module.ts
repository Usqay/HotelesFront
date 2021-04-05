import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ListReservationsComponent } from './list-reservations/list-reservations.component';
 import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { ReservationsComponentsModule } from 'src/app/components/reservations-components/reservations-components.module';
import { ShowReservationComponent } from './show-reservation/show-reservation.component';


const ROUTE = [
  { path: '', component: ListReservationsComponent },
  { path: 'create', component: CreateReservationComponent },
  { path : 'show/:id', component: ShowReservationComponent },
];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReservationsComponentsModule,
    RouterModule.forChild(ROUTE)
  ],
  declarations: [ListReservationsComponent, CreateReservationComponent,ShowReservationComponent]
})
export class ReservationsModule { }
