import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCashRegistersComponent } from './list-cash-registers/list-cash-registers.component';
import { CreateCashRegisterComponent } from './create-cash-register/create-cash-register.component';
import { DialogEditCashRegister, ShowCashRegisterComponent } from './show-cash-register/show-cash-register.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { CashRegistersComponentsModule } from 'src/app/components/cash-registers-components/cash-registers-components.module';
import { RouterModule } from '@angular/router';

const ROUTE = [
  { path: '', component: ListCashRegistersComponent
  },
  {
    path : 'create',
    component : CreateCashRegisterComponent
  },
  {
    path : 'show/:id',
    component : ShowCashRegisterComponent
  },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTE),
    SharedModule,
    CashRegistersComponentsModule
  ],
  declarations: [ListCashRegistersComponent, CreateCashRegisterComponent, ShowCashRegisterComponent, DialogEditCashRegister]
})
export class CashRegistersModule { }
