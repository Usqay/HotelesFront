import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { ListReservationsComponent } from './list-reservations/list-reservations.component';
import { ReservationsComponent } from './reservations.component';
import { ShowReservationComponent } from './show-reservation/show-reservation.component';

const routes: Routes = [
  {
    path: '',
    component: ReservationsComponent,
    children : [
      {
        path : '',
        component : ListReservationsComponent
      },
      {
        path : 'create',
        component : CreateReservationComponent
      },
      {
        path : 'show/:id',
        component : ShowReservationComponent
      },
      {
        path : '**',
        pathMatch : 'full',
        redirectTo : ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationsRoutingModule { }
