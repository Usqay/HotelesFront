import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Turn } from 'src/app/shared/interfaces/turn';

@Component({
  selector: 'app-turn-form',
  templateUrl: './turn-form.component.html',
  styleUrls: ['./turn-form.component.scss']
})
export class TurnFormComponent implements OnInit {
  @Input() turn : Turn
  @Output() onSubmit = new EventEmitter<Turn>()
  @Output() onCancel = new EventEmitter<any>()

  form : FormGroup

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm = () => {
    this.form = this.formBuilder.group({
      name : this.formBuilder.control('', Validators.required),
      open_time : this.formBuilder.control('', Validators.required),
      close_time : this.formBuilder.control('', Validators.required),
    });

    this.setData()
  }

  setData(){
    if(this.turn){
      this.form.setValue({
        name : this.turn.name,
        open_time : this.turn.open_time,
        close_time : this.turn.close_time,
      })
    }
  }

  _onSubmit = () => {
    const turn : Turn = this.form.value
    this.onSubmit.emit(turn)
  }

  _onCancel = () => {
    this.onCancel.emit(true)
  }
}
