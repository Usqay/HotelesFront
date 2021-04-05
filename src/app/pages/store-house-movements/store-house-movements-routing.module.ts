import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateStoreHouseMovementComponent } from './create-store-house-movement/create-store-house-movement.component';
import { ListStoreHouseMovementsComponent } from './list-store-house-movements/list-store-house-movements.component';
import { ShowStoreHouseMovementComponent } from './show-store-house-movement/show-store-house-movement.component';
import { StoreHouseMovementsComponent } from './store-house-movements.component';

const routes: Routes = [
  {
    path: '',
    component: StoreHouseMovementsComponent,
    children : [
      {
        path : '',
        component : ListStoreHouseMovementsComponent
      },
      {
        path : 'create',
        component : CreateStoreHouseMovementComponent
      },
      {
        path : 'show/:id',
        component : ShowStoreHouseMovementComponent
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
export class StoreHouseMovementsRoutingModule { }
