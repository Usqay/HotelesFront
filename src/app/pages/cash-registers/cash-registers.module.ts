import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegistersRoutingModule } from './cash-registers-routing.module';
import { CashRegistersComponent } from './cash-registers.component';
import { ListCashRegistersComponent } from './list-cash-registers/list-cash-registers.component';
import { CreateCashRegisterComponent } from './create-cash-register/create-cash-register.component';
import { DialogEditCashRegister, ShowCashRegisterComponent } from './show-cash-register/show-cash-register.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CashRegistersComponentsModule } from 'src/app/components/cash-registers-components/cash-registers-components.module';

@NgModule({
  imports: [
    CommonModule,
    CashRegistersRoutingModule,
    MaterialModule,
    SharedModule,
    CashRegistersComponentsModule
  ],
  declarations: [CashRegistersComponent, ListCashRegistersComponent, CreateCashRegisterComponent, ShowCashRegisterComponent, DialogEditCashRegister]
})
export class CashRegistersModule { }
