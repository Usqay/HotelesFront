import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Printer } from 'src/app/shared/interfaces/printer';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PrinterService } from 'src/app/shared/services/printer.service';

@Component({
  selector: 'app-list-printers',
  templateUrl: './list-printers.component.html',
  styleUrls: ['./list-printers.component.scss']
})
export class ListPrintersComponent implements OnInit {

  items : Printer[] = []
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
      key : 'printer_type',
      subkey : 'name',
      label : 'Tipo',
      type : 'object',
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

  constructor(private printersService : PrinterService,
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

    this.itemsSubscription = this.printersService.list(q, this.page, this.paginate)
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
    this.router.navigate(['/printers/show', itemId]);
  }

  onDelete(itemId){
    this.alert.question('Se eliminará este registro')
    .then(result => {
      if(result.value){
        this.alert.loading()
        this.itemDeleteSubscription = this.printersService.delete(itemId)
        .subscribe(data => {
          this.listItems()
        }, error => {
          this.alert.error('Ooops', 'No se pudo eliminar este registro')
        })
      }
    })
  }
}
