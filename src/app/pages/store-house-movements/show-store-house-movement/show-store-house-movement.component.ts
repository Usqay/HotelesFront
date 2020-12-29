import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StoreHouseMovement } from 'src/app/interfaces/store-house-movement';
import { AlertService } from 'src/app/services/alert.service';
import { StoreHouseMovementsService } from 'src/app/services/store-house-movements.service';

@Component({
  selector: 'app-show-store-house-movement',
  templateUrl: './show-store-house-movement.component.html',
  styleUrls: ['./show-store-house-movement.component.scss']
})
export class ShowStoreHouseMovementComponent implements OnInit {

  storeHouseMovementId: string
  storeHouseMovement: StoreHouseMovement

  paramsSubscription: Subscription = null
  showRoomSubscription: Subscription = null

  constructor(private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private storeHouseMovementsService: StoreHouseMovementsService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params
      .subscribe(params => {
        this.storeHouseMovementId = params.id
        this.showRoom()
      })
  }

  ngOnDestroy() {
    if (this.paramsSubscription != null) this.paramsSubscription.unsubscribe()
    if (this.showRoomSubscription != null) this.showRoomSubscription.unsubscribe()
  }

  showRoom() {
    this.alert.loading()
    this.showRoomSubscription = this.storeHouseMovementsService.show(this.storeHouseMovementId)
      .subscribe(data => {
        this.storeHouseMovement = data
        this.alert.hide()
      }, error => {
        this.alert.error()
        this.router.navigate(['/store-house-movements'])
      })
  }
}
