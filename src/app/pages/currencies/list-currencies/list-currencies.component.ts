import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Currency } from 'src/app/interfaces/currency';
import { AlertService } from 'src/app/services/alert.service';
import { CurrenciesService } from 'src/app/services/currencies.service';

@Component({
  selector: 'app-list-currencies',
  templateUrl: './list-currencies.component.html',
  styleUrls: ['./list-currencies.component.scss']
})
export class ListCurrenciesComponent implements OnInit {

  items : Currency[] = []
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
      key : 'code',
      label : 'Codigo',
      type : 'string',
    },
    {
      key : 'name',
      label : 'Nombre',
      type : 'string',
    },
    {
      key : 'plural_name',
      label : 'Nombre Plural',
      type : 'string',
    },
    // {
    //   key : 'is_base',
    //   label : 'Defecto',
    //   type : 'boolean',
    //   boolean_options :{
    //     1 : 'Sí',
    //     0 : 'No'
    //   }
    // },
    {
      key : 'symbol',
      label : 'Simbolo',
      type : 'string',
    },
    {
      key : 'is_base',
      label : 'Base',
      type : 'toggle',
      toggleEvent : (id, value) => {
        this.onToggleBase(id, value)
      }
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

  constructor(private currenciesService : CurrenciesService,
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
    this.itemsSubscription = this.currenciesService.list(q, this.page, this.paginate)
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
    this.router.navigate(['/currencies/show', itemId]);
  }

  onDelete(itemId){
    this.alert.question('Se eliminará este registro')
    .then(result => {
      if(result.value){
        this.alert.loading()
        this.itemDeleteSubscription = this.currenciesService.delete(itemId)
        .subscribe(data => {
          this.listItems()
        }, error => {
          this.alert.error('Ooops', 'No se pudo eliminar este registro')
        })
      }
    })
  }
  
  onToggleBase(itemId, value){
    this.alert.loading()
    const currency : Currency = {
      is_base : value
    }
    this.itemUpdateSubscription = this.currenciesService.update(itemId, currency)
    .subscribe(data => {
      this.listItems()
    }, error => {
      this.alert.error('Ooops', 'No se pudo actualizar este registro')
    })
  }


}