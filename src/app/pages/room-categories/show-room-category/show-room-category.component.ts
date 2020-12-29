import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoomCategory } from 'src/app/interfaces/room-category';
import { AlertService } from 'src/app/services/alert.service';
import { RoomCategoriesService } from 'src/app/services/room-categories.service';

@Component({
  selector: 'app-show-room-category',
  templateUrl: './show-room-category.component.html',
  styleUrls: ['./show-room-category.component.scss']
})
export class ShowRoomCategoryComponent implements OnInit {

  roomCategoryId: string
  roomCategory: RoomCategory

  paramsSubscription: Subscription = null
  showRoomCategorySubscription: Subscription = null
  dialogSubscription: Subscription = null

  constructor(private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private roomCategoriesService: RoomCategoriesService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params
      .subscribe(params => {
        this.roomCategoryId = params.id
        this.showRoomCategory()
      })
  }

  ngOnDestroy() {
    if (this.paramsSubscription != null) this.paramsSubscription.unsubscribe()
    if (this.showRoomCategorySubscription != null) this.showRoomCategorySubscription.unsubscribe()
    if (this.dialogSubscription != null) this.dialogSubscription.unsubscribe()
  }

  showRoomCategory() {
    this.alert.loading()
    this.showRoomCategorySubscription = this.roomCategoriesService.show(this.roomCategoryId)
      .subscribe(data => {
        this.roomCategory = data
        this.alert.hide()
      }, error => {
        this.alert.error()
        this.router.navigate(['/room-categories'])
      })
  }

  showEditDialog() {
    const dialogRef = this.dialog.open(DialogEditRoomCategory, {
      disableClose : true,
      data : {
        roomCategoryId : this.roomCategoryId,
        roomCategory : this.roomCategory,
      }
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if(result && result.reload){
        this.showRoomCategory()
      }
    });
  }

}


@Component({
  selector: 'dialog-edit-room-category',
  templateUrl: 'edit-room-category.html',
})
export class DialogEditRoomCategory {
  roomCategory: RoomCategory
  roomCategoryId: string

  updateSubscription: Subscription = null

  constructor(private roomCategoriesService: RoomCategoriesService,
    private alert: AlertService,
    public dialogRef: MatDialogRef<DialogEditRoomCategory>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.roomCategory = this.data.roomCategory
    this.roomCategoryId = this.data.roomCategoryId
  }

  onSubmit(roomCategory: RoomCategory) {
    this.alert.loading()
    this.updateSubscription = this.roomCategoriesService.update(this.roomCategoryId, roomCategory)
      .subscribe(data => {
        this.alert.success()
        this.dialogRef.close({
          reload: true
        });
      }, error => {
        this.alert.error('Ooops', 'No se pudo actualizar la categoría de habitación, intentalo nuevamente.')
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