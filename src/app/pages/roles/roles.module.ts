import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { DialogEditRole, ShowRoleComponent } from './show-role/show-role.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RolesComponentsModule } from 'src/app/components/roles-components/roles-components.module';


@NgModule({
  declarations: [RolesComponent, ListRolesComponent, CreateRoleComponent, ShowRoleComponent, DialogEditRole],
  imports: [
    CommonModule,
    RolesRoutingModule,
    MaterialModule,
    SharedModule,
    RolesComponentsModule
  ]
})
export class RolesModule { }
