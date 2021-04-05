import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCurrencyComponent } from './create-currency/create-currency.component';

import { CurrenciesComponent } from './currencies.component';
import { ListCurrenciesComponent } from './list-currencies/list-currencies.component';
import { ShowCurrencyComponent } from './show-currency/show-currency.component';

const routes: Routes = [
  {
    path: '', 
    component: CurrenciesComponent,
    children : [
      {
        path : '',
        component : ListCurrenciesComponent
      },
      {
        path : 'create',
        component : CreateCurrencyComponent
      },
      {
        path : 'show/:id',
        component : ShowCurrencyComponent
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
export class CurrenciesRoutingModule { }
