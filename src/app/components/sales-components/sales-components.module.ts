import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleFormComponent } from './sale-form/sale-form.component';
import { DialogProductOrServiceDetail, SaleProductsComponent } from './sale-products/sale-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SaleClientFormComponent } from './sale-client-form/sale-client-form.component';
import { SalePaymentFormComponent } from './sale-payment-form/sale-payment-form.component';
import { ConsumptionFormComponent } from './consumption-form/consumption-form.component';


@NgModule({
  declarations: [SaleFormComponent, SaleProductsComponent, DialogProductOrServiceDetail, SaleClientFormComponent, SalePaymentFormComponent, ConsumptionFormComponent],
  exports: [SaleFormComponent, SaleProductsComponent, SaleClientFormComponent, SalePaymentFormComponent, ConsumptionFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SalesComponentsModule { }
