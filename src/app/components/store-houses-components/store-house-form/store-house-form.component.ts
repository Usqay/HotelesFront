import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StoreHouse } from 'src/app/shared/interfaces/store-house';

@Component({
  selector: 'app-store-house-form',
  templateUrl: './store-house-form.component.html',
  styleUrls: ['./store-house-form.component.scss']
})
export class StoreHouseFormComponent implements OnInit {
  @Input() storeHouse : StoreHouse
  @Output() onSubmit = new EventEmitter<StoreHouse>()
  @Output() onCancel = new EventEmitter<any>()

  form : FormGroup

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm = () => {
    this.form = this.formBuilder.group({
      name : this.formBuilder.control('', Validators.required),
      description : this.formBuilder.control(''),
      address : this.formBuilder.control('', Validators.required),
      is_base : this.formBuilder.control(false, Validators.required),
    });

    this.setData()
  }

  setData(){
    if(this.storeHouse){
      this.form.setValue({
        name : this.storeHouse.name,
        address : this.storeHouse.address,
        description : this.storeHouse.description,
        is_base : this.storeHouse.is_base,
      })
    }
  }

  _onSubmit = () => {
    const storeHouse : StoreHouse = this.form.value
    this.onSubmit.emit(storeHouse)
  }

  _onCancel = () => {
    this.onCancel.emit(true)
  }

}
