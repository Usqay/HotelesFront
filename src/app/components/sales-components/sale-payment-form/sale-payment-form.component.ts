import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SubSink } from 'subsink';
import { CashRegister } from 'src/app/shared/interfaces/cash-register';
import { Currency } from 'src/app/shared/interfaces/currency';
import { PaymentMethod } from 'src/app/shared/interfaces/payment-method';
import { AlertService } from 'src/app/shared/services/alert.service';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-sale-payment-form',
  templateUrl: './sale-payment-form.component.html',
  styleUrls: ['./sale-payment-form.component.scss']
})
export class SalePaymentFormComponent implements OnInit {
  @Input() total : number = 1
  @Output() onCancel = new EventEmitter<boolean> ()
  @Output() onSubmit = new EventEmitter<any> ()

  private subs = new SubSink();
  form : FormGroup
  currencies : Currency[] = []
  baseCurrency : Currency = null
  paymentMethods : PaymentMethod[] = []
  subtotal : number = 0
  taxValue : number = 0
  paymentTotal : number = 0
  paymentBack : number = 0
  cashRegister : CashRegister = null



  constructor(private alert : AlertService,
    private formBuilder : FormBuilder,
    private userService : UserService,
    private roomService : RoomsService) { }

  ngOnInit(): void {
    this.cashRegister = this.userService.enviroment('cash_register')
    this.createForm()
    this.getCurrenciesPaymentMethods()
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
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
    this.subs.add(
      this.form.controls['total'].valueChanges.subscribe(value => {
        this.calculateTotals(value)
      })
    );

    this.calculateTotals(this.total)
  }

  private getCurrenciesPaymentMethods(){

    this.subs.add(
      this.roomService.getCurrencPaymentMethod()
      .subscribe((data : any) => {
        this.paymentMethods = data.paymentMethods
        this.currencies = data.currencies
        this.currencies.forEach(i => {
          if(i.is_base){
            this.baseCurrency = i
            this.form.controls['currency_id'].setValue(i.id)
          }
        })

      }, error => {
        this.alert.error()
      })
    );
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
