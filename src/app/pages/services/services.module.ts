import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { ListServicesComponent } from './list-services/list-services.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import { DialogEditService, ShowServiceComponent } from './show-service/show-service.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServicesComponentsModule } from 'src/app/components/services-components/services-components.module';


@NgModule({
  declarations: [ServicesComponent, ListServicesComponent, CreateServiceComponent, ShowServiceComponent, DialogEditService],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    SharedModule,
    ServicesComponentsModule
  ]
})
export class ServicesModule { }
