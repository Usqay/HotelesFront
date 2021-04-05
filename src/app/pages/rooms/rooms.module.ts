import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ListRoomsComponent } from './list-rooms/list-rooms.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { DialogEditRoom, ShowRoomComponent } from './show-room/show-room.component';
import { RoomsComponentsModule } from 'src/app/components/rooms-components/rooms-components.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

const ROUTE = [
  { path: '', component: ListRoomsComponent },
  { path: 'create', component: CreateRoomComponent },
  { path : 'show/:id', component: ShowRoomComponent },
];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RoomsComponentsModule,
    RouterModule.forChild(ROUTE)
  ],
  declarations: [ ListRoomsComponent, CreateRoomComponent, ShowRoomComponent, DialogEditRoom]
})
export class RoomsModule { }
