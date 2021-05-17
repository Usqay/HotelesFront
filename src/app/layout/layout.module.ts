import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent, AppSubMenuComponent } from './menu/menu.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebartabcontentComponent } from './sidebar/sidebartabcontent.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    MenuComponent,
    TopbarComponent,
    SidebarComponent,
    AppSubMenuComponent,
    SidebartabcontentComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule.forRoot()
  ],
})
export class LayoutModule { }
