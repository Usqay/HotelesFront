import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) },
   //Valida licencia para USQAY
   {
    path: 'validar-licencia',
    loadChildren: () => import('./pages/licencias/licencias.module').then(m => m.LicenciasModule),   

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    useHash : true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
