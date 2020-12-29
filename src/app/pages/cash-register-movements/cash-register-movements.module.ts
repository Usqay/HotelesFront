import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegisterMovementsRoutingModule } from './cash-register-movements-routing.module';
import { CashRegisterMovementsComponent } from './cash-register-movements.component';
import { ListCashRegisterMovementsComponent } from './list-cash-register-movements/list-cash-register-movements.component';
import { CreateCashRegisterMovementComponent } from './create-cash-register-movement/create-cash-register-movement.component';
import { ShowCashRegisterMovementComponent } from './show-cash-register-movement/show-cash-register-movement.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CashRegisterMovementsComponent, ListCashRegisterMovementsComponent, CreateCashRegisterMovementComponent, ShowCashRegisterMovementComponent],
  imports: [
    CommonModule,
    CashRegisterMovementsRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CashRegisterMovementsModule { }
