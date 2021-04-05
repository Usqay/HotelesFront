import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DailyOperationsComponent } from './daily-operations.component';
import { TurnOpeningComponent } from './turn-opening/turn-opening.component';

const routes: Routes = [
  {
    path: '',
    component: DailyOperationsComponent,
    children : [
      {
        path : 'turn-opening',
        component : TurnOpeningComponent
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
export class DailyOperationsRoutingModule { }
