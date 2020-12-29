import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CashRegister } from 'src/app/interfaces/cash-register';
import { Currency } from 'src/app/interfaces/currency';
import { PaymentMethod } from 'src/app/interfaces/payment-method';
import { AlertService } from 'src/app/services/alert.service';
import { CurrenciesService } from 'src/app/services/currencies.service';
import { PaymentMethodsService } from 'src/app/services/payment-methods.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sale-payment-form',
  templateUrl: './sale-payment-form.component.html',
  styleUrls: ['./sale-payment-form.component.scss']
})
export class SalePaymentFormComponent implements OnInit {
  @Input() total : number = 1
  @Output() onCancel = new EventEmitter<boolean> ()
  @Output() onSubmit = new EventEmitter<any> ()


  form : FormGroup
  currencies : Currency[] = []
  baseCurrency : Currency = null
  paymentMethods : PaymentMethod[] = []
  subtotal : number = 0
  taxValue : number = 0
  paymentTotal : number = 0
  paymentBack : number = 0
  cashRegister : CashRegister = null

  getCurrenciesSubscription : Subscription = null
  getPaymentMethodsSubscription : Subscription = null
  formChangesSubscription : Subscription = null

  constructor(private alert : AlertService,
    private formBuilder : FormBuilder,
    private paymentMethodsService : PaymentMethodsService,
    private userService : UserService,
    private currenciesService : CurrenciesService) { }

  ngOnInit(): void {
    this.cashRegister = this.userService.enviroment('cash_register')
    this.createForm()
    this.getCurrencies()
    this.getPaymentMethods()
  }

  ngOnDestroy(){
    if(this.getCurrenciesSubscription != null) this.getCurrenciesSubscription.unsubscribe()
    if(this.getPaymentMethodsSubscription != null) this.getPaymentMethodsSubscription.unsubscribe()
    if(this.formChangesSubscription != null) this.formChangesSubscription.unsubscribe()
  }

  private createForm(){
    this.form = this.formBuilder.group({
      cash_register_id : this.formBuilder.control(this.cashRegister.id, Validators.required),
      currency_id : this.formBuilder.control(1, Validators.required),
      payment_method_id : this.formBuilder.control(1, Validators.required),
      total : this.formBuilder.control(this.total, [Validators.required, Validators.min(this.total)]),
      description : this.formBuilder.control(''),
      print_payment : this.formBuilder.control(true, Validators.required),
    })

    this.formChangesSubscription = this.form.controls['total'].valueChanges.subscribe(value => {
      this.calculateTotals(value)
    })

    this.calculateTotals(this.total)
  }

  private getCurrencies(){
    this.alert.loading()
    this.getCurrenciesSubscription = this.currenciesService.list(null, 1, 99)
    .subscribe(data => {
      this.currencies = data.data
      this.currencies.forEach(i => {
        if(i.is_base){
          this.baseCurrency = i
          this.form.controls['currency_id'].setValue(i.id)
        }
      })
      this.alert.hide()
    }, error => {
      this.alert.error()
    })
  }

  private getPaymentMethods(){
    this.alert.loading()
    this.getPaymentMethodsSubscription = this.paymentMethodsService.list(null, 1, 99)
    .subscribe(data => {
      this.paymentMethods = data.data
      this.alert.hide()
    }, error => {
      this.alert.error()
    })
  }

  private calculateTotals(formTotalValue){
    this.paymentTotal = this.total
    this.subtotal = this.paymentTotal / 1.18
    this.taxValue = this.paymentTotal - this.subtotal
    this.paymentBack = formTotalValue - this.total
  }

  _onCancel(){
    this.onCancel.emit(true)
  }

  _onSubmit(documentType = 'not'){

    const payment = {
      ...this.form.value,
      document_type : documentType,
      payment_back : parseFloat(this.paymentBack.toFixed(2)),
      total : this.total
    }

    this.onSubmit.emit(payment)

  }

}
