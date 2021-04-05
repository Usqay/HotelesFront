import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Role } from 'src/app/shared/interfaces/role';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {
  @Input() role : Role
  @Output() onSubmit = new EventEmitter<Role>()
  @Output() onCancel = new EventEmitter<any>()

  form : FormGroup

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm = () => {
    this.form = this.formBuilder.group({
      name : this.formBuilder.control('', Validators.required),
    });

    this.setData()
  }

  setData(){
    if(this.role){
      this.form.setValue({
        name : this.role.name,
      })
    }
  }

  _onSubmit = () => {
    const role : Role = this.form.value
    this.onSubmit.emit(role)
  }

  _onCancel = () => {
    this.onCancel.emit(true)
  }

}
