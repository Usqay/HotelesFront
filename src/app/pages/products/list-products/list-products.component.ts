import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { Currency } from 'src/app/shared/interfaces/currency';
import { Product } from 'src/app/shared/interfaces/product';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  @ViewChild('searchInput') searchInput: ElementRef;

  items : Product[] = []
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
      key : 'purchase_price',
      label : 'P. Compra',
      type : 'currency',
      currency : 'currency'
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

  constructor(private productsService : ProductsService,
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
    this.itemsSubscription = this.productsService.list(q, this.page, this.paginate)
    .subscribe(data => {
      this.items = data.data.map(i => {

        let purchase_price = i.prices.length > 0 ? i.prices[0].purchase_price : 0
        let sale_price = i.prices.length > 0 ? i.prices[0].sale_price : 0
        return {
          ...i,
          purchase_price,
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
    this.router.navigate(['/products/show', itemId]);
  }

  onDelete(itemId){
    this.alert.question('Se eliminará este registro')
    .then(result => {
      if(result.value){
        this.alert.loading()
        this.itemDeleteSubscription = this.productsService.delete(itemId)
        .subscribe(data => {
          this.listItems()
        }, error => {
          this.alert.error('Ooops', 'No se pudo eliminar este registro')
        })
      }
    })
  }
}
