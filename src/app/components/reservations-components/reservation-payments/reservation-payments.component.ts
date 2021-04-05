import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Currency } from 'src/app/shared/interfaces/currency';
import { DocumentType } from 'src/app/shared/interfaces/document-type';
import { Gender } from 'src/app/shared/interfaces/gender';
import { PaymentMethod } from 'src/app/shared/interfaces/payment-method';
import { Reservation } from 'src/app/shared/interfaces/reservation';
import { ReservationPayment } from 'src/app/shared/interfaces/reservation-payment';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CurrenciesService } from 'src/app/shared/services/currencies.service';
import { DocumentTypesService } from 'src/app/shared/services/document-types.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { GendersService } from 'src/app/shared/services/genders.service';
import { PaymentMethodsService } from 'src/app/shared/services/payment-methods.service';
import { PeopleService } from 'src/app/shared/services/people.service';
import { ReservationPaymentsService } from 'src/app/shared/services/reservation-payments.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-reservation-payments',
  templateUrl: './reservation-payments.component.html',
  styleUrls: ['./reservation-payments.component.scss']
})
export class ReservationPaymentsComponent implements OnInit {
  @Input() reservation: Reservation
  @Output() reload = new EventEmitter<boolean>()

  reservationPayments: ReservationPayment[] = []
  paymentMethods: PaymentMethod[] = []
  documentTypes : DocumentType[] = []
  genders : Gender[] = []
  showForm: boolean = false
  showPeopleForm: boolean = false
  rateValue = 0
  baseCashRegisterId : number = null
  baseCurrency : Currency = null
  peopleFullName = 'Anonimo'
  peopleId : number = null

  subtotal : number = 0
  taxValue : number = 0
  total : number = 0
  paymentBack : number = 0

  form: FormGroup
  peopleForm : FormGroup

  reservationPaymentSubscription: Subscription = null
  currenciesSubscription: Subscription = null
  paymentSubscription: Subscription = null
  paymentMethodsSubscription: Subscription = null
  getDocumentTypesSubscription : Subscription = null
  getGendersSubscription : Subscription = null
  peopleSubscription : Subscription = null
  formSubscription : Subscription = null

  constructor(private reservationPaymentsService: ReservationPaymentsService,
    private errorService: ErrorService,
    private formBuilder: FormBuilder,
    private currenciesService: CurrenciesService,
    private paymentMethodsService: PaymentMethodsService,
    private peopleService: PeopleService,
    private documentTypesService : DocumentTypesService,
    private gendersService : GendersService,
    private userService : UserService,
    private alert: AlertService) { }

  ngOnInit(): void {
    this.baseCashRegisterId = this.userService.enviroment('cash_register').id;
    this.createForm()
    this.getCurrencies()
    this.getPaymentMethods()
    this.getDocumentTypes()
    this.getGenders()
  }

  ngAfterViewInit() {
    this.getReservationPayments()
  }

  ngOnDestroy() {
    if (this.reservationPaymentSubscription != null) this.reservationPaymentSubscription.unsubscribe()
    if (this.currenciesSubscription != null) this.currenciesSubscription.unsubscribe()
    if (this.paymentMethodsSubscription != null) this.paymentMethodsSubscription.unsubscribe()
    if (this.getDocumentTypesSubscription != null) this.getDocumentTypesSubscription.unsubscribe()
    if (this.getGendersSubscription != null) this.getGendersSubscription.unsubscribe()
    if (this.peopleSubscription != null) this.peopleSubscription.unsubscribe()
    if (this.paymentSubscription != null) this.paymentSubscription.unsubscribe()
    if (this.formSubscription != null) this.formSubscription.unsubscribe()
  }

  createForm() {
    this.form = this.formBuilder.group({
      description: this.formBuilder.control(''),
      reservation_id: this.formBuilder.control(this.reservation.id, Validators.required),
      payment_method_id: this.formBuilder.control(1, Validators.required),
      total: this.formBuilder.control(1, [Validators.required, Validators.min(1)]),
      payment_amount: this.formBuilder.control(null),
      payment_by_reservation: this.formBuilder.control(true, Validators.required),
      payment_by_products: this.formBuilder.control(false, Validators.required),
      print_payment: this.formBuilder.control(true, Validators.required),
    })

    this.peopleForm = this.formBuilder.group({
      name : this.formBuilder.control(''),
      last_name : this.formBuilder.control(''),
      full_name : this.formBuilder.control(''),
      gender_id : this.formBuilder.control(1, [
        Validators.required
      ]),
      document_type_id : this.formBuilder.control(1, [
        Validators.required
      ]),
      document_number : this.formBuilder.control('', [
        Validators.required
      ]),
      address : this.formBuilder.control(''),
      phone_number : this.formBuilder.control(''),
      email : this.formBuilder.control(''),
      birthday_date : this.formBuilder.control(''),
    })

    if(this.reservation && this.reservation.client && this.reservation.client.people){
      this.peopleFullName = this.reservation.client.people.full_name
      this.peopleId = this.reservation.client.people.id

      this.peopleForm.setValue({
        name : this.reservation.client.people.name,
        last_name : this.reservation.client.people.last_name,
        full_name : this.reservation.client.people.full_name,
        gender_id : this.reservation.client.people.gender_id,
        document_type_id : this.reservation.client.people.document_type_id,
        document_number : this.reservation.client.people.document_number,
        address : this.reservation.client.people.address,
        phone_number : this.reservation.client.people.phone_number,
        email : this.reservation.client.people.email,
        birthday_date : this.reservation.client.people.birthday_date,
      })
    }

    this.formSubscription = this.form.valueChanges
    .subscribe(formData => {
      this.calculateTotals(formData)
    })

    this.calculateTotals({
      total : 1,
      payment_amount : null
    })
  }

  getReservationPayments() {
    this.reservationPaymentSubscription = this.reservationPaymentsService.list(this.reservation.id, null, 1, 999)
      .subscribe(data => {
        this.reservationPayments = data.data
      }, error => {
        this.alert.error('Ooops', this.errorService.make(error.error))
      })
  }

  private getCurrencies() {
    this.currenciesSubscription = this.currenciesService.list(null, 1, 9999)
      .subscribe(data => {
        data.data.forEach(i => {
          if(i.is_base){
            this.baseCurrency = i
          }
        })
      }, error => {
        this.alert.error()
      })
  }

  private getPaymentMethods() {
    this.paymentMethodsSubscription = this.paymentMethodsService.list(null, 1, 9999)
      .subscribe(data => {
        this.paymentMethods = data.data
      }, error => {
        this.alert.error()
      })
  }

  private getDocumentTypes(){

    this.getDocumentTypesSubscription = this.documentTypesService.list(null, 1, 999)
    .subscribe(data => {
      this.documentTypes = data.data

    }, error => {
      this.alert.error()
    })
  }

  private getGenders(){

    this.getGendersSubscription = this.gendersService.list(null, 1, 999)
    .subscribe(data => {
      this.genders = data.data

    }, error => {
      this.alert.error()
    })
  }

  onSubmit(documentType = 'bol'){

    this.alert.loading()
    const formData = this.form.value
    const reservationPayment : ReservationPayment = formData
    if(formData.payment_by_products == true) reservationPayment.payment_by = 1
    if(formData.payment_by_reservation == true) reservationPayment.payment_by = 0
    if(formData.payment_by_products == true && formData.payment_by_reservation == true) reservationPayment.payment_by = 2
    reservationPayment.people_id = this.peopleId
    reservationPayment.reservation_id = this.reservation.id
    reservationPayment.document_type = documentType

    if(reservationPayment.total >= 750 && this.peopleId == null){
      this.alert.warning('Para montos mayores a 750, es necesario ingresar los datos del cliente')
    }else{
      const cash_register_id = this.userService.enviroment('cash_register').id
      this.paymentSubscription = this.reservationPaymentsService.create({
        ...reservationPayment,
        cash_register_id : cash_register_id,
        payment_back : this.paymentBack
      })
      .subscribe((data : any) => {
        if(data.data.success == true){
          this.alert.success()
          this.form.setValue({
            description : '',
            reservation_id : this.reservation.id,
            payment_method_id : 1,
            total : 1,
            payment_amount : null,
            payment_by_reservation : true,
            payment_by_products : false,
            print_payment : true,
          });
          this.showForm = false
          this.showPeopleForm = false
          this.reload.emit(true)
          this.getReservationPayments()

          var win = window.open();
          win.document.open();
          win.document.write(data.data.imprimir);
          win.document.close();
          win.focus();

        }else{
          this.alert.error('Ooops', data.data.error)
        }
      }, error => {
        this.alert.error('Ooops', this.errorService.make(error.error))
      })
    }

  }

  onSubmitPeople(){
    this.alert.loading()
    const formData = this.peopleForm.value
    if(formData.document_type_id != 3){
      formData.full_name = `${formData.name} ${formData.last_name}`
    }
    this.peopleSubscription = this.peopleService.create(formData)
    .subscribe((data : any) => {
      console.log(data.data)
      this.peopleFullName = data.data.full_name
      this.peopleId = data.data.id
      this.alert.hide()
      this.showPeopleForm = false
      this.showForm = true
    }, error => {
      this.errorService.make(error.error)
    })
  }

  private calculateTotals(formData){
    this.total = formData.total
    this.subtotal = this.total / 1.18
    this.taxValue = this.total - this.subtotal
    this.paymentBack = 0
    if(formData.payment_amount && formData.payment_amount > 0){
      this.paymentBack = parseFloat((formData.payment_amount - this.total).toFixed(2))
    }
  }

}
