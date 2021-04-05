import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import {SharedModule} from '../../shared/shared.module';

const LOGIN_ROUTE = [
  { path: '', component: DashboardComponent },
];

@NgModule({
  declarations: [
    DashboardComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(LOGIN_ROUTE)



  ],
  providers : [

    ]
})
export class DashboardModule { }
