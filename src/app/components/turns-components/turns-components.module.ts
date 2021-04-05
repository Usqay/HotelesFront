import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnFormComponent } from './turn-form/turn-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [TurnFormComponent],
  exports: [TurnFormComponent]
})
export class TurnsComponentsModule { }
