import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoomCategory } from 'src/app/shared/interfaces/room-category';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { RoomCategoriesService } from 'src/app/shared/services/room-categories.service';

@Component({
  selector: 'app-create-room-category',
  templateUrl: './create-room-category.component.html',
  styleUrls: ['./create-room-category.component.scss']
})
export class CreateRoomCategoryComponent implements OnInit {

  createSubscription : Subscription = null

  constructor(private alert : AlertService,
    private errorService : ErrorService,
    private router : Router,
    private roomCategoryService : RoomCategoriesService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    if(this.createSubscription != null) this.createSubscription.unsubscribe()
  }

  onSubmit = (roomCategory : RoomCategory) => {
    this.alert.loading()
    this.createSubscription = this.roomCategoryService.create(roomCategory)
    .subscribe(data => {
      this.alert.success('Exito', 'Registro correcto')
      location.reload()
    }, error => {
      this.alert.error('Ooops', this.errorService.make(error.error))
    })
  }

  onCancel(){
    this.router.navigate(['/room-categories'])
  }

}
