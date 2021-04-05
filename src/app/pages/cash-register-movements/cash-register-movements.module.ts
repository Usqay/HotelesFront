import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ListCashRegisterMovementsComponent } from './list-cash-register-movements/list-cash-register-movements.component';
import { CreateCashRegisterMovementComponent } from './create-cash-register-movement/create-cash-register-movement.component';
import { ShowCashRegisterMovementComponent } from './show-cash-register-movement/show-cash-register-movement.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



const ROUTE = [
  { path: '', component: ListCashRegisterMovementsComponent
  },
  {
    path : 'create',
    component : CreateCashRegisterMovementComponent
  }

];

@NgModule({
  declarations: [ ListCashRegisterMovementsComponent, CreateCashRegisterMovementComponent, ShowCashRegisterMovementComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTE),

  ]
})
export class CashRegisterMovementsModule { }
