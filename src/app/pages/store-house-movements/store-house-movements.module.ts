import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreHouseMovementsRoutingModule } from './store-house-movements-routing.module';
import { StoreHouseMovementsComponent } from './store-house-movements.component';
import { ListStoreHouseMovementsComponent } from './list-store-house-movements/list-store-house-movements.component';
import { CreateStoreHouseMovementComponent } from './create-store-house-movement/create-store-house-movement.component';
import { ShowStoreHouseMovementComponent } from './show-store-house-movement/show-store-house-movement.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreHouseMovementsComponentsModule } from 'src/app/components/store-house-movements-components/store-house-movements-components.module';


@NgModule({
  imports: [
    CommonModule,
    StoreHouseMovementsRoutingModule,
    SharedModule,
    StoreHouseMovementsComponentsModule
  ],
  declarations: [StoreHouseMovementsComponent, ListStoreHouseMovementsComponent, CreateStoreHouseMovementComponent, ShowStoreHouseMovementComponent]
})
export class StoreHouseMovementsModule { }
