import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { Room } from 'src/app/shared/interfaces/room';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentType } from 'src/app/shared/interfaces/document-type';
import { Subscription } from 'rxjs';
import { DocumentTypesService } from 'src/app/shared/services/document-types.service';
import { GendersService } from 'src/app/shared/services/genders.service';
import { Gender } from 'src/app/shared/interfaces/gender';
import { PeopleService } from 'src/app/shared/services/people.service';
import { RoomPrice } from 'src/app/shared/interfaces/room-price';
import { Currency } from 'src/app/shared/interfaces/currency';
import { UserService } from 'src/app/shared/services/user.service';
import { CurrenciesService } from 'src/app/shared/services/currencies.service';
import { CurrencyRate } from 'src/app/shared/interfaces/currency-rate';
import { PaymentMethod } from 'src/app/shared/interfaces/payment-method';
import { PaymentMethodsService } from 'src/app/shared/services/payment-methods.service';
import { CashRegister } from 'src/app/shared/interfaces/cash-register';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms-card-list',
  templateUrl: './rooms-card-list.component.html',
  styleUrls: ['./rooms-card-list.component.scss'],
  animations: [
    trigger('hover', [
      state('hoverIn', style({
        backgroundColor: '#0A5C9E',
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
        color: '#fff',
      })),
      state('hoverOut', style({
        backgroundColor: '#ffffff',
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        color: '#2B2B2B',
      })),
      transition('hoverIn => hoverOut', [
        animate('0.25s')
      ]),
      transition('hoverOut => hoverIn', [
        animate('0.1s'),

      ]),
    ]),
    trigger('active', [
      state('active', style({
        backgroundColor: '#0A5C9E',
        color: '#fff',
      })),
      state('inactive', style({
        backgroundColor: '#ffffff',
        color: '#2B2B2B',
      })),
      transition('active => inactive', [
        animate('0.25s')
      ]),
      transition('inactive => active', [
        animate('0.1s'),

      ]),
    ]),
  ]
})
export class RoomsCardListComponent implements OnInit {
  @Input() rooms : Room[] = []
  @Input() totalItems : number = 0
  @Output() pageEvent = new EventEmitter<any>()
  @Output() reload = new EventEmitter<boolean>()

  activeRoom : Room = null

  form : FormGroup
  documentTypes : DocumentType[] = []
  genders : Gender[] = []
  currencies : Currency[] = []
  paymentMethods : PaymentMethod[] = []
  _today = new Date()
  baseCurrency : Currency = null
  cashRegister : CashRegister = null
  currencyRates : CurrencyRate[] = []
  customRoomPrice = false
  totalDays = 0
  totalHours = 0
  endPrice = 0
  rateValue = 1
  paymentBack = 0

  getDocumentTypesSubscription : Subscription = null
  getGendersSubscription : Subscription = null
  getPeopleSubscription : Subscription = null
  getCurrenciesSubscription : Subscription = null
  getPaymentMethodsSubscription : Subscription = null
  formListenerSubscription : Subscription = null
  formSubmitSubscription : Subscription = null
  dialogSubscription : Subscription = null
  itemDeleteSubscription : Subscription = null

  constructor(private alert : AlertService,
    private documentTypesService : DocumentTypesService,
    private gendersService : GendersService,
    private peopleService : PeopleService,
    private userService : UserService,
    private errorService : ErrorService,
    public dialog: MatDialog,
    private paymentMethodsService : PaymentMethodsService,
    private currenciesService : CurrenciesService,
    private roomsService : RoomsService,
    private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.customRoomPrice = false
    this.totalDays = 0
    this.totalHours = 0
    this.endPrice = 0
    this.rateValue = 1
    this.paymentBack = 0
    this.activeRoom = null
    this.baseCurrency = this.userService.enviroment('base_currency')
    this.currencyRates = this.userService.enviroment('currency_rates')
    this.cashRegister = this.userService.enviroment('cash_register')
    this.createForm()
    this.getData();
    /*this.getDocumentTypes()
    this.getGenders()
    this.getCurrencies()
    this.getPaymentMethods()*/
  }

  ngOnDestroy(){
    if(this.getDocumentTypesSubscription != null) this.getDocumentTypesSubscription.unsubscribe()
    if(this.getGendersSubscription != null) this.getGendersSubscription.unsubscribe()
    if(this.getPeopleSubscription != null) this.getPeopleSubscription.unsubscribe()
    if(this.getCurrenciesSubscription != null) this.getCurrenciesSubscription.unsubscribe()
    if(this.formListenerSubscription != null) this.formListenerSubscription.unsubscribe()
    if(this.getPaymentMethodsSubscription != null) this.getPaymentMethodsSubscription.unsubscribe()
    if(this.formSubmitSubscription != null) this.formSubmitSubscription.unsubscribe()
    if(this.dialogSubscription != null) this.dialogSubscription.unsubscribe()
    if(this.itemDeleteSubscription != null) this.itemDeleteSubscription.unsubscribe()
  }

  createForm(){
    this.form = this.formBuilder.group({
      start_date : this.formBuilder.control(new Date(), Validators.required),
      end_date : this.formBuilder.control(new Date(), Validators.required),
      room_price_type : this.formBuilder.control('day', Validators.required),
      room_price_value : this.formBuilder.control(null, Validators.required),
      room_price_currency_id : this.formBuilder.control(this.baseCurrency.id, Validators.required),
      people_name : this.formBuilder.control(''),
      people_last_name : this.formBuilder.control(''),
      people_full_name : this.formBuilder.control(''),
      people_gender_id : this.formBuilder.control(1, [
        Validators.required
      ]),
      people_document_type_id : this.formBuilder.control(1, [
        Validators.required
      ]),
      people_document_number : this.formBuilder.control('', [
        Validators.required, Validators.minLength(8)
      ]),
      create_payment : this.formBuilder.control(true, Validators.required),
      print_payment : this.formBuilder.control(true, Validators.required),
      payment_amount : this.formBuilder.control(0, Validators.min(0)),
      payment_total : this.formBuilder.control(0, Validators.min(0)),
      payment_back : this.formBuilder.control(0, Validators.min(0)),
      payment_method_id : this.formBuilder.control(1),
      payment_document_type : this.formBuilder.control('not'),
      mark_checking : this.formBuilder.control(true, Validators.required)
    });

    this.formListenerSubscription = this.form.valueChanges.subscribe(formData => {
      this.calculateTotal(formData)
    })
  }

  onChangePage(event){
    this.pageEvent.emit(event)
  }

  getData(){
    this.roomsService.getData()
    .subscribe((data : any)=>{
      this.documentTypes = data.documentTypes;
      this.genders = data.genders;
      this.paymentMethods = data.paymentMethods;
      this.currencies = data.currencies;

    });
  }


  getPeople(q : string){
    q = q.trim()
    if(q && q.length > 2){
      this.getPeopleSubscription = this.peopleService.list(q, 1, 5)
      .subscribe(data => {
        if(data.data.length > 0){
          const people = data.data[0]
          this.form.controls['people_name'].setValue(people.name)
          this.form.controls['people_last_name'].setValue(people.last_name)
          this.form.controls['people_full_name'].setValue(people.full_name)
          this.form.controls['people_gender_id'].setValue(people.gender_id)
          this.form.controls['people_document_type_id'].setValue(people.document_type_id)
          this.form.controls['people_document_number'].setValue(people.document_number)
        }
      }, error => {
        this.alert.error()
      })
    }
  }

  setPriceAndCurrency(priceType, item){
    if(item != 0){
      this.customRoomPrice = false
      if(priceType == 'day') this.form.controls['room_price_value'].setValue(item.day_price)
      if(priceType == 'hour') this.form.controls['room_price_value'].setValue(item.hour_price)
      this.form.controls['room_price_currency_id'].setValue(item.currency.id)
    }else{
      this.customRoomPrice = true
    }
  }

  calculateTotal(formData){
    const start = new Date(formData.start_date);
    const end = new Date(formData.end_date);
    const dateDifference = Math.abs(start.getTime() - end.getTime())

    this.totalDays = Math.floor(dateDifference / (1000 * 3600 * 24))
    this.totalHours = Math.ceil(dateDifference / (1000 * 3600))

    if(this.totalHours == 24){
      this.totalDays = 1
    }

    this.rateValue = 1
    this.currencyRates.forEach(i => {
      if(i.currency_id == formData.room_price_currency_id){
        this.rateValue = i.rate_value
      }
    })

    this.endPrice = 0

    if(formData.room_price_type == 'day'){
      this.endPrice = formData.room_price_value * this.totalDays
    }else{
      this.endPrice = formData.room_price_value * this.totalHours
    }

    this.endPrice = parseFloat((this.endPrice * this.rateValue).toFixed(2))

    this.paymentBack = formData.payment_total - this.endPrice

  }

  onSubmit(){
    this.alert.loading()
    const formData = this.form.value
    const dataToSend = {
      ...formData,
      days : this.totalDays,
      hours : this.totalHours,
      payment_amount : this.endPrice,
      rate_value : this.rateValue,
      payment_back : this.paymentBack,
      start_date : formData.start_date.toLocaleString(),
      end_date : formData.end_date.toLocaleString(),
      room_id : this.activeRoom.id,
      cash_register_id : this.cashRegister.id
    }
    this.formSubmitSubscription = this.roomsService.reserve(dataToSend)
    .subscribe((data : any) => {
      if(data.data.success == true){
        this.alert.success()
        this.reload.emit(true)
        this.ngOnInit()
      }else{
        this.alert.error('Ooops', data.data.error)
      }
    }, error => {
      this.alert.error('Ooops', this.errorService.make(error.error))
    })
  }

  onDelete(itemId){
    this.alert.question('Se eliminará este registro')
    .then(result => {
      if(result.value){
        this.alert.loading()
        this.itemDeleteSubscription = this.roomsService.delete(itemId)
        .subscribe(data => {
          this.reload.emit(true)
        }, error => {
          this.alert.error('Ooops', 'No se pudo eliminar este registro')
        })
      }
    })
  }

  openReservationDialog(room) {
    const dialogRef = this.dialog.open(DialogRoomDetail, {
      disableClose : false,
      data : {
        room : room,
      }
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if(result && result.reserve){
        this.activeRoom = room
      }
      if(result && result.delete){
        this.onDelete(room.id)
      }
    });
  }
}

@Component({
  selector: 'dialog-room-detail',
  templateUrl: 'room-detail.html',
})
export class DialogRoomDetail {
  room: Room

  constructor(public dialogRef: MatDialogRef<DialogRoomDetail>,
    private router : Router,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.room = this.data.room
  }

  onClose() {
    this.dialogRef.close();
  }

  onShow() {
    this.onClose()
    this.router.navigate(['/rooms/show', this.room.id])
  }

  onReserve() {
    this.dialogRef.close({
      reserve : true
    });
  }

  onDelete() {
    this.dialogRef.close({
      delete : true
    });
  }
}
