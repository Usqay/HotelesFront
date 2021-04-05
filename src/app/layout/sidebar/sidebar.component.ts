import { Component } from '@angular/core';
import { LayoutComponent } from '../layout.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(public app: LayoutComponent) { }

}
