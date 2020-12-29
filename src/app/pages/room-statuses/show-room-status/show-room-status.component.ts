import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoomStatus } from 'src/app/interfaces/room-status';
import { AlertService } from 'src/app/services/alert.service';
import { RoomStatusesService } from 'src/app/services/room-statuses.service';

@Component({
  selector: 'app-show-room-status',
  templateUrl: './show-room-status.component.html',
  styleUrls: ['./show-room-status.component.scss']
})
export class ShowRoomStatusComponent implements OnInit {

  roomStatusId: string
  roomStatus: RoomStatus

  paramsSubscription: Subscription = null
  showRoomStatusSubscription: Subscription = null
  dialogSubscription: Subscription = null

  constructor(private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private roomStatusesService: RoomStatusesService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params
      .subscribe(params => {
        this.roomStatusId = params.id
        this.showRoomStatus()
      })
  }

  ngOnDestroy() {
    if (this.paramsSubscription != null) this.paramsSubscription.unsubscribe()
    if (this.showRoomStatusSubscription != null) this.showRoomStatusSubscription.unsubscribe()
    if (this.dialogSubscription != null) this.dialogSubscription.unsubscribe()
  }

  showRoomStatus() {
    this.alert.loading()
    this.showRoomStatusSubscription = this.roomStatusesService.show(this.roomStatusId)
      .subscribe(data => {
        this.roomStatus = data
        this.alert.hide()
      }, error => {
        this.alert.error()
        this.router.navigate(['/room-statuses'])
      })
  }

  showEditDialog() {
    const dialogRef = this.dialog.open(DialogEditRoomStatus, {
      disableClose : true,
      data : {
        roomStatusId : this.roomStatusId,
        roomStatus : this.roomStatus,
      }
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if(result && result.reload){
        this.showRoomStatus()
      }
    });
  }

}


@Component({
  selector: 'dialog-edit-room-status',
  templateUrl: 'edit-room-status.html',
})
export class DialogEditRoomStatus {
  roomStatus: RoomStatus
  roomStatusId: string

  updateSubscription: Subscription = null

  constructor(private roomStatusesService: RoomStatusesService,
    private alert: AlertService,
    public dialogRef: MatDialogRef<DialogEditRoomStatus>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.roomStatus = this.data.roomStatus
    this.roomStatusId = this.data.roomStatusId
  }

  onSubmit(roomStatus: RoomStatus) {
    this.alert.loading()
    this.updateSubscription = this.roomStatusesService.update(this.roomStatusId, roomStatus)
      .subscribe(data => {
        this.alert.success()
        this.dialogRef.close({
          reload: true
        });
      }, error => {
        this.alert.error('Ooops', 'No se pudo actualizar el estado de habitación, intentalo nuevamente.')
      })
  }

  ngOnDestroy() {
    if (this.updateSubscription != null) this.updateSubscription.unsubscribe()
  }

  onCancel() {
    this.dialogRef.close({
      reload: false
    });
  }
}