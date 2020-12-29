import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnsRoutingModule } from './turns-routing.module';
import { TurnsComponent } from './turns.component';
import { ListTurnsComponent } from './list-turns/list-turns.component';
import { CreateTurnComponent } from './create-turn/create-turn.component';
import { ShowTurnComponent } from './show-turn/show-turn.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TurnsComponentsModule } from 'src/app/components/turns-components/turns-components.module';

@NgModule({
  imports: [
    CommonModule,
    TurnsRoutingModule,
    MaterialModule,
    SharedModule,
    TurnsComponentsModule
  ],
  declarations: [TurnsComponent, ListTurnsComponent, CreateTurnComponent, ShowTurnComponent]
})
export class TurnsModule { }
