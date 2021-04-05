import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SubSink } from 'subsink';
import { DocumentType } from 'src/app/shared/interfaces/document-type';
import { Gender } from 'src/app/shared/interfaces/gender';
import { People } from 'src/app/shared/interfaces/people';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DocumentTypesService } from 'src/app/shared/services/document-types.service';
import { GendersService } from 'src/app/shared/services/genders.service';
import { PeopleService } from 'src/app/shared/services/people.service';
import { GuestsService } from 'src/app/shared/services/guests.service'

@Component({
  selector: 'app-sale-client-form',
  templateUrl: './sale-client-form.component.html',
  styleUrls: ['./sale-client-form.component.scss']
})
export class SaleClientFormComponent implements OnInit {

  @Output() people = new EventEmitter<People>()

  form : FormGroup
  documentTypes : DocumentType[] = []
  genders : Gender[] = []
  private subs = new SubSink();


  constructor(private alert : AlertService,
    private formBuilder : FormBuilder,
    private documentTypesService : DocumentTypesService,
    private gendersService : GendersService,
    private peopleService : PeopleService,
    private guetsService : GuestsService) { }

  ngOnInit(): void {
    this.createForm()
    this.getGenderDocumentTypes();
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  private createForm(){
    this.form = this.formBuilder.group({
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
    this.subs.add(
      this.form.valueChanges.subscribe(formData => {
        this.people.emit(formData)
      })
    );
  }

  private getGenderDocumentTypes(){

    this.subs.add(
      this.guetsService.data()
      .subscribe((data : any) => {
        this.documentTypes = data.documentTypes
        this.genders = data.genders
      }, error => {
        this.alert.error()
      })
    );
  }

  private getDocumentTypes(){
    this.alert.loading()
    this.subs.add(
      this.documentTypesService.list(null, 1, 999)
      .subscribe(data => {
        this.documentTypes = data.data
        this.alert.hide()
      }, error => {
        this.alert.error()
      })
    );
  }

  private getGenders(){
    this.alert.loading()
    this.subs.add(
      this.gendersService.list(null, 1, 999)
      .subscribe(data => {
        this.genders = data.data
        this.alert.hide()
      }, error => {
        this.alert.error()
      })
    );
  }

  getPeople(q : string){

    q = q.trim()
    this.subs.add(
    this.peopleService.list(q, 1, 5)
      .subscribe(data => {
        if(data.data.length > 0){
          this.form.setValue({
            name : data.data[0].name,
            last_name : data.data[0].last_name,
            full_name : data.data[0].full_name,
            gender_id : data.data[0].gender_id,
            document_type_id : data.data[0].document_type_id,
            document_number : data.data[0].document_number,
            address : data.data[0].address,
            phone_number : data.data[0].phone_number,
            email : data.data[0].email,
            birthday_date : data.data[0].birthday_date,
          })

        }else{
          this.alert.warning('No se encontro resultados')
        }
      }, error => {
        this.alert.error()
      })
    );
  }

  onSubmit(){
    //
  }

}
