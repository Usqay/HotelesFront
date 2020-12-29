import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CashRegister } from 'src/app/interfaces/cash-register';

@Component({
  selector: 'app-cash-register-form',
  templateUrl: './cash-register-form.component.html',
  styleUrls: ['./cash-register-form.component.scss']
})
export class CashRegisterFormComponent implements OnInit {
  @Input() cashRegister : CashRegister
  @Output() onSubmit = new EventEmitter<CashRegister>()
  @Output() onCancel = new EventEmitter<any>()
  
  form : FormGroup

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
  }
  
  createForm = () => {
    this.form = this.formBuilder.group({
      name : this.formBuilder.control('', Validators.required),
      location : this.formBuilder.control(''),
      description : this.formBuilder.control(''),
    });

    this.setData()
  }

  setData(){
    if(this.cashRegister){
      this.form.setValue({
        name : this.cashRegister.name,
        location : this.cashRegister.location,
        description : this.cashRegister.description,
      })
    }
  }

  _onSubmit = () => {
    const cashRegister : CashRegister = this.form.value
    this.onSubmit.emit(cashRegister)
  }

  _onCancel = () => {
    this.onCancel.emit(true)
  }
}
