import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StoreHouse } from 'src/app/shared/interfaces/store-house';
import { StoreHouseMovement } from 'src/app/shared/interfaces/store-house-movement';
import { AlertService } from 'src/app/shared/services/alert.service';
import { StoreHouseMovementsService } from 'src/app/shared/services/store-house-movements.service';
import { StoreHousesService } from 'src/app/shared/services/store-houses.service';

@Component({
  selector: 'app-list-store-house-movements',
  templateUrl: './list-store-house-movements.component.html',
  styleUrls: ['./list-store-house-movements.component.scss']
})
export class ListStoreHouseMovementsComponent implements OnInit {

  storeHouses: StoreHouse[] = []
  storeHouse : StoreHouse = null

  items: StoreHouseMovement[] = []
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
      key: 'created_at',
      label: 'Fecha',
      type: 'datetime',
    },
    {
      key: 'description',
      label: 'Descripción',
      type: 'string',
    },
    {
      key: 'store_house_movement_type',
      subkey: 'name',
      label: 'Tipo',
      type: 'object',
    },
    {
      key: 'options',
      label: '',
      type: 'buttons',
      buttons: [
        {
          icon: 'add',
          tooltip: 'Detalle',
          click: (value) => {
            this.onShow(value)
          }
        },
      ]
    }
  ];

  constructor(private alert: AlertService,
    private storeHouseMovementsService: StoreHouseMovementsService,
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
      this.itemsSubscription = this.storeHouseMovementsService.list(this.storeHouse.id, q, this.page, this.paginate)
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

  onShow(itemId) {
    this.router.navigate(['/store-house-movements/show', itemId]);
  }
}
