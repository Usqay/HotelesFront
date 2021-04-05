import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductPricesFormComponent } from './product-prices-form/product-prices-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [ProductFormComponent, ProductPricesFormComponent],
  exports: [ProductFormComponent, ProductPricesFormComponent]
})
export class ProductsComponentsModule { }
