import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomStatusFormComponent } from './room-status-form/room-status-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [RoomStatusFormComponent],
  exports: [RoomStatusFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class RoomStatusesComponentsModule { }
