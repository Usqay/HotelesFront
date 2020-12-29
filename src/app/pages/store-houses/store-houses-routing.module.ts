import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateStoreHouseComponent } from './create-store-house/create-store-house.component';
import { ListStoreHousesComponent } from './list-store-houses/list-store-houses.component';
import { ShowStoreHouseComponent } from './show-store-house/show-store-house.component';
import { StoreHousesComponent } from './store-houses.component';

const routes: Routes = [
  {
    path: '',
    component: StoreHousesComponent,
    children : [
      {
        path : '',
        component : ListStoreHousesComponent
      },
      {
        path : 'create',
        component : CreateStoreHouseComponent
      },
      {
        path : 'show/:id',
        component : ShowStoreHouseComponent
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
export class StoreHousesRoutingModule { }
