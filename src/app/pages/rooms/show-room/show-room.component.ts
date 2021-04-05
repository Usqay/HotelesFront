import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Room } from 'src/app/shared/interfaces/room';
import { AlertService } from 'src/app/shared/services/alert.service';
import { RoomsService } from 'src/app/shared/services/rooms.service';

@Component({
  selector: 'app-show-room',
  templateUrl: './show-room.component.html',
  styleUrls: ['./show-room.component.scss']
})
export class ShowRoomComponent implements OnInit {

  roomId: string
  room: Room

  paramsSubscription: Subscription = null
  showRoomSubscription: Subscription = null
  dialogSubscription: Subscription = null

  constructor(private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private roomsService: RoomsService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params
      .subscribe(params => {
        this.roomId = params.id
        this.showRoom()
      })
  }

  ngOnDestroy() {
    if (this.paramsSubscription != null) this.paramsSubscription.unsubscribe()
    if (this.showRoomSubscription != null) this.showRoomSubscription.unsubscribe()
    if (this.dialogSubscription != null) this.dialogSubscription.unsubscribe()
  }

  showRoom() {
    this.alert.loading()
    this.showRoomSubscription = this.roomsService.show(this.roomId)
      .subscribe(data => {
        this.room = data
        this.alert.hide()
      }, error => {
        this.alert.error()
        this.router.navigate(['/rooms'])
      })
  }

  showEditDialog(component) {
    const dialogRef = this.dialog.open(DialogEditRoom, {
      disableClose : true,
      data : {
        roomId : this.roomId,
        room : this.room,
        component : component
      }
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if(result && result.reload){
        this.showRoom()
      }
    });
  }
}


@Component({
  selector: 'dialog-edit-room',
  templateUrl: 'edit-room.html',
})
export class DialogEditRoom {
  room: Room
  roomId: string
  component : string
  reload = false

  updateSubscription: Subscription = null

  constructor(private roomsService: RoomsService,
    private alert: AlertService,
    public dialogRef: MatDialogRef<DialogEditRoom>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.room = this.data.room
    this.roomId = this.data.roomId
    this.component = this.data.component
  }

  onSubmit(room: Room) {
    this.alert.loading()
    this.updateSubscription = this.roomsService.update(this.roomId, room)
    .subscribe(data => {
      this.alert.success()
      this.dialogRef.close({
        reload: true
      });
    }, error => {
      this.alert.error('Ooops', 'No se pudo actualizar la habitación, intentalo nuevamente.')
    })
  }

  ngOnDestroy() {
    if (this.updateSubscription != null) this.updateSubscription.unsubscribe()
  }

  onCancel() {
    this.dialogRef.close({
      reload: this.reload
    });
  }
}
