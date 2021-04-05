import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StoreHouse } from 'src/app/shared/interfaces/store-house';
import { AlertService } from 'src/app/shared/services/alert.service';
import { StoreHousesService } from 'src/app/shared/services/store-houses.service';

@Component({
  selector: 'app-show-store-house',
  templateUrl: './show-store-house.component.html',
  styleUrls: ['./show-store-house.component.scss']
})
export class ShowStoreHouseComponent implements OnInit {

  storeHouseId : string
  storeHouse : StoreHouse

  paramsSubscription : Subscription = null
  showStoreHouseSubscription : Subscription = null
  dialogSubscription : Subscription = null

  constructor(private alert : AlertService,
    private route : ActivatedRoute,
    private router : Router,
    public dialog: MatDialog,
    private storeHousesService : StoreHousesService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params
    .subscribe(params => {
      this.storeHouseId = params.id
      this.showCurrency()
    })
  }

  ngOnDestroy(){
    if(this.paramsSubscription != null) this.paramsSubscription.unsubscribe()
    if(this.showStoreHouseSubscription != null) this.showStoreHouseSubscription.unsubscribe()
    if(this.dialogSubscription != null) this.dialogSubscription.unsubscribe()
  }

  showCurrency(){
    this.alert.loading()
    this.showStoreHouseSubscription = this.storeHousesService.show(this.storeHouseId)
    .subscribe(data => {
      this.storeHouse = data
      this.alert.hide()
    }, error => {
      this.alert.error()
      this.router.navigate(['/store-houses'])
    })
  }

  showEditDialog(){
    const dialogRef = this.dialog.open(DialogEditStoreHouse, {
      disableClose : true,
      data : {
        storeHouseId : this.storeHouseId,
        storeHouse : this.storeHouse,
      }
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if(result && result.reload){
        this.showCurrency()
      }
    });
  }

}

@Component({
  selector: 'dialog-edit-store-house',
  templateUrl: 'edit-store-house.html',
})
export class DialogEditStoreHouse {
  storeHouse : StoreHouse
  storeHouseId : string

  updateSubscription : Subscription = null

  constructor(private storeHousesService : StoreHousesService,
    private alert : AlertService,
    public dialogRef: MatDialogRef<DialogEditStoreHouse>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.storeHouse = this.data.storeHouse
    this.storeHouseId = this.data.storeHouseId
  }

  onSubmit(storeHouse : StoreHouse){
    this.alert.loading()
    this.updateSubscription = this.storeHousesService.update(this.storeHouseId, storeHouse)
    .subscribe(data => {
      this.alert.success()
      this.dialogRef.close({
        reload : true
      });
    }, error => {
      this.alert.error('Ooops', 'No se pudo actualizar el almacen, intentalo nuevamente.')
    })
  }

  ngOnDestroy(){
    if(this.updateSubscription != null) this.updateSubscription.unsubscribe()
  }

  onCancel(){
    this.dialogRef.close({
      reload : false
    });
  }
}
