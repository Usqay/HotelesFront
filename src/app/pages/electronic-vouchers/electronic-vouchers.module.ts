import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectronicVouchersRoutingModule } from './electronic-vouchers-routing.module';
import { ElectronicVouchersComponent } from './electronic-vouchers.component';
import { ListElectronicVouchersComponent } from './list-electronic-vouchers/list-electronic-vouchers.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ElectronicVouchersComponent, ListElectronicVouchersComponent],
  imports: [
    CommonModule,
    ElectronicVouchersRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class ElectronicVouchersModule { }
