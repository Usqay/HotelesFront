import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductStock } from 'src/app/shared/interfaces/product-stock';
import { StoreHouse } from 'src/app/shared/interfaces/store-house';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProductStockStockService } from 'src/app/shared/services/product-stock.service';
import { StoreHousesService } from 'src/app/shared/services/store-houses.service';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.scss']
})
export class KardexComponent implements OnInit {

  storeHouses: StoreHouse[] = []
  storeHouse : StoreHouse = null
  items: ProductStock[] = []
  totalItems = 0
  page = 1
  paginate = 25
  itemsSubscription: Subscription = null
  storeHousesSubscription: Subscription = null

  columns = [
    {
      key: 'id',
      label: 'ID',
      type: 'string',
    },
    {
      key: 'product',
      subkey: 'name',
      label: 'Producto',
      type: 'object',
    },
    {
      key: 'store_house',
      subkey: 'name',
      label: 'Almacen',
      type: 'object',
    },
    {
      key: 'stock',
      label: 'Stock',
      type: 'number',
    },
  ];

  constructor(private alert: AlertService,
    private productStocksService: ProductStockStockService,
    private router: Router,
    private storeHousesService: StoreHousesService) { }

  ngOnInit() {
    this.getStoreHouses()
  }

  ngOnDestroy() {
    if (this.storeHousesSubscription != null) this.storeHousesSubscription.unsubscribe()
    if (this.itemsSubscription != null) this.itemsSubscription.unsubscribe()
  }

  private getStoreHouses() {
    this.alert.loading()
    this.storeHousesSubscription = this.storeHousesService.list(null, 1, 999)
      .subscribe(data => {
        this.storeHouses = data.data
        this.storeHouse = this.storeHouses[0]
        this.listItems()
        this.alert.hide()
      }, error => {
        this.alert.error()
      })
  }

  listItems(q = null) {
    if (this.storeHouse != null) {
      this.alert.loading()
      this.itemsSubscription = this.productStocksService.list(this.storeHouse.id, q, this.page, this.paginate)
        .subscribe(data => {
          this.items = data.data
          this.totalItems = data.meta.total
          this.alert.hide()
        }, error => {
          this.alert.error('Ooops', 'No se pudo cargar la información');
        })
    }
  }

  onChangePage(e) {
    this.page = e.pageIndex + 1
    this.paginate = e.pageSize
    this.listItems()
  }
}
