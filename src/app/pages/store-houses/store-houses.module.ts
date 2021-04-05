import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreHousesRoutingModule } from './store-houses-routing.module';
import { StoreHousesComponent } from './store-houses.component';
import { ListStoreHousesComponent } from './list-store-houses/list-store-houses.component';
import { CreateStoreHouseComponent } from './create-store-house/create-store-house.component';
import { DialogEditStoreHouse, ShowStoreHouseComponent } from './show-store-house/show-store-house.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreHousesComponentsModule } from 'src/app/components/store-houses-components/store-houses-components.module';

@NgModule({
  imports: [
    CommonModule,
    StoreHousesRoutingModule,
    SharedModule,
    StoreHousesComponentsModule
  ],
  declarations: [StoreHousesComponent, ListStoreHousesComponent, DialogEditStoreHouse, CreateStoreHouseComponent, ShowStoreHouseComponent]
})
export class StoreHousesModule { }
