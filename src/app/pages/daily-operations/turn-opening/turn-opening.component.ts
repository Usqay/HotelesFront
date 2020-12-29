import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiEnviroments } from 'src/app/interfaces/api-enviroments';
import { CashRegister } from 'src/app/interfaces/cash-register';
import { Currency } from 'src/app/interfaces/currency';
import { Turn } from 'src/app/interfaces/turn';
import { TurnChange } from 'src/app/interfaces/turn-change';
import { AlertService } from 'src/app/services/alert.service';
import { ApiCambioTodayService } from 'src/app/services/api-cambio-today.service';
import { CashRegistersService } from 'src/app/services/cash-registers.service';
import { CurrenciesService } from 'src/app/services/currencies.service';
import { ErrorService } from 'src/app/services/error.service';
import { TurnChangesService } from 'src/app/services/turn-changes.service';
import { TurnsService } from 'src/app/services/turns.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-turn-opening',
  templateUrl: './turn-opening.component.html',
  styleUrls: ['./turn-opening.component.scss']
})
export class TurnOpeningComponent implements OnInit {

  form : FormGroup
  turns : Turn[] = []
  currencies : Currency[] = []
  cashRegisters : CashRegister[] = []
  ratingFromApi : any[] = []
  apiEnviroments : ApiEnviroments
  today = new Date()

  getTurnsSubscription : Subscription = null
  getCurrencyRatesSubscription : Subscription = null
  getCurrenciesSubscription : Subscription = null
  getCashRegistersSubscription : Subscription = null
  storeTurnChangeSubscription : Subscription = null

  constructor(private alert : AlertService,
    private formBuilder : FormBuilder,
    private turnsService : TurnsService,
    private turnChangesService : TurnChangesService,
    private router : Router,
    private userService : UserService,
    private currenciesService : CurrenciesService,
    private cashRegistersService : CashRegistersService,
    private apiCambioTodayService : ApiCambioTodayService,
    private errorService : ErrorService) { }

  ngOnInit() {
    this.createForm()
    this.apiEnviroments = this.userService.enviroment()
    this.getTurns()
    this.getCashRegisters()
    this.currencyRateFromBase()
  }

  ngOnDestroy(){
    if(this.getTurnsSubscription != null) this.getTurnsSubscription.unsubscribe()
    if(this.getCurrencyRatesSubscription != null) this.getCurrencyRatesSubscription.unsubscribe()
    if(this.getCurrenciesSubscription != null) this.getCurrenciesSubscription.unsubscribe()
    if(this.getCashRegistersSubscription != null) this.getCashRegistersSubscription.unsubscribe()
    if(this.storeTurnChangeSubscription != null) this.storeTurnChangeSubscription.unsubscribe()
  }

  createForm(){
    this.form = this.formBuilder.group({
      turn_id : this.formBuilder.control('', Validators.required),
      cash_register_id : this.formBuilder.control('', Validators.required),
      start_amount : this.formBuilder.control(0, [
        Validators.required,
        Validators.min(0) 
      ])
    })
  }

  private getTurns(){
    this.alert.loading()
    this.getTurnsSubscription = this.turnsService.list(null, 1, 9999)
    .subscribe(data => {
      this.turns = data.data
      this.alert.hide()
    }, error => {
      this.alert.error('Ooops', this.errorService.make(error.error))
    })
  }

  private getCurrencies(){
    this.alert.loading()
    this.getCurrenciesSubscription = this.currenciesService.list(null, 1, 9999)
    .subscribe(data => {
      this.currencies = data.data.filter(i => i.id != this.apiEnviroments.base_currency.id)
      .map((i : Currency) => {
        const rate = this.getRating(i)
        return {...i, today_rate : rate, start_amount : 0}
      })
      this.alert.hide()
    }, error => {
      this.alert.error('Ooops', this.errorService.make(error.error))
    })
  }

  private getCashRegisters(){
    this.alert.loading()
    this.getCashRegistersSubscription = this.cashRegistersService.list(null, 1, 9999)
    .subscribe(data => {
      this.cashRegisters = data.data
      this.alert.hide()
    }, error => {
      this.alert.error('Ooops', this.errorService.make(error.error))
    })
  }

  private currencyRateFromBase(){
    this.alert.loading()
    this.getCurrencyRatesSubscription = this.apiCambioTodayService.rate(this.apiEnviroments.base_currency)
    .subscribe(data => {
      if(data){
        this.ratingFromApi = data.result.conversion
      }
      this.getCurrencies()
    }, error => {
      this.alert.error('Ooops', this.errorService.make(error.error))
      this.getCurrencies()
    })
  }

  private getRating(currency : Currency) : number{
    const rate = this.ratingFromApi.filter(i => i.to == currency.code)
    if(rate.length > 0 && 'rate' in rate[0]){
      return parseFloat((1/rate[0].rate).toFixed(2))
    }
    if(rate.length > 0 && 'rate_local' in rate[0]){
      return parseFloat(rate[0].rate_local)
    }
    return 0
  }

  onSubmit(){
    this.alert.loading()
    const formData = this.form.value
    const currency_rates = this.currencies.map(i => {
      return {currency_id : i.id, rate_value : i.today_rate, start_amount : i.start_amount}
    })
    let turnChange : TurnChange = {id : null}
    if('turn_change' in this.apiEnviroments){
      turnChange = this.apiEnviroments.turn_change
    }

    this.storeTurnChangeSubscription = this.turnChangesService.create({
      ...formData,
      turn_change_id : (turnChange != null) ? turnChange.id : null,
      currency_rates : currency_rates
    }).subscribe((data : any) => {
      // this.userService.enviroment('turn_change', data.data)
      this.storeTurnChangeSubscription = this.userService.getEnviroments()
      .subscribe(data => {
        this.userService.enviroment('cash_register', this.cashRegisters.filter(i => i.id == formData.cash_register_id)[0])
        this.router.navigateByUrl('/dashboard')
      })
      this.alert.success()
    }, error => {
      this.alert.error('Ooops', this.errorService.make(error.error))
    })
  }

}
