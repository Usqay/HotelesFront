import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Turn } from 'src/app/shared/interfaces/turn';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TurnsService } from 'src/app/shared/services/turns.service';

@Component({
  selector: 'app-list-turns',
  templateUrl: './list-turns.component.html',
  styleUrls: ['./list-turns.component.scss']
})
export class ListTurnsComponent implements OnInit {

  items : Turn[] = []
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
      key : 'open_time',
      label : 'Inicio',
      type : 'string',
    },
    {
      key : 'close_time',
      label : 'Fin',
      type : 'string',
    },
    {
      key : 'options',
      label : '',
      type : 'buttons',
      buttons : [
        // {
        //   icon : 'add',
        //   tooltip : 'Detalle',
        //   click : (value) => {
        //     this.onShow(value)
        //   }
        // },
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

  constructor(private turnsService : TurnsService,
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

    this.itemsSubscription = this.turnsService.list(q, this.page, this.paginate)
    .subscribe(data => {
      this.items = data.data
      this.totalItems = data.meta.total

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
    this.router.navigate(['/turns/show', itemId]);
  }

  onDelete(itemId){
    this.alert.question('Se eliminará este registro')
    .then(result => {
      if(result.value){
        this.alert.loading()
        this.itemDeleteSubscription = this.turnsService.delete(itemId)
        .subscribe(data => {
          this.listItems()
        }, error => {
          this.alert.error('Ooops', 'No se pudo eliminar este registro')
        })
      }
    })
  }
}
