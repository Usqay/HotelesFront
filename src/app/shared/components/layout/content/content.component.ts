import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as feather from 'feather-icons';
import { LayoutService } from '../../../services/layout.service';
import { NavService } from '../../../services/nav.service';
import { fadeInAnimation } from '../../../data/router-animation/router-animation';
import { UserService } from 'src/app/services/user.service';
import { TurnChange } from 'src/app/interfaces/turn-change';
import { Event, NavigationStart, Router } from '@angular/router';
import { SystemConfiguration } from 'src/app/interfaces/system-configuration';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  animations: [fadeInAnimation]
})
export class ContentComponent implements OnInit, AfterViewInit {

  alerts : any[] = []
  today = new Date().toLocaleString().slice(0,10)

  alertsSubscription : Subscription = null
  
  constructor(public navServices: NavService,
    private userService : UserService,
    private router : Router,
    public layout: LayoutService) {}
    
  ngAfterViewInit() {
    this.showAlerts()
    setTimeout(() => {
      feather.replace();
    });
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
  
  ngOnInit() {
    this.alertsSubscription = this.router.events.subscribe((event : Event) => {
      if (event instanceof NavigationStart) {
        this.showAlerts()
      }
    })
  }

  ngOnDestroy(){
    if(this.alertsSubscription != null) this.alertsSubscription.unsubscribe()
  }

  showAlerts(){
    this.alerts = []
    const enviroments = this.userService.enviroment()
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

  navigateTo(route){
    if(route != null) this.router.navigate([route]);
  }

}
