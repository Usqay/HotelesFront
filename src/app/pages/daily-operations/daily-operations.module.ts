import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailyOperationsRoutingModule } from './daily-operations-routing.module';
import { DailyOperationsComponent } from './daily-operations.component';
import { TurnOpeningComponent } from './turn-opening/turn-opening.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    DailyOperationsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [DailyOperationsComponent, TurnOpeningComponent]
})
export class DailyOperationsModule { }
