import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyFormComponent } from './currency-form/currency-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [CurrencyFormComponent],
  exports: [CurrencyFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CurrenciesComponentsModule { }
