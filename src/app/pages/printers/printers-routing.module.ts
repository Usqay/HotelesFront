import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePrinterComponent } from './create-printer/create-printer.component';
import { ListPrintersComponent } from './list-printers/list-printers.component';
import { PrintersComponent } from './printers.component';
import { ShowPrinterComponent } from './show-printer/show-printer.component';

const routes: Routes = [
  {
    path: '', 
    component: PrintersComponent,
    children : [
      {
        path : '',
        component : ListPrintersComponent
      },
      {
        path : 'create',
        component : CreatePrinterComponent
      },
      {
        path : 'show/:id',
        component : ShowPrinterComponent
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
export class PrintersRoutingModule { }
