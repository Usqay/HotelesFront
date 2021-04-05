import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StoreHouse } from 'src/app/shared/interfaces/store-house';
import { AlertService } from 'src/app/shared/services/alert.service';
import { StoreHousesService } from 'src/app/shared/services/store-houses.service';

@Component({
  selector: 'app-list-store-houses',
  templateUrl: './list-store-houses.component.html',
  styleUrls: ['./list-store-houses.component.scss']
})
export class ListStoreHousesComponent implements OnInit {

  items : StoreHouse[] = []
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
      key : 'description',
      label : 'Descripción',
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
      key : 'address',
      label : 'Dirección',
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

  constructor(private storeHousesService : StoreHousesService,
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
    this.itemsSubscription = this.storeHousesService.list(q, this.page, this.paginate)
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
    this.router.navigate(['/store-houses/show', itemId]);
  }

  onDelete(itemId){
    this.alert.question('Se eliminará este registro')
    .then(result => {
      if(result.value){
        this.alert.loading()
        this.itemDeleteSubscription = this.storeHousesService.delete(itemId)
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
    const storeHouse : StoreHouse = {
      is_base : value
    }
    this.itemUpdateSubscription = this.storeHousesService.update(itemId, storeHouse)
    .subscribe(data => {
      this.listItems()
    }, error => {
      this.alert.error('Ooops', 'No se pudo actualizar este registro')
    })
  }

}
