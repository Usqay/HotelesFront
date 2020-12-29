import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateRoomComponent } from './create-room/create-room.component';
import { ListRoomsComponent } from './list-rooms/list-rooms.component';
import { RoomsComponent } from './rooms.component';
import { ShowRoomComponent } from './show-room/show-room.component';

const routes: Routes = [
  {
    path: '',
    component: RoomsComponent,
    children : [
      {
        path : '',
        component : ListRoomsComponent
      },
      {
        path : 'create',
        component : CreateRoomComponent
      },
      {
        path : 'show/:id',
        component : ShowRoomComponent
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
export class RoomsRoutingModule { }
