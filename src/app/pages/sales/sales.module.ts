import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListSalesComponent } from './list-sales/list-sales.component';

 import { ShowSaleComponent } from './show-sale/show-sale.component';
 import { SalesComponentsModule } from 'src/app/components/sales-components/sales-components.module';
import { CreateSaleComponent } from './create-sale/create-sale.component';



const ROUTE = [
  { path: '', component: ListSalesComponent },
  { path: 'create', component: CreateSaleComponent },
  { path : 'show/:id', component: ShowSaleComponent },
];


@NgModule({
  declarations: [ListSalesComponent,CreateSaleComponent,ShowSaleComponent/*SalesComponent, , , */],
  imports: [
    CommonModule,
    SharedModule,
    SalesComponentsModule,
    RouterModule.forChild(ROUTE)
  ]
})
export class SalesModule { }
