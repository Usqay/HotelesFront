import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportDayliComponent } from './report-dayli/report-dayli.component';
import { ReportReservationsComponent } from './report-reservations/report-reservations.component';
import { ReportRoomsComponent } from './report-rooms/report-rooms.component';
import { ReportSalesComponent } from './report-sales/report-sales.component';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children : [
      {
        path : 'rooms',
        component : ReportRoomsComponent
      },
      {
        path : 'reservations',
        component : ReportReservationsComponent
      },
      {
        path : 'sales',
        component : ReportSalesComponent
      },
      {
        path : 'dayli',
        component : ReportDayliComponent
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
export class ReportsRoutingModule { }
