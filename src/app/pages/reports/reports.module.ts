import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { ReportRoomsComponent } from './report-rooms/report-rooms.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ReportReservationsComponent } from './report-reservations/report-reservations.component';
import { ReportSalesComponent } from './report-sales/report-sales.component';
import { ReportDayliComponent } from './report-dayli/report-dayli.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ReportsComponent, ReportRoomsComponent, ReportReservationsComponent, ReportSalesComponent, ReportDayliComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
  ]
})
export class ReportsModule { }
