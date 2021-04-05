import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { DocumentType } from 'src/app/shared/interfaces/document-type';
import { Gender } from 'src/app/shared/interfaces/gender';
import { People } from 'src/app/shared/interfaces/people';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DocumentTypesService } from 'src/app/shared/services/document-types.service';
import { GendersService } from 'src/app/shared/services/genders.service';
import { PeopleService } from 'src/app/shared/services/people.service';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GuestsService } from 'src/app/shared/services/guests.service';
import { Guest } from 'src/app/shared/interfaces/guest';
import { ErrorService } from 'src/app/shared/services/error.service';

export interface ReservationGuestResult{
  guests : Guest[],
  peopleClientId : number
}

@Component({
  selector: 'app-reservation-guests',
  templateUrl: './reservation-guests.component.html',
  styleUrls: ['./reservation-guests.component.scss']
})
export class ReservationGuestsComponent implements OnInit {
  @Input() showTitle : boolean = false
  @Input() showGuestsList : boolean = true
  @Output() result = new EventEmitter<ReservationGuestResult>()
  @Output() newGuest = new EventEmitter<Guest>()

  @ViewChild('peopleSearchInput') peopleSearchInput: ElementRef;

  showPeopleNotFound : Boolean = false
  showPeopleLoader : Boolean = false
  documentTypes : DocumentType[] = []
  genders : Gender[] = []
  people : People[] = []
  person : People = null
  form : FormGroup
  guests : Guest[] = []
  peopleClientId : number = null

  getDocumentTypesSubscription : Subscription = null
  getGendersSubscription : Subscription = null
  getPeopleSubscription : Subscription = null
  searchPeopleSubscription : Subscription = null
  createGuestSubscription : Subscription = null

  constructor(private alert : AlertService,
    private documentTypesService : DocumentTypesService,
    private gendersService : GendersService,
    private formBuilder : FormBuilder,
    private errorService : ErrorService,
    private guestsService : GuestsService,
    private peopleService : PeopleService) { }

  ngOnInit() {
    this.createForm();
    this.getData();
    //this.getDocumentTypes();
    //this.getGenders();
  }

  ngAfterViewInit() {
    // server-side search
    this.searchPeopleSubscription = fromEvent(this.peopleSearchInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap((text) => {
          this.getPeople(this.peopleSearchInput.nativeElement.value)
        })
      )
      .subscribe();
  }

  ngOnDestroy(){
    if(this.getDocumentTypesSubscription != null) this.getDocumentTypesSubscription.unsubscribe()
    if(this.getGendersSubscription != null) this.getGendersSubscription.unsubscribe()
    if(this.getPeopleSubscription != null) this.getPeopleSubscription.unsubscribe()
    if(this.searchPeopleSubscription != null) this.searchPeopleSubscription.unsubscribe()
    if(this.createGuestSubscription != null) this.createGuestSubscription.unsubscribe()
  }

  private createForm(){
    this.form = this.formBuilder.group({
      name : this.formBuilder.control(''),
      last_name : this.formBuilder.control(''),
      full_name : this.formBuilder.control(''),
      gender_id : this.formBuilder.control('1', [
        Validators.required
      ]),
      document_type_id : this.formBuilder.control('1', [
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
  }

  public searchDocument() {
    this.alert.loading();
    const document = this.form.value.document_number;
    const documentType = this.form.value.document_type_id;

    this.peopleService.searchApi(documentType, document)
      .subscribe((response: any) => {
        const person = response;
        if (person) {
          if (documentType == 1) {
            this.form.controls['name'].setValue(person.nombres);
            this.form.controls['last_name'].setValue(person.apellidos);
            this.form.controls['email'].setValue(person.email);
            this.form.controls['address'].setValue(person.direccion);
          }

          if (documentType == 3) {
             this.form.controls['full_name'].setValue(person.razon_social);
          }

          this.alert.hide()
        }
      });


  }

  public getData()
  {
      this.getDocumentTypesSubscription = this.guestsService.data()
      .subscribe((data : any) => {
        this.documentTypes = data.documentTypes;
        this.genders = data.genders;
      });
  }


  getPeople(q : string){
    q = q.trim()
    if(q && q.length > 2){
      this.showPeopleNotFound = false
      this.showPeopleLoader = true
      this.person = null
      this.getPeopleSubscription = this.peopleService.list(q, 1, 5)
      .subscribe(data => {
        this.showPeopleLoader = false
        this.people = data.data
        if(!data.data.length) this.showPeopleNotFound = true
      }, error => {
        this.alert.error()
      })
    }
  }

  selectPerson(person : People){
    this.showPeopleNotFound = false
    this.person = person
    this.setFormData()
  }

  addBlankForm(){
    this.showPeopleNotFound = false
    this.person = {
      name : '',
      last_name : '',
      full_name : '',
      gender_id : 1,
      document_type_id : 1,
      document_number : this.peopleSearchInput.nativeElement.value,
      address : '',
      phone_number : '',
      email : '',
      birthday_date : null
    }
    this.setFormData()
  }

  setFormData(){
    this.form.setValue({
      name : this.person.name,
      last_name : this.person.last_name,
      full_name : this.person.full_name,
      gender_id : this.person.gender_id,
      document_type_id : this.person.document_type_id,
      document_number : this.person.document_number,
      address : this.person.address,
      phone_number : this.person.phone_number,
      email : this.person.email,
      birthday_date : this.person.birthday_date,
    })
  }

  onFormCancel(){
    this.person = null

    this.form.setValue({
      name : '',
      last_name : '',
      full_name : '',
      gender_id : '1',
      document_type_id : '1',
      document_number : '',
      address : '',
      phone_number : '',
      email : '',
      birthday_date : '',
    })

    this.resetAll()
  }

  addPerson(person : People = null){
    const guestData : People = person ? person : this.form.value
    if(guestData.document_type_id != 3) guestData.full_name = `${guestData.name} ${guestData.last_name}`
    this.alert.loading()
    this.createGuestSubscription = this.guestsService.create(guestData)
    .subscribe((data : any) => {
      const index = this.guests.findIndex(i => i.id == data.data.id)
      if(index == -1) this.guests.push(data.data)
      else this.guests[index] = data.data
      if(this.guests.length == 1) this.peopleClientId = data.data.people.id
      this.emitResult(data.data)
      this.resetAll()
      this.alert.hide()
    },
    error => {
      this.alert.error('Ooops', this.errorService.make(error.error))
    })
  }

  resetAll(){
    this.form.reset()
    this.person = null
    this.people = []
    this.peopleSearchInput.nativeElement.value = ''
  }

  removeGuest(index){
    if(this.guests[index].people.id == this.peopleClientId) this.peopleClientId = null
    this.guests.splice(index, 1)
    this.emitResult()
  }

  setPeopleClientId(checked, peopleClientId){
    if(checked) this.peopleClientId = peopleClientId
    else this.peopleClientId = null
    this.emitResult()
  }

  private emitResult(guest = null){
    this.result.emit({
      guests : this.guests,
      peopleClientId : this.peopleClientId
    });
    this.newGuest.emit(guest)
  }

}
