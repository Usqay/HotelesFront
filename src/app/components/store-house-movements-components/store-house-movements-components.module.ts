import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreHouseMovementFormComponent } from './store-house-movement-form/store-house-movement-form.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsFormComponent } from './products-form/products-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [StoreHouseMovementFormComponent, ProductsFormComponent],
  exports: [StoreHouseMovementFormComponent, ProductsFormComponent]
})
export class StoreHouseMovementsComponentsModule { }
