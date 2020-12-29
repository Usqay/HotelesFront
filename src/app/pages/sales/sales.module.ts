import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { ListSalesComponent } from './list-sales/list-sales.component';
import { CreateSaleComponent } from './create-sale/create-sale.component';
import { ShowSaleComponent } from './show-sale/show-sale.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SalesComponentsModule } from 'src/app/components/sales-components/sales-components.module';


@NgModule({
  declarations: [SalesComponent, ListSalesComponent, CreateSaleComponent, ShowSaleComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MaterialModule,
    SharedModule,
    SalesComponentsModule
  ]
})
export class SalesModule { }
