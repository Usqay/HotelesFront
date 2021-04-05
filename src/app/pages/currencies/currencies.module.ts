import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrenciesRoutingModule } from './currencies-routing.module';
import { CurrenciesComponent } from './currencies.component';
import { ListCurrenciesComponent } from './list-currencies/list-currencies.component';
import { CreateCurrencyComponent } from './create-currency/create-currency.component';
import { DialogEditCurrency, ShowCurrencyComponent } from './show-currency/show-currency.component';
import { CurrenciesComponentsModule } from 'src/app/components/currencies-components/currencies-components.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CurrenciesComponent, ListCurrenciesComponent, CreateCurrencyComponent, ShowCurrencyComponent, DialogEditCurrency],
  imports: [
    CommonModule,
    CurrenciesRoutingModule,
    SharedModule,
    CurrenciesComponentsModule
  ]
})
export class CurrenciesModule { }
