import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CashRegister } from 'src/app/interfaces/cash-register';
import { CashRegisterMovement } from 'src/app/interfaces/cash-register-movement';
import { AlertService } from 'src/app/services/alert.service';
import { CashRegisterMovementService } from 'src/app/services/cash-register-movement.service';
import { CashRegistersService } from 'src/app/services/cash-registers.service';

@Component({
  selector: 'app-list-cash-register-movements',
  templateUrl: './list-cash-register-movements.component.html',
  styleUrls: ['./list-cash-register-movements.component.scss']
})
export class ListCashRegisterMovementsComponent implements OnInit {

  cashRegisters : CashRegister[] = []
  cashRegister : CashRegister
  
  items : CashRegisterMovement[] = []
  totalItems = 0
  page = 1
  paginate = 25

  columns = [
    {
      key : 'id',
      label : 'ID',
      type : 'string',
    },
    {
      key : 'created_at',
      label : 'Fecha',
      type : 'datetime',
    },
    {
      key : 'cash_register_movement_type',
      subkey : 'name',
      label : 'Tipo',
      type : 'object',
    },
    {
      key : 'description',
      label : 'Descripción',
      type : 'string',
    },
    {
      key : 'in_out',
      label : '',
      type : 'flag',
      textIfTrue : "In",
      textIfFalse : "Out",
    },
    {
      key : 'amount',
      label : 'Total',
      type : 'currency',
      currency : 'currencySymbol'
    },
  ];

  getCashRegisterSubscription : Subscription = null
  itemsSubscription : Subscription = null

  constructor(private alert : AlertService,
    private cashRegisterMovementsService : CashRegisterMovementService,
    private cashRegistersService : CashRegistersService) { }

  ngOnInit(): void {
    this.getCashRegisters()
  }

  ngOnDestroy(){
    if(this.getCashRegisterSubscription != null) this.getCashRegisterSubscription.unsubscribe()
    if(this.itemsSubscription != null) this.itemsSubscription.unsubscribe()
  }

  private getCashRegisters(){
    this.alert.loading()
    this.getCashRegisterSubscription = this.cashRegistersService.list(null, 1, 99)
    .subscribe(data => {
      this.cashRegisters = data.data
      this.cashRegisters.forEach(i => {
        if(i.is_base) this.cashRegister = i
      })

      if(this.cashRegister) this.listItems()
      this.alert.hide()
    }, error => {
      this.alert.error()
    })
  }

  listItems(){
    this.alert.loading()
    this.itemsSubscription = this.cashRegisterMovementsService.list(null, this.page, this.paginate, this.cashRegister.id)
    .subscribe(data => {
      this.items = data.data.map(i => {
        return {
          ...i,
          currencySymbol : i.currency.symbol,
          in_out : i.cash_register_movement_type.in_out
        }
      })
      console.log(this.items)
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
}
