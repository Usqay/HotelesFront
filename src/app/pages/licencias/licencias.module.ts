import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenciasComponent } from './licencias.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from 'src/app/layout/topbar/topbar.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { AppSubMenuComponent, MenuComponent } from 'src/app/layout/menu/menu.component';
import { SidebarComponent } from 'src/app/layout/sidebar/sidebar.component';
import { SidebartabcontentComponent } from 'src/app/layout/sidebar/sidebartabcontent.component';



const ROUTE = [
  { path: '', component: LicenciasComponent },
 // { path: 'create', component: CreateReservationComponent },
  //{ path : 'show/:id', component: ShowReservationComponent },
];


@NgModule({
  declarations: [
    LicenciasComponent,
   

 


 
  ],
  imports: [
    CommonModule,
    SharedModule,  
    RouterModule.forChild(ROUTE)
  ]
})
export class LicenciasModule { }
