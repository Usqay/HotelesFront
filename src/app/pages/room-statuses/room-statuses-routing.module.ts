import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateRoomStatusComponent } from './create-room-status/create-room-status.component';
import { ListRoomStatusesComponent } from './list-room-statuses/list-room-statuses.component';

import { RoomStatusesComponent } from './room-statuses.component';
import { ShowRoomStatusComponent } from './show-room-status/show-room-status.component';

const routes: Routes = [
  {
    path: '',
    component: RoomStatusesComponent,
    children : [
      {
        path : '',
        component : ListRoomStatusesComponent
      },
      {
        path : 'create',
        component : CreateRoomStatusComponent
      },
      {
        path : 'show/:id',
        component : ShowRoomStatusComponent
      },
      {
        path : '**',
        pathMatch : 'full',
        redirectTo : ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomStatusesRoutingModule { }
