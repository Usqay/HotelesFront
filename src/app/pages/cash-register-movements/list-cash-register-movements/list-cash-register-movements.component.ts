import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CashRegister } from 'src/app/shared/interfaces/cash-register';
import { CashRegisterMovement } from 'src/app/shared/interfaces/cash-register-movement';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CashRegisterMovementService } from 'src/app/shared/services/cash-register-movement.service';
import { CashRegistersService } from 'src/app/shared/services/cash-registers.service';
import localeEsPe from '@angular/common/locales/es-PE';
import { registerLocaleData } from '@angular/common';
import { formatDate } from "@angular/common";
registerLocaleData(localeEsPe, 'es-Pe');
@Component({
  selector: 'app-list-cash-register-movements',
  templateUrl: './list-cash-register-movements.component.html',
  styleUrls: ['./list-cash-register-movements.component.scss']
})
export class ListCashRegisterMovementsComponent implements OnInit {

  cashRegisters : CashRegister[] = []
  cashRegister : CashRegister
  locale = 'en-Pe';
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
  filtersListenerSubscription: Subscription = null
  filtersForm: FormGroup

  constructor(private alert : AlertService,
    private cashRegisterMovementsService : CashRegisterMovementService,
    private cashRegistersService : CashRegistersService,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.getCashRegisters()
    this.createFiltersForm();
  }

  ngOnDestroy(){
    if(this.getCashRegisterSubscription != null) this.getCashRegisterSubscription.unsubscribe()
    if(this.itemsSubscription != null) this.itemsSubscription.unsubscribe()
    if(this.filtersListenerSubscription != null) this.filtersListenerSubscription.unsubscribe()
  }

  private getCashRegisters(){
    this.alert.loading()
    this.getCashRegisterSubscription = this.cashRegistersService.list(null, 1, 99)
    .subscribe(data => {
      this.cashRegisters = data.data
      this.cashRegisters.forEach(i => {
        if(i.is_base) this.cashRegister = i
      })

      //if(this.cashRegister) this.listItems()
      this.alert.hide()
    }, error => {
      this.alert.error()
    })
  }


  createFiltersForm() {
    const startDate = new Date()
    startDate.setDate(1)
    this.filtersForm = this.formBuilder.group({
      start_date: this.formBuilder.control(startDate, Validators.required),
      end_date: this.formBuilder.control(new Date(), Validators.required),
      cashRegister: this.formBuilder.control(this.cashRegister?.id, Validators.required)

    })

    this.filtersListenerSubscription = this.filtersForm.valueChanges.subscribe(formData => {
      this.getReport(formData)
      //this.listItems();
    })

    this.getReport(this.filtersForm.value)
    //this.listItems();



  }

  getReport(formData) {
    //formData.start_date.setHours(0)
    //formData.end_date.setHours(23, 59)
    formData.start_date = formatDate(formData.start_date,'yyyy-MM-dd',this.locale)
    formData.end_date =  formatDate(formData.end_date,'yyyy-MM-dd',this.locale)
    formData.cashRegister = formData.cashRegister ? formData.cashRegister : 1

    const formValue = this.filtersForm.value;
    this.listItems(formValue);

  }

  listItems(formValue){
    console.log(formValue);
    this.alert.loading()
    this.itemsSubscription = this.cashRegisterMovementsService.listar(null, this.page, this.paginate, formValue.cashRegister, formValue.start_date, formValue.end_date)
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
    const formData = this.filtersForm.value;
    formData.start_date = formatDate(formData.start_date,'yyyy-MM-dd',this.locale)
    formData.end_date =  formatDate(formData.end_date,'yyyy-MM-dd',this.locale)
    formData.cashRegister = formData.cashRegister ? formData.cashRegister : 1
    this.listItems(formData)
  }

  imprimir(){
    const formData = this.filtersForm.value;
    formData.start_date = formatDate(formData.start_date,'yyyy-MM-dd',this.locale)
    formData.end_date =  formatDate(formData.end_date,'yyyy-MM-dd',this.locale)
    formData.cashRegister = formData.cashRegister ? formData.cashRegister : 1

    this.itemsSubscription = this.cashRegisterMovementsService.imprimir(null, this.page, this.paginate, formData.cashRegister , formData.start_date, formData.end_date)
    .subscribe((data: any) => {
      if(data.success){
        let printContents, popupWin;

        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(data.imprimir);
        popupWin.document.close();
      }
      console.log(data)
      //this.totalItems = data.meta.total
      //this.alert.hide()
    }, error => {
      this.alert.error('Ooops', 'No se pudo cargar la información');
    });

  }

}
