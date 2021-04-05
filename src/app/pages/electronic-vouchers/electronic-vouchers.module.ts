import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListElectronicVouchersComponent } from './list-electronic-vouchers/list-electronic-vouchers.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

const ROUTE = [
  { path: '', component: ListElectronicVouchersComponent }
];


@NgModule({
  declarations: [ ListElectronicVouchersComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTE)
  ]
})
export class ElectronicVouchersModule { }
