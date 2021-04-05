import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductsComponent } from './products.component';
import { ShowProductComponent } from './show-product/show-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children : [
      {
        path : '',
        component : ListProductsComponent
      },
      {
        path : 'create',
        component : CreateProductComponent
      },
      {
        path : 'show/:id',
        component : ShowProductComponent
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
export class ProductsRoutingModule { }
