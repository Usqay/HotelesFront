import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemConfigurationsComponent } from './system-configurations.component';

const routes: Routes = [
  {
    path : '',
    component : SystemConfigurationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemConfigurationsRoutingModule { }
