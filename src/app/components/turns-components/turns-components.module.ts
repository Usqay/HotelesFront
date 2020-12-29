import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnFormComponent } from './turn-form/turn-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [TurnFormComponent],
  exports: [TurnFormComponent]
})
export class TurnsComponentsModule { }
