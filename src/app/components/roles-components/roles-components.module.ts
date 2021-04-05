import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleFormComponent } from './role-form/role-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolePermissionsComponent } from './role-permissions/role-permissions.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [RoleFormComponent, RolePermissionsComponent],
  exports: [RoleFormComponent, RolePermissionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class RolesComponentsModule { }
