import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CashRegistersComponent } from './cash-registers.component';
import { CreateCashRegisterComponent } from './create-cash-register/create-cash-register.component';
import { ListCashRegistersComponent } from './list-cash-registers/list-cash-registers.component';
import { ShowCashRegisterComponent } from './show-cash-register/show-cash-register.component';

const routes: Routes = [
  {
    path: '', 
    component: CashRegistersComponent,
    children : [
      {
        path : '',
        component : ListCashRegistersComponent
      },
      {
        path : 'create',
        component : CreateCashRegisterComponent
      },
      {
        path : 'show/:id',
        component : ShowCashRegisterComponent
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
export class CashRegistersRoutingModule { }
