import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateServiceComponent } from './create-service/create-service.component';
import { ListServicesComponent } from './list-services/list-services.component';
import { ServicesComponent } from './services.component';
import { ShowServiceComponent } from './show-service/show-service.component';

const routes: Routes = [
  {
    path: '',
    component: ServicesComponent,
    children : [
      {
        path : '',
        component : ListServicesComponent
      },
      {
        path : 'create',
        component : CreateServiceComponent
      },
      {
        path : 'show/:id',
        component : ShowServiceComponent
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
export class ServicesRoutingModule { }
