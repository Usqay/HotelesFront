import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { ListRoomsComponent } from './list-rooms/list-rooms.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { DialogEditRoom, ShowRoomComponent } from './show-room/show-room.component';
import { MaterialModule } from 'src/app/material.module';
import { RoomsComponentsModule } from 'src/app/components/rooms-components/rooms-components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoomsComponent } from './rooms.component';

@NgModule({
  imports: [
    CommonModule,
    RoomsRoutingModule,
    MaterialModule,
    SharedModule,
    RoomsComponentsModule
  ],
  declarations: [RoomsComponent, ListRoomsComponent, CreateRoomComponent, ShowRoomComponent, DialogEditRoom]
})
export class RoomsModule { }
