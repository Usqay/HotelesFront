import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { UserPermissionsComponent } from './user-permissions/user-permissions.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children : [
      {
        path : '',
        component : ListUsersComponent
      },
      {
        path : 'create',
        component : CreateUserComponent
      },
      {
        path : 'show/:id',
        component : ShowUserComponent
      },
      {
        path : 'permissions/:id',
        component : UserPermissionsComponent
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
export class UsersRoutingModule { }
