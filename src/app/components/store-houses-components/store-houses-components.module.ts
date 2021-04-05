import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreHouseFormComponent } from './store-house-form/store-house-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [StoreHouseFormComponent],
  exports: [StoreHouseFormComponent],
})
export class StoreHousesComponentsModule { }
