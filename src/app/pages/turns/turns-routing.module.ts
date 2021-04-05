import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTurnComponent } from './create-turn/create-turn.component';
import { ListTurnsComponent } from './list-turns/list-turns.component';
import { ShowTurnComponent } from './show-turn/show-turn.component';
import { TurnsComponent } from './turns.component';

const routes: Routes = [
  {
    path: '',
    component: TurnsComponent,
    children : [
      {
        path : '',
        component : ListTurnsComponent
      },
      {
        path : 'create',
        component : CreateTurnComponent
      },
      {
        path : 'show/:id',
        component : ShowTurnComponent
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
export class TurnsRoutingModule { }
