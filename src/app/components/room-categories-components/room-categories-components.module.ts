import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomCategoryFormComponent } from './room-category-form/room-category-form.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [RoomCategoryFormComponent],
  exports: [RoomCategoryFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class RoomCategoriesComponentsModule { }
