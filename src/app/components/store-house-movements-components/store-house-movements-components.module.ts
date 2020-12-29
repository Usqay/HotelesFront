import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreHouseMovementFormComponent } from './store-house-movement-form/store-house-movement-form.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsFormComponent } from './products-form/products-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [StoreHouseMovementFormComponent, ProductsFormComponent],
  exports: [StoreHouseMovementFormComponent, ProductsFormComponent]
})
export class StoreHouseMovementsComponentsModule { }
