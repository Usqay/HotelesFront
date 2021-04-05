import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {ScrollPanelModule} from 'primeng/scrollpanel';

declare var jQuery: any;

@Component({
  selector: 'app-sidebartabcontent',
  template: `
  <div class="layout-submenu-content" (click)="onClick($event)">
      <p-scrollPanel #scroller [style]="{height: '100%'}">
          <div class="menu-scroll-content">
              <ng-content></ng-content>
          </div>
      </p-scrollPanel>
  </div>
`
})
export class SidebartabcontentComponent implements AfterViewInit {

  @ViewChild('scroller') layoutMenuScrollerViewChild: ScrollPanelModule;

    ngAfterViewInit() {
       //setTimeout(() => { this.layoutMenuScrollerViewChild.moveBar(); }, 100);
    }

    onClick(event: Event) {
        setTimeout(() => {
            //this.layoutMenuScrollerViewChild.moveBar();
        }, 450);
    }

}
