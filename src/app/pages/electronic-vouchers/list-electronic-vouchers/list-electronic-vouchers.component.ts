import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Currency } from 'src/app/interfaces/currency';
import { ElectronicVoucher } from 'src/app/interfaces/electronic-voucher';
import { AlertService } from 'src/app/services/alert.service';
import { ElectronicVoucherService } from 'src/app/services/electronic-voucher.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-electronic-vouchers',
  templateUrl: './list-electronic-vouchers.component.html',
  styleUrls: ['./list-electronic-vouchers.component.scss']
})
export class ListElectronicVouchersComponent implements OnInit {

  items : ElectronicVoucher[] = []
  totalItems = 0
  page = 1
  paginate = 25
  itemsSubscription : Subscription = null
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
      key : 'serie',
      label : 'Serie',
      type : 'string',
    },
    {
      key : 'total',
      label : 'Total',
      type : 'string',
    },
  ];

  constructor(private electronicVouchersService : ElectronicVoucherService,
    private router : Router,
    private userService : UserService,
    private alert : AlertService) { }

  ngOnInit(): void {
    this.baseCurency = this.userService.enviroment('base_currency')
    this.listItems()
  }

  ngOnDestroy(){
    if(this.itemsSubscription != null) this.itemsSubscription.unsubscribe()
  }

  listItems(q = null){
    this.alert.loading()
    this.itemsSubscription = this.electronicVouchersService.list(q, this.page, this.paginate)
    .subscribe(data => {
      this.items = data.data.map(i => {
        return {
          ...i,
          total : this.baseCurency.symbol + JSON.parse(i.api_body).total
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
    this.router.navigate(['/electronic-vouchers/show', itemId]);
  }
}
