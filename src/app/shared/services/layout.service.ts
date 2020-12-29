import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public config = {
    settings: {
      layout_type: 'ltr',
      sidebar: {
        type: 'compact-wrapper',
        body_type: 'sidebar-icon' 
      },
      sidebar_setting: 'default-sidebar'
    },
    color: {
        color: 'color-1', 
        primary_color: '#27448f', 
        secondary_color: '#0ab2c4', 
        mix_background_layout: 'light',
    }
  }

  constructor() { 
    if(this.config.settings.layout_type == 'rtl') {
      document.getElementsByTagName('html')[0].setAttribute('dir', this.config.settings.layout_type);
    }
  }

}
