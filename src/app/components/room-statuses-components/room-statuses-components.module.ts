import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomStatusFormComponent } from './room-status-form/room-status-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [RoomStatusFormComponent],
  exports: [RoomStatusFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class RoomStatusesComponentsModule { }
