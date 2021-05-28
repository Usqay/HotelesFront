import { LicenciasService } from 'src/app/shared/services/licencias.service';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Currency } from 'src/app/shared/interfaces/currency';
import { ElectronicVoucher } from 'src/app/shared/interfaces/electronic-voucher';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ElectronicVoucherService } from 'src/app/shared/services/electronic-voucher.service';
import { UserService } from 'src/app/shared/services/user.service';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-list-electronic-vouchers',
  templateUrl: './list-electronic-vouchers.component.html',
  styleUrls: ['./list-electronic-vouchers.component.scss']
})
export class ListElectronicVouchersComponent implements OnInit {
  @ViewChild('searchInput') searchInput: ElementRef;
  items : ElectronicVoucher[] = []
  totalItems = 0
  page = 1
  paginate = 25
  itemsSubscription : Subscription = null
  printSubscription : Subscription = null
  searchProductsSubscription : Subscription = null
  electronicSubscription : Subscription = null
  baseCurency : Currency

  columns = [
    {
      key : 'id',
      label : 'ID',
      type : 'string',
    },
    {
      key : 'date_emitted',
      label : 'Fecha',
      type : 'datetime',
    },
    {
      key : 'electronic_voucher_type',
      subkey : 'name',
      label : 'Tipo',
      type : 'object',
    },
    {
      key : 'number',
      label : 'Número',
      type : 'string',
    },
    {
      key : 'api_body',
      subkey : 'cliente_denominacion',
      label : 'Cliente',
      type : 'object',
    },
    {
      key : 'serie',
      label : 'Serie',
      type : 'string',
    },
    {
      key : 'total',
      label : 'Total',
      type : 'string',
    },
    {
      key : 'options',
      label : '',
      type : 'buttons',
      buttons : [
        {
          icon : 'picture_as_pdf',
          tooltip : 'Ver  PDF',
          click : (value) => {
            this.onShowPDF(value)
          }
        },
        {
          icon : 'file_copy',
          tooltip : 'Ver XML',
          click : (value) => {
            this.onShowXML(value)
          }
        },
        {
          icon : 'local_printshop',
          tooltip : 'Imprimir documento',
          click : (value) => {
            this.onPrint(value)
          }
        },
        {
          icon : 'file_copy',
          tooltip : 'Generar nota de credito (Anular)',
          click : (value) => {
            this.onDeleteNC(value)
          }
        },
        {
          icon : 'delete_forever',
          tooltip : 'Eliminar registro',
          click : (value) => {
            this.onDelete(value)
          }
        },
        {
          icon : 'search',
          tooltip : 'Consultar comprobante en sunat',
          click : (value) => {
            this.onConsult(value)
          }
        }
      ]
    }
  ];

  constructor(private electronicVouchersService : ElectronicVoucherService,
    private router : Router,
    private userService : UserService,
    private alert : AlertService,
    private licenciaService : LicenciasService) { }

  ngOnInit(): void {
    this.baseCurency = this.userService.enviroment('base_currency')
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
    if(this.printSubscription != null) this.itemsSubscription.unsubscribe()
    if(this.searchProductsSubscription != null) this.searchProductsSubscription.unsubscribe()
    if(this.electronicSubscription != null) this.electronicSubscription.unsubscribe()
    
  }

  listItems(q = null){
    this.alert.loading()
    this.itemsSubscription = this.electronicVouchersService.list(q, this.page, this.paginate)
    .subscribe(data => {
      this.items = data.data.map(i => {
        return {
          ...i,
          total : this.baseCurency.symbol + (i.api_body).total
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

  onShowPDF(itemId){
    let resultado=this.items as any
    let datos =resultado.find(res =>res.id == itemId);
    window.open(JSON.parse(datos.api_response).enlace_del_pdf,'_new')
  }
  onShowXML(itemId){
    let resultado=this.items as any
    let datos =resultado.find(res =>res.id == itemId);
    window.open(JSON.parse(datos.api_response).enlace_del_xml,'_new')
  }
  onPrint(itemId){
    let resultado=this.items as any
    let datos =resultado.find(res =>res.id == itemId);
    let res=(JSON.stringify(datos.api_body));
    this.printSubscription = this.electronicVouchersService.print(res)
    .subscribe((res : any) =>{
     
      if(res.data.success){
        var win = window.open();
        win.document.open();
        win.document.write(res.data.imprimir);
        win.document.close();
        win.focus();
      }else{
        this.alert.error('Ooops', 'No se pudo cargar la información');
      }
    });
  }
  onDeleteNC(itemId){

    this.alert.question('Anular documento con Nota de Crédito')
    .then(result => {
      if(result.value){
        this.alert.loading()

        this.electronicSubscription = this.electronicVouchersService.cancel(itemId)
        .subscribe((data : any) => {
          console.log(data);
          if(data.data){
            if(data.data.success){
              this.alert.warning(data.data.respuesta.api_result.sunat_description);

              setTimeout(()=>{
                this.listItems()
              },2000);
              
            }else{
              this.alert.warning(data.data.error);
            }
          }
        
          
        }, error => {
          this.alert.error('Ooops', 'No se pudo eliminar este registro')
        })
      }
    })
   
  }

  onDelete(itemId){

    this.alert.question('Desea eliminar permanentemente este registro?')
    .then(result => {
      if(result.value){
        this.alert.loading()

        this.electronicSubscription = this.electronicVouchersService.delete(itemId)
        .subscribe((data : any) => {
          this.alert.hide()
          //console.log(data);
          //console.log(data.success);
          if(data.success){            
            this.alert.success('Documento Anulado');
          }else{
            this.alert.warning(data.message);
          }
         
          setTimeout(()=>{                         
           this.listItems(); 
           //window.location.reload();
          }, 3000);

        
         
        }, error => {
          this.alert.error('Ooops', 'No se pudo eliminar este registro')
          this.alert.hide()
        })
      }
    })
   
  }
  onConsult(itemId){
    this.alert.info('En proceso..!','oli :)');
    return;
    this.alert.question('Desea consultar este documento?')
    .then(result => {
      if(result.value){
        this.alert.loading()

        this.electronicSubscription = this.licenciaService.searchDocument(itemId)
        .subscribe((data : any) => {
          this.alert.hide()
          //console.log(data);
          //console.log(data.success);
          if(data.success){            
            this.alert.success('Documento Anulado');
          }else{
            this.alert.warning(data.message);
          }
         
          setTimeout(()=>{                         
           this.listItems(); 
           //window.location.reload();
          }, 3000);

        
         
        }, error => {
          this.alert.error('Ooops', 'No se pudo eliminar este registro')
          this.alert.hide()
        })
      }
    })
   
  }

}
