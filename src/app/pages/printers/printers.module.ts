import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintersRoutingModule } from './printers-routing.module';
import { PrintersComponent } from './printers.component';
import { ListPrintersComponent } from './list-printers/list-printers.component';
import { CreatePrinterComponent } from './create-printer/create-printer.component';
import { ShowPrinterComponent } from './show-printer/show-printer.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrintersComponentsModule } from 'src/app/components/printers-components/printers-components.module';


@NgModule({
  declarations: [PrintersComponent, ListPrintersComponent, CreatePrinterComponent, ShowPrinterComponent],
  imports: [
    CommonModule,
    PrintersRoutingModule,
    MaterialModule,
    SharedModule,
    PrintersComponentsModule
  ]
})
export class PrintersModule { }
