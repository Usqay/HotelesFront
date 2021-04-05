import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomFormComponent } from './room-form/room-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoomPricesFormComponent } from './room-prices-form/room-prices-form.component';
import { RoomProductsFormComponent } from './room-products-form/room-products-form.component';
import { DialogRoomDetail, RoomsCardListComponent } from './rooms-card-list/rooms-card-list.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
  ],
  declarations: [RoomFormComponent, RoomPricesFormComponent, RoomProductsFormComponent, RoomsCardListComponent, DialogRoomDetail],
  exports: [RoomFormComponent, RoomPricesFormComponent, RoomProductsFormComponent, RoomsCardListComponent, DialogRoomDetail],
})
export class RoomsComponentsModule { }
