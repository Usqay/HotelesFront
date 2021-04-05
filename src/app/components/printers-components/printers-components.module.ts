import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrinterFormComponent } from './printer-form/printer-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [PrinterFormComponent],
  exports: [PrinterFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PrintersComponentsModule { }
