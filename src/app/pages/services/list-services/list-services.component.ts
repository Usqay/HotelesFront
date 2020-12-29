import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/interfaces/service';
import { AlertService } from 'src/app/services/alert.service';
import { ServicesService } from 'src/app/services/services.service';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { Currency } from 'src/app/interfaces/currency';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.scss']
})
export class ListServicesComponent implements OnInit {
  @ViewChild('searchInput') searchInput: ElementRef;

  items : Service[] = []
  totalItems = 0
  page = 1
  paginate = 25
  itemsSubscription : Subscription = null
  itemDeleteSubscription : Subscription = null
  itemUpdateSubscription : Subscription = null
  searchProductsSubscription : Subscription = null
  baseCurrency : Currency

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
      key : 'sale_price',
      label : 'P. Venta',
      type : 'currency',
      currency : 'currency'
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

  constructor(private servicesService : ServicesService,
    private router : Router,
    private userService : UserService,
    private alert : AlertService) { }

  ngOnInit(): void {
    this.baseCurrency = this.userService.enviroment('base_currency');
    this.listItems()
  }

  ngAfterViewInit() {
    this.searchProductsSubscription = fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap((text) => {
          const aux = this.searchInput.nativeElement.value
          this.listItems(aux)
        })
      )
      .subscribe();
  }

  ngOnDestroy(){
    if(this.itemsSubscription != null) this.itemsSubscription.unsubscribe()
    if(this.itemDeleteSubscription != null) this.itemDeleteSubscription.unsubscribe()
    if(this.itemUpdateSubscription != null) this.itemUpdateSubscription.unsubscribe()
    if(this.searchProductsSubscription != null) this.searchProductsSubscription.unsubscribe()
  }

  listItems(q = null){
    this.alert.loading()
    this.itemsSubscription = this.servicesService.list(q, this.page, this.paginate)
    .subscribe(data => {
      this.items = data.data.map(i => {
        
        let sale_price = i.prices.length > 0 ? i.prices[0].sale_price : 0
        return {
          ...i,
          sale_price,
          currency : this.baseCurrency.symbol
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
    this.router.navigate(['/services/show', itemId]);
  }

  onDelete(itemId){
    this.alert.question('Se eliminará este registro')
    .then(result => {
      if(result.value){
        this.alert.loading()
        this.itemDeleteSubscription = this.servicesService.delete(itemId)
        .subscribe(data => {
          this.listItems()
        }, error => {
          this.alert.error('Ooops', 'No se pudo eliminar este registro')
        })
      }
    })
  }
}
