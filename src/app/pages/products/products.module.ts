import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductsComponent } from './products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { DialogEditProduct, ShowProductComponent } from './show-product/show-product.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsComponentsModule } from 'src/app/components/products-components/products-components.module';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    SharedModule,
    ProductsComponentsModule
  ],
  declarations: [ListProductsComponent, DialogEditProduct, ProductsComponent, CreateProductComponent, ShowProductComponent]
})
export class ProductsModule { }
