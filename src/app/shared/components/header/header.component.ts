import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { NavService, Menu } from '../../services/nav.service';
import { LayoutService } from '../../services/layout.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: []
})
export class HeaderComponent implements OnInit {

  public menuItems: Menu[];
  public elem: any;
  public items: Menu[];
  public megaItems: Menu[];

  public language: boolean = false;
  public search: boolean = false;
  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;
  public text: string;

  public dark: boolean = this.layout.config.color.mix_background_layout == 'dark-only' ? true : false;

  public selectedLanguage: any = {
    language: 'Español',
    code: 'es',
    icon: 'es'
  }

  public languages: any[] = [{
      language: 'English',
      code: 'en',
      type: 'US',
      icon: 'us'
    },
    {
      language: 'Español',
      code: 'es',
      icon: 'es'
    },
    {
      language: 'Français',
      code: 'fr',
      icon: 'fr'
    },
    {
      language: 'Português',
      code: 'pt',
      type: 'BR',
      icon: 'pt'
  }]

  public user : any

  userLogoutSusbcription : Subscription = null

  constructor(private translate: TranslateService, public layout: LayoutService,
    private userService : UserService,
    private alert : AlertService,
    private router : Router,
    public navServices: NavService, @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {
    this.elem = document.documentElement;
    this.navServices.items.subscribe(menuItems => this.items = menuItems);
    this.navServices.megaItems.subscribe(megaItems => this.megaItems = megaItems);
    
    this.user = JSON.parse(localStorage.getItem('_user'))
  }

  ngOnDestroy(){
    if(this.userLogoutSusbcription != null) this.userLogoutSusbcription.unsubscribe()
  }

  changeLanguage(lang) {
    this.translate.use(lang.code)
    this.selectedLanguage = lang;
  }

  megaMenuToggle() {
    this.navServices.megaMenu = !this.navServices.megaMenu;
    this.language = false;
    this.search = false;
    if(window.innerWidth < 991) { 
      this.navServices.collapseSidebar = true;
    }
  }

  languageToggle() {
    this.language = !this.language;
  }

  sidebarToggle() {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
    this.navServices.megaMenu = false;
    this.search = false;
    this.language = false;
  }

  layoutToggle() {
    this.dark = !this.dark;
    this.layout.config.color.mix_background_layout = this.dark ? 'dark-only' : 'light';
  }

  searchToggle() {
    this.search = !this.search;
    this.language = false;
  }

  searchTerm(term: any) {
    term ? this.addFix() : this.removeFix();
    if (!term) return this.menuItems = [];
    let items = [];
    term = term.toLowerCase();
    this.items.filter(menuItems => {
      if (!menuItems?.title) return false
      if (menuItems.title.toLowerCase().includes(term) && menuItems.type === 'link') {
        items.push(menuItems);
      }
      if (!menuItems.children) return false
      menuItems.children.filter(subItems => {
        if (subItems.title.toLowerCase().includes(term) && subItems.type === 'link') {
          subItems.icon = menuItems.icon
          items.push(subItems);
        }
        if (!subItems.children) return false
        subItems.children.filter(suSubItems => {
          if (suSubItems.title.toLowerCase().includes(term)) {
            suSubItems.icon = menuItems.icon
            items.push(suSubItems);
          }
        })
      })
      this.checkSearchResultEmpty(items)
      this.menuItems = items
    });
  }

  checkSearchResultEmpty(items) {
    if (!items.length)
      this.searchResultEmpty = true;
    else
      this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
    document.getElementsByTagName('body')[0].classList.add('offcanvas');
  }

  removeFix() {
    this.searchResult = false;
    this.text = "";
    document.getElementsByTagName('body')[0].classList.remove('offcanvas');
  }

  toggleFullScreen() {
    this.navServices.fullScreen = !this.navServices.fullScreen;
    if (this.navServices.fullScreen) {
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        /* Firefox */
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.elem.webkitRequestFullscreen();
      } else if (this.elem.msRequestFullscreen) {
        /* IE/Edge */
        this.elem.msRequestFullscreen();
      }
    } else {
      if (!this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  // Click Toggle menu
  toggletNavActive(item) {
    if (!item.active) {
      this.megaItems.forEach(a => {
        if (this.megaItems.includes(item)) {
          a.active = false;
        }
        if (!a.children) { return false; }
        a.children.forEach(b => {
          if (a.children.includes(item)) {
            b.active = false;
          }
        });
      });
    }
    item.active = !item.active;
  }

  onLogout(){
    this.alert.loading()
    this.userLogoutSusbcription = this.userService.logout()
    .subscribe(data => {
      this.alert.hide()
      location.reload()
    }, error => this.alert.error())
  }

}
