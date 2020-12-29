import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoomStatus } from 'src/app/interfaces/room-status';
import { AlertService } from 'src/app/services/alert.service';
import { RoomStatusesService } from 'src/app/services/room-statuses.service';

@Component({
  selector: 'app-list-room-statuses',
  templateUrl: './list-room-statuses.component.html',
  styleUrls: ['./list-room-statuses.component.scss']
})
export class ListRoomStatusesComponent implements OnInit {

  items : RoomStatus[] = []
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
      key : 'name',
      label : 'Nombre',
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
        {
          icon : 'delete',
          tooltip : 'Eliminar',
          click : (value) => {
            this.onDelete(value)
          }
        }
      ]
    }
  ];

  constructor(private roomStatusesService : RoomStatusesService,
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
    this.itemsSubscription = this.roomStatusesService.list(q, this.page, this.paginate)
    .subscribe(data => {
      this.items = data.data
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
    this.router.navigate(['/room-statuses/show', itemId]);
  }

  onDelete(itemId){
    this.alert.question('Se eliminará este registro')
    .then(result => {
      if(result.value){
        this.alert.loading()
        this.itemDeleteSubscription = this.roomStatusesService.delete(itemId)
        .subscribe(data => {
          this.listItems()
        }, error => {
          this.alert.error('Ooops', 'No se pudo eliminar este registro')
        })
      }
    })
  }
}
