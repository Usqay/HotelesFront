import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form/product-form.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductPricesFormComponent } from './product-prices-form/product-prices-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [ProductFormComponent, ProductPricesFormComponent],
  exports: [ProductFormComponent, ProductPricesFormComponent]
})
export class ProductsComponentsModule { }
