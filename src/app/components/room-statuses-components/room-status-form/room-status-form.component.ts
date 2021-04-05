import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoomStatus } from 'src/app/shared/interfaces/room-status';

@Component({
  selector: 'app-room-status-form',
  templateUrl: './room-status-form.component.html',
  styleUrls: ['./room-status-form.component.scss']
})
export class RoomStatusFormComponent implements OnInit {
  @Input() roomStatus : RoomStatus
  @Output() onSubmit = new EventEmitter<RoomStatus>()
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
    if(this.roomStatus){
      this.form.setValue({
        name : this.roomStatus.name,
      })
    }
  }

  _onSubmit = () => {
    const roomStatus : RoomStatus = this.form.value
    this.onSubmit.emit(roomStatus)
  }

  _onCancel = () => {
    this.onCancel.emit(true)
  }

}
