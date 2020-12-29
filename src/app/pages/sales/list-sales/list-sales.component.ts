import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Sale } from 'src/app/interfaces/sale';
import { AlertService } from 'src/app/services/alert.service';
import { SalesService } from 'src/app/services/sales.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-sales',
  templateUrl: './list-sales.component.html',
  styleUrls: ['./list-sales.component.scss']
})
export class ListSalesComponent implements OnInit {

  items : Sale[] = []
  totalItems = 0
  page = 1
  paginate = 25
  itemsSubscription : Subscription = null
  itemDeleteSubscription : Subscription = null
  itemUpdateSubscription : Subscription = null
  baseCurencySymbol = 'S/.'

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
      key : 'created_at',
      label : 'Fecha',
      type : 'datetime',
    },    
    {
      key : 'total',
      label : 'Total',
      type : 'currency',
      currency : 'currencySymbol'
    },
    {
      key : 'sale_state',
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

  constructor(private salesService : SalesService,
    private router : Router,
    private userService : UserService,
    private alert : AlertService) {
      
      const baseCurrency = this.userService.enviroment('base_currency')
      this.baseCurencySymbol = baseCurrency ? baseCurrency.symbol : 'S/.'
    }

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
    this.itemsSubscription = this.salesService.list(q, this.page, this.paginate)
    .subscribe(data => {
      this.items = data.data.map(i => {
        return {
          ...i,
          client_name : (i.client && i.client.people) ? i.client.people.full_name : 'Cliente generico',
          total : i.totals.reduce((a, b) => a + (parseFloat(b['total']) || 0), 0),
          currencySymbol : this.baseCurencySymbol
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
    this.router.navigate(['/sales/show', itemId]);
  }

  onDelete(itemId){
    this.alert.question('Se eliminará este registro')
    .then(result => {
      if(result.value){
        this.alert.loading()
        this.itemDeleteSubscription = this.salesService.delete(itemId)
        .subscribe(data => {
          this.listItems()
        }, error => {
          this.alert.error('Ooops', 'No se pudo eliminar este registro')
        })
      }
    })
  }
}
