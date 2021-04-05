import { Component, OnInit, Renderer2, AfterViewInit, OnDestroy,ChangeDetectorRef  } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Event as eventos}  from '@angular/router';
import { Subscription } from 'rxjs';
import { SystemConfiguration } from '../shared/interfaces/system-configuration';
import { TurnChange } from '../shared/interfaces/turn-change';
import { UserService } from '../shared/services/user.service';

enum MenuOrientation {
  STATIC,
  OVERLAY,
}




@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements AfterViewInit, OnDestroy {

  alerts : any[] = []
  today = new Date().toLocaleString().slice(0,10)

  alertsSubscription : Subscription = null


  activeTabIndex = -1;

  sidebarActive = false;

  layoutMode: MenuOrientation = MenuOrientation.STATIC;

  topbarMenuActive: boolean;

  overlayMenuActive: boolean;

  staticMenuDesktopInactive: boolean;

  staticMenuMobileActive: boolean;

  rotateMenuButton: boolean;

  sidebarClick: boolean;

  topbarItemClick: boolean;

  menuButtonClick: boolean;

  activeTopbarItem: any;

  documentClickListener: Function;

  theme = 'green';

  constructor(public renderer: Renderer2,
    private userService : UserService,
    private router : Router,
    private cdref: ChangeDetectorRef) {}

    ngOnInit() {
      this.alertsSubscription = this.router.events.subscribe((event : eventos) => {
        if (event instanceof NavigationStart) {
          this.showAlerts()
        }
      })
    }


  showAlerts(){
    this.alerts = []
    const enviroments = this.userService.enviroment();
    if (enviroments != null){
      if('turn_change' in enviroments && enviroments.turn_change != null){
        const turnChange : TurnChange = enviroments['turn_change']
        const turnChangeOpenDate = new Date(turnChange.open_date)
        if(turnChangeOpenDate.toLocaleString().slice(0,10) != this.today){
          this.alerts.push({
            title : 'Ningun turno aperturado',
            info: 'No se ha aperturado ningun turno, por lo que no podrá realizar ningúna operación de dinero.',
            link : '/daily-operations/turn-opening'
          })
        }
      }else{
        this.alerts.push({
          title : 'Ningun turno aperturado',
          info: 'No se ha aperturado ningun turno, por lo que no podrá realizar ningúna operación de dinero.',
          link : '/daily-operations/turn-opening'
        })
      }


      if('system_configurations' in enviroments){
        const systemConfigurations : SystemConfiguration[] = enviroments['system_configurations']
        let isConfigurated : boolean = true
        systemConfigurations.forEach(i => {
          if(i.key == 'billing_route' || i.key == 'billing_token' || i.key == 'ballot_series' || i.key == 'invoice_series'){
            if(i.value == 'Replace this value' || i.value == null || i.value == '' || i.value.length < 2){
              isConfigurated = false
            }
          }
        })

        if(!isConfigurated){
          this.alerts.push({
            title : 'Ruta y token no configurados',
            info: 'No podrá emitir boletas o facturas electronicas si no configura una ruta y token de API validos.',
            link : '/system-configurations'
          })
        }

      }
    }
  }

  navigateTo(route){
    if(route != null) this.router.navigate([route]);
  }

  ngAfterViewInit() {
    this.showAlerts()
    setTimeout(() => {
      //feather.replace();
    });

    this.documentClickListener = this.renderer.listen(
      'body',
      'click',
      event => {
        if (!this.topbarItemClick) {
          this.activeTopbarItem = null;
          this.topbarMenuActive = false;
        }

        if (
          !this.menuButtonClick &&
          !this.sidebarClick &&
          (this.overlay || !this.isDesktop())
        ) {
          this.sidebarActive = false;
        }

        this.topbarItemClick = false;
        this.sidebarClick = false;
        this.menuButtonClick = false;
      },
    );

    this.cdref.detectChanges();
  }

  onTabClick(event: Event, index: number) {
    if (this.activeTabIndex === index) {
      this.sidebarActive = !this.sidebarActive;
    } else {
      this.activeTabIndex = index;
      this.sidebarActive = true;
    }

    event.preventDefault();
  }

  closeSidebar(event: Event) {
    this.sidebarActive = false;
    event.preventDefault();
  }

  onSidebarClick(event: Event) {
    this.sidebarClick = true;
  }

  onTopbarMenuButtonClick(event: Event) {
    this.topbarItemClick = true;
    this.topbarMenuActive = !this.topbarMenuActive;

    event.preventDefault();
  }

  onMenuButtonClick(event: Event, index: number) {
    this.menuButtonClick = true;
    this.rotateMenuButton = !this.rotateMenuButton;
    this.topbarMenuActive = false;
    this.sidebarActive = !this.sidebarActive;

    if (this.layoutMode === MenuOrientation.OVERLAY) {
      this.overlayMenuActive = !this.overlayMenuActive;
    } else {
      if (this.isDesktop()) {
        this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
      } else {
        this.staticMenuMobileActive = !this.staticMenuMobileActive;
      }
    }

    if (this.activeTabIndex < 0) {
      this.activeTabIndex = 0;
    }

    event.preventDefault();
  }

  onTopbarItemClick(event: Event, item) {
    this.topbarItemClick = true;

    if (this.activeTopbarItem === item) {
      this.activeTopbarItem = null;
    } else {
      this.activeTopbarItem = item;
    }

    event.preventDefault();
  }

  onTopbarSearchItemClick(event: Event) {
    this.topbarItemClick = true;

    event.preventDefault();
  }

  onTopbarSubItemClick(event) {
    event.preventDefault();
  }

  get overlay(): boolean {
    return this.layoutMode === MenuOrientation.OVERLAY;
  }

  changeToStaticMenu() {
    this.layoutMode = MenuOrientation.STATIC;
  }

  changeToOverlayMenu() {
    this.layoutMode = MenuOrientation.OVERLAY;
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  ngOnDestroy() {
    if (this.documentClickListener) {
      this.documentClickListener();
    }
    if(this.alertsSubscription != null) this.alertsSubscription.unsubscribe()
  }
}
