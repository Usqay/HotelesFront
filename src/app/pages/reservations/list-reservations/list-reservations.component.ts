import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubSink } from 'subsink';
import { Reservation } from 'src/app/shared/interfaces/reservation';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ReservationsService } from 'src/app/shared/services/reservations.service';


@Component({
  selector: 'app-list-reservations',
  templateUrl: './list-reservations.component.html',
  styleUrls: ['./list-reservations.component.scss']
})
export class ListReservationsComponent implements OnInit {

  items : Reservation[] = []
  totalItems = 0
  page = 1
  paginate = 25

  private subs = new SubSink();
  columns = [
    {
      key : 'id',
      label : 'ID',
      type : 'string',
    },
    {
      key : 'client_name',
      label : 'Cliente',
      type : 'string',
    },
    {
      key : 'start_date',
      label : 'Desde',
      type : 'datetime',
    },
    {
      key : 'end_date',
      label : 'Hasta',
      type : 'datetime',
    },
    {
      key : 'reservation_origin',
      //subkey : 'name',
      label : 'Origen',
      type : 'string',
    },
    {
      key : 'reservation_state',
     // subkey : 'name',
      label : 'Estado',
      type : 'string',
    },
    {
      key : 'options',
      label : '',
      type : 'buttons',
      buttons : [
        {
          icon : 'add',
          tooltip : 'Detalle',
          click : (value) => {
            this.onShow(value)
          }
        },
      ]
    }
  ];

  constructor(private reservationsService : ReservationsService,
    private router : Router,
    private alert : AlertService) { }

  ngOnInit(): void {
    this.listItems()
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  listItems(q = null){
    //this.alert.loading()
    this.subs.add(
      this.reservationsService.listado(q, this.page, this.paginate)
      .subscribe(data => {
        this.items = data.data.map(i => {
          return {
            ...i,
            client_name : (i.client_name) ? i.client_name : 'Cliente generico'
          }
        })
        this.totalItems = data.meta.total
        //this.alert.hide()
      }, error => {
        this.alert.error('Ooops', 'No se pudo cargar la información');
      })
    );
  }

  onChangePage(e){
    this.page = e.pageIndex+1
    this.paginate = e.pageSize
    this.listItems()
  }

  onShow(itemId){
    this.router.navigate(['/reservations/show', itemId]);
  }

  onDelete(itemId){
    this.alert.question('Se eliminará este registro')
    .then(result => {
      if(result.value){

        this.subs.add(
          this.reservationsService.delete(itemId)
          .subscribe(data => {
            this.listItems()
          }, error => {
            this.alert.error('Ooops', 'No se pudo eliminar este registro')
          })
        );
      }
    })
  }
}
