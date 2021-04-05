import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { Product } from 'src/app/shared/interfaces/product';
import { Service } from 'src/app/shared/interfaces/service';
import { ServicesService } from 'src/app/shared/services/services.service';
import { Currency } from 'src/app/shared/interfaces/currency';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurrenciesService } from 'src/app/shared/services/currencies.service';
import { CurrencyRate } from 'src/app/shared/interfaces/currency-rate';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-sale-products',
  templateUrl: './sale-products.component.html',
  styleUrls: ['./sale-products.component.scss'],
  animations: [
    trigger('hover', [
      state('hoverIn', style({
        backgroundColor: '#0A5C9E',
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
        color: '#fff',
      })),
      state('hoverOut', style({
        backgroundColor: '#ffffff',
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        color: '#2B2B2B',
      })),
      transition('hoverIn => hoverOut', [
        animate('0.25s')
      ]),
      transition('hoverOut => hoverIn', [
        animate('0.1s'),

      ]),
    ]),
    trigger('active', [
      state('active', style({
        backgroundColor: '#0A5C9E',
        color: '#fff',
      })),
      state('inactive', style({
        backgroundColor: '#ffffff',
        color: '#2B2B2B',
      })),
      transition('active => inactive', [
        animate('0.25s')
      ]),
      transition('inactive => active', [
        animate('0.1s'),

      ]),
    ]),
  ]
})
export class SaleProductsComponent implements OnInit {
  @ViewChild('searchInput') searchInput: ElementRef;
  @Output() onAddProduct = new EventEmitter<{ product: Product, price: number, currency: Currency, rateValue : number }>();
  @Output() onAddService = new EventEmitter<{ service: Service, price: number, currency: Currency, rateValue : number }>();

  pageSize = 9
  currentPage = 0
  totalItems = 0
  searchText = null
  searchFor = 'products'

  products : Product[] = []
  services : Service[] = []
  currencies : Currency[] = []

  getProductsSubscription: Subscription = null
  currenciesSubscription: Subscription = null
  searchProductsSubscription: Subscription = null
  dialogSubscription: Subscription = null

  constructor(private alert: AlertService,
    private productsService: ProductsService,
    private servicesService: ServicesService,
    private currenciesService : CurrenciesService,
    public dialog: MatDialog,
    private errorService: ErrorService) { }

  ngOnInit(): void {
    this.getProducts()
    this.getServices()
    this.getCurrencies()
  }

  ngAfterViewInit() {
    this.searchProductsSubscription = fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap((text) => {
          this.searchText = this.searchInput.nativeElement.value

          if(this.searchText.length  >= 3 || this.searchText.length  == 0){
            if(this.searchFor == 'products'){
              this.getProducts()
            }else{
              this.getServices()
            }
          }


        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    if (this.getProductsSubscription != null) this.getProductsSubscription.unsubscribe()
    if (this.currenciesSubscription != null) this.currenciesSubscription.unsubscribe()
    if (this.searchProductsSubscription != null) this.searchProductsSubscription.unsubscribe()
    if (this.dialogSubscription != null) this.dialogSubscription.unsubscribe()
  }

  private getProducts() {

    this.getProductsSubscription = this.productsService.list(this.searchText, this.currentPage + 1, this.pageSize)
      .subscribe(data => {
        this.products = data.data
        this.totalItems = data.meta.total
        this.currentPage = data.meta.current_page - 1
        if(this.totalItems <= this.pageSize) this.currentPage = 0

      }, error => {
        this.alert.error('Ooops', this.errorService.make(error.error))
      })
  }

  private getServices() {
    this.getProductsSubscription = this.servicesService.list(this.searchText, this.currentPage + 1, this.pageSize)
      .subscribe(data => {
        this.services = data.data
        this.totalItems = data.meta.total
        this.currentPage = data.meta.current_page - 1
        if(this.totalItems <= this.pageSize) this.currentPage = 0
      }, error => {
        this.alert.error('Ooops', this.errorService.make(error.error))
      })
  }

  private getCurrencies() {
    this.currenciesSubscription = this.currenciesService.list(null, 1, 9999)
      .subscribe(data => {
        this.currencies = data.data
      }, error => {
        this.alert.error()
      })
  }

  onPaginatorChange(e){
    this.currentPage = e.pageIndex
    this.getProducts()
  }

  showRoomDetail(product : Product = null, service : Service = null) {
    const dialogRef = this.dialog.open(DialogProductOrServiceDetail, {
      minWidth: '85vw',
      maxWidth: '85vw',
      data: {
        product: product,
        service: service,
        currencies: this.currencies,
      }
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result && result.price >= 0) {
        if(product != null){
          this.onAddProduct.emit({
            product: product,
            price: result.price,
            currency: result.currency,
            rateValue : result.rateValue
          })
        }else{
          this.onAddService.emit({
            service: service,
            price: result.price,
            currency: result.currency,
            rateValue : result.rateValue
          })
        }
      }
    });
  }

}

@Component({
  selector: 'dialog-product-service-detail',
  templateUrl: 'dialog-product-service-detail.html',
  styleUrls: ['./sale-products.component.scss'],
})
export class DialogProductOrServiceDetail {

  product: Product
  service: Service
  price = 0
  currency: Currency
  currencies: Currency[] = []
  customPrice = false
  baseCurrency : Currency = null
  currencyRates : CurrencyRate[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    private userService : UserService,
    public dialogRef: MatDialogRef<DialogProductOrServiceDetail>,) {
    this.product = data.product
    this.service = data.service
    this.currencies = data.currencies
    this.currencies.forEach(i => {
      if (i.is_base) this.currency = i
    })

    this.baseCurrency = this.userService.enviroment('base_currency')
    this.currencyRates = this.userService.enviroment('currency_rates')
  }

  onCancel() {
    this.dialogRef.close();
  }

  setPrice(price, currency) {
    this.price = price
    this.currency = currency
  }

  onAddProductOrService() {

    let rateValue = 1

    if(this.currency.id != this.baseCurrency.id){
      rateValue = this.currencyRates.filter(i => i.currency_id == this.currency.id)[0].rate_value
    }



    this.dialogRef.close({
      price: this.price,
      currency: this.currency,
      rateValue : rateValue
    });
  }
}
