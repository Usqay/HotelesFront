import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { DialogEditUser, ShowUserComponent } from './show-user/show-user.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersComponentsModule } from 'src/app/components/users-components/users-components.module';
import { UserPermissionsComponent } from './user-permissions/user-permissions.component';


@NgModule({
  declarations: [UsersComponent, ListUsersComponent, CreateUserComponent, ShowUserComponent, DialogEditUser, UserPermissionsComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    SharedModule,
    UsersComponentsModule
  ]
})
export class UsersModule { }
