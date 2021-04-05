import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CashRegister } from 'src/app/shared/interfaces/cash-register';
import { CashRegisterMovementType } from 'src/app/shared/interfaces/cash-register-movement-type';
import { Currency } from 'src/app/shared/interfaces/currency';
import { PaymentMethod } from 'src/app/shared/interfaces/payment-method';
import { TurnChange } from 'src/app/shared/interfaces/turn-change';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CashRegisterMovementService } from 'src/app/shared/services/cash-register-movement.service';
import { CashRegistersService } from 'src/app/shared/services/cash-registers.service';
import { CurrenciesService } from 'src/app/shared/services/currencies.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { PaymentMethodsService } from 'src/app/shared/services/payment-methods.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-create-cash-register-movement',
  templateUrl: './create-cash-register-movement.component.html',
  styleUrls: ['./create-cash-register-movement.component.scss']
})
export class CreateCashRegisterMovementComponent implements OnInit {

  form: FormGroup;
  turnChange: TurnChange = {};
  cashRegister: CashRegister = {};
  baseCurrency: Currency = {};

  cashRegisters: CashRegister[] = [];
  currencies: Currency[] = [];
  paymentMethods: PaymentMethod[] = [];
  cashRegisterMovementTypes : CashRegisterMovementType[] = [
    {id : 7, name : 'Otro tipo de ingreso'},
    {id : 11, name : 'Otro tipo de salida'}
  ]

  getCashRegistersSubscription : Subscription = null
  getCurrenciesSubscription : Subscription = null
  getPaymentMethodsSubscription : Subscription = null
  storeCashRegisterMovementSubscription : Subscription = null

  constructor(private alert : AlertService,
    private formBuilder : FormBuilder,
    private cashRegisterMovementService : CashRegisterMovementService,
    private userService : UserService,
    private cashRegistersService : CashRegistersService,
    private currenciesService : CurrenciesService,
    private paymentMethodsService : PaymentMethodsService,
    private errorService : ErrorService) { }

  ngOnInit(): void {
    this.turnChange = this.userService.enviroment('turn_change')
    this.cashRegister = this.userService.enviroment('cash_register')
    this.baseCurrency = this.userService.enviroment('base_currency')
    this.createForm()
    this.getCashRegisters()
    this.getCurrencies()
    this.getPaymentMethods()
  }

  ngOnDestroy(){
    if(this.getCashRegistersSubscription != null) this.getCashRegistersSubscription.unsubscribe()
    if(this.getCurrenciesSubscription != null) this.getCurrenciesSubscription.unsubscribe()
    if(this.getPaymentMethodsSubscription != null) this.getPaymentMethodsSubscription.unsubscribe()
    if(this.storeCashRegisterMovementSubscription != null) this.storeCashRegisterMovementSubscription.unsubscribe()
  }

  private createForm(){
    this.form = this.formBuilder.group({
      currency_id : this.formBuilder.control(this.baseCurrency.id, Validators.required),
      cash_register_movement_type_id : this.formBuilder.control('', Validators.required),
      cash_register_id : this.formBuilder.control(this.cashRegister.id, Validators.required),
      turn_change_id : this.formBuilder.control(this.turnChange.id, Validators.required),
      payment_method_id : this.formBuilder.control('', Validators.required),
      amount : this.formBuilder.control(1, [Validators.required, Validators.min(1)]),
      description : this.formBuilder.control(''),
    })
  }

  private getCashRegisters(){
    this.alert.loading()
    this.getCashRegistersSubscription = this.cashRegistersService.list(null, 1, 99)
    .subscribe(data => {
      this.cashRegisters = data.data
      this.alert.hide()
    }, error => this.alert.error())
  }

  private getCurrencies(){
    this.alert.loading()
    this.getCurrenciesSubscription = this.currenciesService.list(null, 1, 99)
    .subscribe(data => {
      this.currencies = data.data
      this.alert.hide()
    }, error => this.alert.error())
  }

  private getPaymentMethods(){
    this.alert.loading()
    this.getPaymentMethodsSubscription = this.paymentMethodsService.list(null, 1, 99)
    .subscribe(data => {
      this.paymentMethods = data.data
      this.alert.hide()
    }, error => this.alert.error())
  }

  onSubmit(){
    this.alert.loading()
    const formData = this.form.value
    this.storeCashRegisterMovementSubscription = this.cashRegisterMovementService.create(formData)
    .subscribe(data => {
      this.alert.success()
      location.reload()
    }, error => this.alert.error('Ooops', this.errorService.make(error.error)))
  }

}
