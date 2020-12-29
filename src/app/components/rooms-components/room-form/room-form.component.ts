import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Room } from 'src/app/interfaces/room';
import { RoomCategory } from 'src/app/interfaces/room-category';
import { RoomStatus } from 'src/app/interfaces/room-status';
import { AlertService } from 'src/app/services/alert.service';
import { RoomCategoriesService } from 'src/app/services/room-categories.service';
import { RoomStatusesService } from 'src/app/services/room-statuses.service';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss']
})
export class RoomFormComponent implements OnInit {
  @Input() room : Room
  @Output() onSubmit = new EventEmitter<Room>()
  @Output() onCancel = new EventEmitter<any>()
  
  form : FormGroup
  roomCategories : RoomCategory[] = []
  roomStatuses : RoomStatus[] = []

  roomCategoriesSubscription : Subscription = null
  roomStatusesSubscription : Subscription = null

  constructor(private formBuilder : FormBuilder,
    private roomCategoriesService : RoomCategoriesService,
    private roomStatusesService : RoomStatusesService,
    private alert : AlertService) { }

  ngOnInit(): void {
    this.createForm()
    this.getRoomCategories()
    this.getRoomStatuses()
  }

  ngOnDestroy(){
    if(this.roomCategoriesSubscription != null) this.roomCategoriesSubscription.unsubscribe()
    if(this.roomStatusesSubscription != null) this.roomStatusesSubscription.unsubscribe()
  }
  
  createForm = () => {
    this.form = this.formBuilder.group({
      name : this.formBuilder.control('', Validators.required),
      description : this.formBuilder.control(''),
      capacity : this.formBuilder.control('1', [
        Validators.required,
        Validators.min(1),
      ]),
      room_category_id : this.formBuilder.control('', [
        Validators.required,
        Validators.min(1),
      ]),
      room_status_id : this.formBuilder.control('', [
        Validators.required,
        Validators.min(1),
      ]),
    });

    this.setData()
  }

  setData(){
    if(this.room){
      this.form.setValue({
        name : this.room.name,
        description : this.room.description,
        capacity : this.room.capacity,
        room_category_id : this.room.room_category.id,
        room_status_id : this.room.room_status.id,
      })
    }
  }

  _onSubmit = () => {
    const room : Room = this.form.value
    this.onSubmit.emit(room)
  }

  _onCancel = () => {
    this.onCancel.emit(true)
  }

  private getRoomCategories(){
    this.alert.loading()
    this.roomCategoriesSubscription = this.roomCategoriesService.list(null, 1, 999)
    .subscribe(data => {
      this.roomCategories = data.data
      this.alert.hide()
    }, error => {
      this.alert.error()
    })
  }

  private getRoomStatuses(){
    this.alert.loading()
    this.roomStatusesSubscription = this.roomStatusesService.list(null, 1, 999)
    .subscribe(data => {
      this.roomStatuses = data.data
      this.alert.hide()
    }, error => {
      this.alert.error()
    })
  }

}
