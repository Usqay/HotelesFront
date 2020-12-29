import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CashRegisterMovementsComponent } from './cash-register-movements.component';
import { CreateCashRegisterMovementComponent } from './create-cash-register-movement/create-cash-register-movement.component';
import { ListCashRegisterMovementsComponent } from './list-cash-register-movements/list-cash-register-movements.component';
import { ShowCashRegisterMovementComponent } from './show-cash-register-movement/show-cash-register-movement.component';

const routes: Routes = [
  {
    path: '', 
    component: CashRegisterMovementsComponent,
    children : [
      {
        path : '',
        component : ListCashRegisterMovementsComponent
      },
      {
        path : 'create',
        component : CreateCashRegisterMovementComponent
      },
      // {
      //   path : 'show/:id',
      //   component : ShowCashRegisterMovementComponent
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
export class CashRegisterMovementsRoutingModule { }
