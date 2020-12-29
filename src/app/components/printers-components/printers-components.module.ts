import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrinterFormComponent } from './printer-form/printer-form.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [PrinterFormComponent],
  exports: [PrinterFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PrintersComponentsModule { }
