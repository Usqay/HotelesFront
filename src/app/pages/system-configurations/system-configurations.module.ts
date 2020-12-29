import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemConfigurationsRoutingModule } from './system-configurations-routing.module';
import { SystemConfigurationsComponent } from './system-configurations.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SystemConfigurationsComponent],
  imports: [
    CommonModule,
    SystemConfigurationsRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class SystemConfigurationsModule { }
