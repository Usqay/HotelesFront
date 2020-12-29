import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomStatusesRoutingModule } from './room-statuses-routing.module';
import { RoomStatusesComponent } from './room-statuses.component';
import { CreateRoomStatusComponent } from './create-room-status/create-room-status.component';
import { ListRoomStatusesComponent } from './list-room-statuses/list-room-statuses.component';
import { DialogEditRoomStatus, ShowRoomStatusComponent } from './show-room-status/show-room-status.component';
import { MaterialModule } from 'src/app/material.module';
import { RoomStatusesComponentsModule } from 'src/app/components/room-statuses-components/room-statuses-components.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [RoomStatusesComponent, CreateRoomStatusComponent, DialogEditRoomStatus, ListRoomStatusesComponent, ShowRoomStatusComponent],
  imports: [
    CommonModule,
    RoomStatusesRoutingModule,
    MaterialModule,
    SharedModule,
    RoomStatusesComponentsModule
  ]
})
export class RoomStatusesModule { }
