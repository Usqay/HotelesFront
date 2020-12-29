import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreHouseFormComponent } from './store-house-form/store-house-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [StoreHouseFormComponent],
  exports: [StoreHouseFormComponent],
})
export class StoreHousesComponentsModule { }
