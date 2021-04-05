import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoomStatus } from 'src/app/shared/interfaces/room-status';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { RoomStatusesService } from 'src/app/shared/services/room-statuses.service';

@Component({
  selector: 'app-create-room-status',
  templateUrl: './create-room-status.component.html',
  styleUrls: ['./create-room-status.component.scss']
})
export class CreateRoomStatusComponent implements OnInit {

  createSubscription : Subscription = null

  constructor(private alert : AlertService,
    private errorService : ErrorService,
    private router : Router,
    private roomStatusService : RoomStatusesService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    if(this.createSubscription != null) this.createSubscription.unsubscribe()
  }

  onSubmit = (roomStatus : RoomStatus) => {
    this.alert.loading()
    this.createSubscription = this.roomStatusService.create(roomStatus)
    .subscribe(data => {
      this.alert.success('Exito', 'Registro correcto')
      location.reload()
    }, error => {
      this.alert.error('Ooops', this.errorService.make(error.error))
    })
  }

  onCancel(){
    this.router.navigate(['/room-statuses'])
  }

}
