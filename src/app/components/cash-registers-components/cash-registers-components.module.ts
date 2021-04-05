import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashRegisterFormComponent } from './cash-register-form/cash-register-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [CashRegisterFormComponent],
  exports: [CashRegisterFormComponent],
})
export class CashRegistersComponentsModule { }
