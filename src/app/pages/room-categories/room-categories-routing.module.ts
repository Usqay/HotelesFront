import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateRoomCategoryComponent } from './create-room-category/create-room-category.component';
import { ListRoomCategoriesComponent } from './list-room-categories/list-room-categories.component';

import { RoomCategoriesComponent } from './room-categories.component';
import { ShowRoomCategoryComponent } from './show-room-category/show-room-category.component';

const routes: Routes = [
  {
    path: '',
    component: RoomCategoriesComponent,
    children : [
      {
        path : '',
        component : ListRoomCategoriesComponent
      },
      {
        path : 'create',
        component : CreateRoomCategoryComponent
      },
      {
        path : 'show/:id',
        component : ShowRoomCategoryComponent
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
export class RoomCategoriesRoutingModule { }
