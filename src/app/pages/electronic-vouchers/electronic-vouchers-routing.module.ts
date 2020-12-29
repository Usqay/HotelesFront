import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElectronicVouchersComponent } from './electronic-vouchers.component';
import { ListElectronicVouchersComponent } from './list-electronic-vouchers/list-electronic-vouchers.component';

const routes: Routes = [
  {
    path: '', 
    component: ElectronicVouchersComponent,
    children : [
      {
        path : '',
        component : ListElectronicVouchersComponent
      },
      // {
      //   path : 'show/:id',
      //   component : Show
      // },
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
export class ElectronicVouchersRoutingModule { }
