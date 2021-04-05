import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CashRegister } from 'src/app/shared/interfaces/cash-register';
import { Currency } from 'src/app/shared/interfaces/currency';
import { CurrencyRate } from 'src/app/shared/interfaces/currency-rate';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CashRegistersService } from 'src/app/shared/services/cash-registers.service';
import { ReportsService } from 'src/app/shared/services/reports.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-report-dayli',
  templateUrl: './report-dayli.component.html',
  styleUrls: ['./report-dayli.component.scss']
})
export class ReportDayliComponent implements OnInit {

  filtersForm: FormGroup
  baseCurrency : Currency = null
  cashRegisters : CashRegister[] = []
  cashRegisterMovements : any[] = []
  cashRegisterMovementsByPaymentMethod : any[] = []
  currencyRates : CurrencyRate[] = []
  incomeAndExpenses : any[] = []

  getCashRegistersSubscription: Subscription = null
  getReportSubscription: Subscription = null
  filtersListenerSubscription: Subscription = null

  constructor(private formBuilder: FormBuilder,
    private cashRegistersService : CashRegistersService,
    private userService : UserService,
    private reportsService: ReportsService,
    private alert: AlertService) { }

  ngOnInit(): void {
    this.baseCurrency = this.userService.enviroment('base_currency')
    this.createFiltersForm()
    this.getCashRegisters()
  }

  ngOnDestroy() {
    if (this.getCashRegistersSubscription != null) this.getCashRegistersSubscription.unsubscribe()
    if (this.filtersListenerSubscription != null) this.filtersListenerSubscription.unsubscribe()
    if (this.getReportSubscription != null) this.getReportSubscription.unsubscribe()
  }

  createFiltersForm() {
    this.filtersForm = this.formBuilder.group({
      date: this.formBuilder.control(new Date(), Validators.required),
      cash_register_id: this.formBuilder.control(0, Validators.required),
    })

    this.filtersListenerSubscription = this.filtersForm.valueChanges.subscribe(formData => {
      this.getReport(formData)
    })

    this.getReport(this.filtersForm.value)
  }

  private getCashRegisters() {
    this.alert.loading()
    this.getCashRegistersSubscription = this.cashRegistersService.list(null, 1, 99)
      .subscribe(data => {
        this.cashRegisters = data.data
        this.alert.hide()
      }, error => this.alert.error())
  }

  private getReport(formData){
    this.alert.loading()
    formData.date = formData.date.toLocaleString()
    this.getReportSubscription = this.reportsService.dayli(formData)
    .subscribe(data => {
      this.cashRegisterMovements = data.cash_register_movements
      this.currencyRates = data.currency_rates
      this.incomeAndExpenses = data.income_and_expenses
      this.cashRegisterMovementsByPaymentMethod = data.cash_register_movements_by_payment_methods
      this.alert.hide()
    }, error => this.alert.error())
  }

  getCashRegisterMovementsByType(typeId){
    return this.cashRegisterMovements.filter(i => i.type_id == typeId)
  }

  getCashRegisterMovementsByInOut(inOut){
    return this.cashRegisterMovements.filter(i => i.in_out == inOut && i.total > 0)
  }

  getCashRegisterMovementsByPaymentMethodsByInOut(inOut){
    return this.cashRegisterMovementsByPaymentMethod.filter(i => i.in_out == inOut && i.total > 0)
  }

  getIncomes(){
    return this.incomeAndExpenses.filter(i => i.in_out == 1 && i.total > 0)
  }

  getExpenses(){
    return this.incomeAndExpenses.filter(i => i.in_out == 0 && i.total > 0)
  }

}

