import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DocumentType } from 'src/app/interfaces/document-type';
import { Gender } from 'src/app/interfaces/gender';
import { Role } from 'src/app/interfaces/role';
import { User } from 'src/app/interfaces/user';
import { AlertService } from 'src/app/services/alert.service';
import { DocumentTypesService } from 'src/app/services/document-types.service';
import { GendersService } from 'src/app/services/genders.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() user : User
  @Output() onSubmit = new EventEmitter<User>()
  @Output() onCancel = new EventEmitter<any>()
  
  form : FormGroup
  documentTypes : DocumentType[] = []
  genders : Gender[] = []
  roles : Role[] = []

  getDocumentTypesSubscription : Subscription = null
  getGendersSubscription : Subscription = null
  getRolesSubscription : Subscription = null

  constructor(private formBuilder : FormBuilder,
    private documentTypesService : DocumentTypesService,
    private gendersService : GendersService,
    private rolesService : RolesService,
    private alert : AlertService) { }

  ngOnInit(): void {
    this.createForm()
    this.getDocumentTypes()
    this.getGenders()
    this.getRoles()
  }

  ngOnDestroy(){
    if(this.getDocumentTypesSubscription != null) this.getDocumentTypesSubscription.unsubscribe()
    if(this.getGendersSubscription != null) this.getGendersSubscription.unsubscribe()
    if(this.getRolesSubscription != null) this.getRolesSubscription.unsubscribe()
  }
  
  createForm = () => {
    this.form = this.formBuilder.group({
      name : this.formBuilder.control('', Validators.required),
      last_name : this.formBuilder.control('', Validators.required),
      gender_id : this.formBuilder.control(1, Validators.required),
      role_id : this.formBuilder.control(1, Validators.required),
      document_type_id : this.formBuilder.control(1, Validators.required),
      document_number : this.formBuilder.control('', Validators.required),
      address : this.formBuilder.control(''),
      phone_number : this.formBuilder.control(''),
      email : this.formBuilder.control('', [Validators.required, Validators.email]),
      password : this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
      ]),
      birthday_date : this.formBuilder.control(''),
    });

    this.setData()
  }

  setData(){
    if(this.user){
      this.form.setValue({
        name : this.user.people.name,
        last_name : this.user.people.last_name,
        gender_id : this.user.people.gender_id,
        role_id : this.user.role.id,
        document_type_id : this.user.people.document_type_id,
        document_number : this.user.people.document_number,
        address : this.user.people.address,
        phone_number : this.user.people.phone_number,
        password : '',
        email : this.user.people.email,
        birthday_date : this.user.people.birthday_date,
      })
    }
  }

  _onSubmit = () => {
    const user : User = this.form.value
    this.onSubmit.emit(user)
  }

  _onCancel = () => {
    this.onCancel.emit(true)
  }

  
  private getDocumentTypes(){
    this.alert.loading()
    this.getDocumentTypesSubscription = this.documentTypesService.list(null, 1, 999)
    .subscribe(data => {
      this.documentTypes = data.data
      this.alert.hide()
    }, error => {
      this.alert.error()
    })
  }

  private getGenders(){
    this.alert.loading()
    this.getGendersSubscription = this.gendersService.list(null, 1, 999)
    .subscribe(data => {
      this.genders = data.data
      this.alert.hide()
    }, error => {
      this.alert.error()
    })
  }

  private getRoles(){
    this.alert.loading()
    this.getRolesSubscription = this.rolesService.list(null, 1, 999)
    .subscribe(data => {
      this.roles = data.data
      this.alert.hide()
    }, error => {
      this.alert.error()
    })
  }
}
