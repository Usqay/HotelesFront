import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleFormComponent } from './role-form/role-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { RolePermissionsComponent } from './role-permissions/role-permissions.component';



@NgModule({
  declarations: [RoleFormComponent, RolePermissionsComponent],
  exports: [RoleFormComponent, RolePermissionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class RolesComponentsModule { }
