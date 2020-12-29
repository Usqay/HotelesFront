import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Reservation } from 'src/app/interfaces/reservation';
import { AlertService } from 'src/app/services/alert.service';
import { ReservationsService } from 'src/app/services/reservations.service';

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
  itemsSubscription : Subscription = null
  itemDeleteSubscription : Subscription = null
  itemUpdateSubscription : Subscription = null

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
      subkey : 'name',
      label : 'Origen',
      type : 'object',
    },
    {
      key : 'reservation_state',
      subkey : 'name',
      label : 'Estado',
      type : 'object',
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
    if(this.itemsSubscription != null) this.itemsSubscription.unsubscribe()
    if(this.itemDeleteSubscription != null) this.itemDeleteSubscription.unsubscribe()
    if(this.itemUpdateSubscription != null) this.itemUpdateSubscription.unsubscribe()
  }

  listItems(q = null){
    this.alert.loading()
    this.itemsSubscription = this.reservationsService.list(q, this.page, this.paginate)
    .subscribe(data => {
      this.items = data.data.map(i => {
        return {
          ...i,
          client_name : (i.client && i.client.people) ? i.client.people.full_name : 'Cliente generico'
        }
      })
      this.totalItems = data.meta.total
      this.alert.hide()
    }, error => {
      this.alert.error('Ooops', 'No se pudo cargar la información');
    })
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
        this.alert.loading()
        this.itemDeleteSubscription = this.reservationsService.delete(itemId)
        .subscribe(data => {
          this.listItems()
        }, error => {
          this.alert.error('Ooops', 'No se pudo eliminar este registro')
        })
      }
    })
  }
}
