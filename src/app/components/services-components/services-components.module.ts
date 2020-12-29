import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceFormComponent } from './service-form/service-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ServicePricesFormComponent } from './service-prices-form/service-prices-form.component';
import { ServiceProductFormComponent } from './service-product-form/service-product-form.component';


@NgModule({
  declarations: [ServiceFormComponent, ServicePricesFormComponent, ServiceProductFormComponent],
  exports: [ServiceFormComponent, ServicePricesFormComponent, ServiceProductFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ServicesComponentsModule { }
