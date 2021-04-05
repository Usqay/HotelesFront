import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateRoleComponent } from './create-role/create-role.component';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { RolesComponent } from './roles.component';
import { ShowRoleComponent } from './show-role/show-role.component';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
    children : [
      {
        path : '',
        component : ListRolesComponent
      },
      {
        path : 'create',
        component : CreateRoleComponent
      },
      {
        path : 'show/:id',
        component : ShowRoleComponent
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
export class RolesRoutingModule { }
