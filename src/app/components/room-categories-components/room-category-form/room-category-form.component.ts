import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomCategory } from 'src/app/interfaces/room-category';

@Component({
  selector: 'app-room-category-form',
  templateUrl: './room-category-form.component.html',
  styleUrls: ['./room-category-form.component.scss']
})
export class RoomCategoryFormComponent implements OnInit {
  @Input() roomCategory : RoomCategory
  @Output() onSubmit = new EventEmitter<RoomCategory>()
  @Output() onCancel = new EventEmitter<any>()
  
  form : FormGroup

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
  }
  
  createForm = () => {
    this.form = this.formBuilder.group({
      name : this.formBuilder.control('', Validators.required),
      capacity : this.formBuilder.control(1, [
        Validators.required,
        Validators.min(1)
      ]),
    });

    this.setData()
  }

  setData(){
    if(this.roomCategory){
      this.form.setValue({
        name : this.roomCategory.name,
        capacity : this.roomCategory.capacity,
      })
    }
  }

  _onSubmit = () => {
    const roomCategory : RoomCategory = this.form.value
    this.onSubmit.emit(roomCategory)
  }

  _onCancel = () => {
    this.onCancel.emit(true)
  }

}
