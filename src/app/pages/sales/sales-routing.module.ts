import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSaleComponent } from './create-sale/create-sale.component';
import { ListSalesComponent } from './list-sales/list-sales.component';
import { SalesComponent } from './sales.component';
import { ShowSaleComponent } from './show-sale/show-sale.component';

const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
    children : [
      {
        path : '',
        component : ListSalesComponent
      },
      {
        path : 'create',
        component : CreateSaleComponent
      },
      {
        path : 'show/:id',
        component : ShowSaleComponent
      },
      {
        path : '**',
        pathMatch : 'full',
        redirectTo : ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
