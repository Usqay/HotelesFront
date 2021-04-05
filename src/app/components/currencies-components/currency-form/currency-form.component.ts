import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Currency } from 'src/app/shared/interfaces/currency';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss']
})
export class CurrencyFormComponent implements OnInit {
  @Input() currency : Currency
  @Output() onSubmit = new EventEmitter<Currency>()
  @Output() onCancel = new EventEmitter<any>()

  form : FormGroup

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm = () => {
    this.form = this.formBuilder.group({
      name : this.formBuilder.control('', Validators.required),
      plural_name : this.formBuilder.control('', Validators.required),
      code : this.formBuilder.control('', Validators.required),
      symbol : this.formBuilder.control('', Validators.required),
      is_base : this.formBuilder.control(false, Validators.required),
    });

    this.setData()
  }

  setData(){
    if(this.currency){
      this.form.setValue({
        name : this.currency.name,
        plural_name : this.currency.plural_name,
        code : this.currency.code,
        symbol : this.currency.symbol,
        is_base : this.currency.is_base,
      })
    }
  }

  _onSubmit = () => {
    const currency : Currency = this.form.value
    this.onSubmit.emit(currency)
  }

  _onCancel = () => {
    this.onCancel.emit(true)
  }

}
