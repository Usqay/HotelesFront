import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomCategoriesRoutingModule } from './room-categories-routing.module';
import { RoomCategoriesComponent } from './room-categories.component';
import { CreateRoomCategoryComponent } from './create-room-category/create-room-category.component';
import { ListRoomCategoriesComponent } from './list-room-categories/list-room-categories.component';
import { DialogEditRoomCategory, ShowRoomCategoryComponent } from './show-room-category/show-room-category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoomCategoriesComponentsModule } from 'src/app/components/room-categories-components/room-categories-components.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RoomCategoriesComponent, CreateRoomCategoryComponent, DialogEditRoomCategory, ListRoomCategoriesComponent, ShowRoomCategoryComponent],
  imports: [
    CommonModule,
    RoomCategoriesRoutingModule,
    SharedModule,
    FormsModule,
    RoomCategoriesComponentsModule
  ]
})
export class RoomCategoriesModule { }
