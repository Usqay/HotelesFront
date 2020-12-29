import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  rows = {}
  items = {}

  getRoomsSubscription : Subscription = null
  getDashboardSubscription : Subscription = null

  constructor(private alert : AlertService,
    private dashboardService : DashboardService,
    private router : Router,
    private roomsService : RoomsService) { }

  config: any;
  gstcState: any;
  colorPrimary = "#0F4B81"
  colorSecondary = "#EF6A01"

  ngOnInit() {
    this.getRooms()
  }

  ngOnDestroy(){
    if(this.getRoomsSubscription != null) this.getRoomsSubscription.unsubscribe()
    if(this.getDashboardSubscription != null) this.getDashboardSubscription.unsubscribe()
  }

  private getRooms(){
    this.alert.loading()
    this.getRoomsSubscription = this.roomsService.list(null, 1, 999)
    .subscribe(data => {
      for (let i = 0; i < data.data.length; i++) {
        const room = data.data[i]
        const id = room.id.toString();
        this.rows[id] = {
          id,
          label: "Hab.: " + room.name,
        };
      }

      this.alert.hide()
      this.getDashboard()
    }, error => this.alert.error())
  }

  private getDashboard(){
    this.alert.loading()
    this.getDashboardSubscription = this.dashboardService.dashboard()
    .subscribe((data : any) => {
      data.data.reservations_per_rooms.forEach((i, index) => {
        const start = new Date(i.start_date)
        const end = new Date(i.end_date)
        this.items[index] = {
          id : index,
          label : i.people != '' ? i.people : 'Anonimo',
          rowId : i.room_id.toString(),
          reservationId : i.reservation_id,
          time : {
            start : start.getTime(),
            end : end.getTime(),
          },
          style : {
            background : i.reservation_state_id == 1 ? this.colorSecondary : this.colorPrimary
          }
        }
      });
      this.makeGantt()
      this.alert.hide()
    }, error => this.alert.error())
  }

  private makeGantt(){
    const columns = {
      percent: 100,
      resizer: {
        inRealTime: true
      },
      data: {
        label: {
          id: "label",
          data: "label",
          expander: true,
          isHtml: true,
          width: 230,
          minWidth: 100,
          header: {
            content: "Habitación"
          }
        }
      }
    };

    this.config = {
      height: 800,
      headerHeight: 100,
      list: {
        rows : this.rows,
        columns
      },
      chart: {
        items : this.items
      },
      actions:{
        'chart-timeline-items-row-item':[this.clickAction]
      },
      locale: {
        name: 'es',
        weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split(
          '_'
        ),
        weekdaysShort: 'Dom_Lun_Mar_Mie_Jue_Vie_Sab'.split('_'),
        weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_'),
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split(
          '_'
        ),
        monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
        weekStart: 1,
        relativeTime: {
          future: 'en %s',
          past: '%s atras',
          s: 'unos segundos',
          m: 'un minuto',
          mm: '%d minutos',
          h: 'una hora',
          hh: '%d horas',
          d: 'un día',
          dd: '%d dias',
          M: 'un mes',
          MM: '%d meses',
          y: 'un año',
          yy: '%d años',
        },
        formats: {
          LT: 'HH:mm',
          LTS: 'HH:mm:ss',
          L: 'DD/MM/YYYY',
          LL: 'D MMMM YYYY',
          LLL: 'D MMMM YYYY HH:mm',
          LLLL: 'dddd, D MMMM YYYY HH:mm',
        },
        ordinal: (n: number) => {
          const s = ['', '', '', ''];
          const v = n % 100;
          return `[${n}${s[(v - 20) % 10] || s[v] || s[0]}]`;
        },
      },
    };
  }

  clickAction(element, data){
    const onEventClick = (event) => {
      location.replace(`/#/reservations/show/${data.item.reservationId}`)
    }
    
    element.addEventListener('click', onEventClick);
    
    return {
      update(element, newData){
        data = newData;
      },
      destroy(element,data){
        element.removeEventListener('click', onEventClick);
      }
    }
  }
}