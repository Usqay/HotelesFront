import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomStatusesRoutingModule } from './room-statuses-routing.module';
import { RoomStatusesComponent } from './room-statuses.component';
import { CreateRoomStatusComponent } from './create-room-status/create-room-status.component';
import { ListRoomStatusesComponent } from './list-room-statuses/list-room-statuses.component';
import { DialogEditRoomStatus, ShowRoomStatusComponent } from './show-room-status/show-room-status.component';


import { SharedModule } from 'src/app/shared/shared.module';
import { RoomStatusesComponentsModule } from 'src/app/components/room-statuses-components/room-statuses-components.module';


@NgModule({
  declarations: [RoomStatusesComponent, CreateRoomStatusComponent, DialogEditRoomStatus, ListRoomStatusesComponent, ShowRoomStatusComponent],
  imports: [
    CommonModule,
    RoomStatusesRoutingModule,
    SharedModule,
    RoomStatusesComponentsModule
  ]
})
export class RoomStatusesModule { }
