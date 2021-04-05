import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomCategoryFormComponent } from './room-category-form/room-category-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [RoomCategoryFormComponent],
  exports: [RoomCategoryFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class RoomCategoriesComponentsModule { }
