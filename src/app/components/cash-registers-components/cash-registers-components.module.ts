import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashRegisterFormComponent } from './cash-register-form/cash-register-form.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [CashRegisterFormComponent],
  exports: [CashRegisterFormComponent],
})
export class CashRegistersComponentsModule { }
