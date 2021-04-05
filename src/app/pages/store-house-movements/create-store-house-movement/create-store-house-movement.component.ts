import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductMovement } from 'src/app/shared/interfaces/product-movement';
import { StoreHouseMovement } from 'src/app/shared/interfaces/store-house-movement';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { StoreHouseMovementsService } from 'src/app/shared/services/store-house-movements.service';

@Component({
  selector: 'app-create-store-house-movement',
  templateUrl: './create-store-house-movement.component.html',
  styleUrls: ['./create-store-house-movement.component.scss'],
})
export class CreateStoreHouseMovementComponent implements OnInit {
  @ViewChild("stepper") private stepper: MatStepper;

  storeHouseMovement : StoreHouseMovement
  productMovements : ProductMovement[] = []

  createSubscription : Subscription = null

  constructor(private alert : AlertService,
    private router : Router,
    private errorService : ErrorService,
    private storeHouseMovementsService : StoreHouseMovementsService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    if(this.createSubscription != null) this.createSubscription.unsubscribe()
  }

  onSubmitStoreHouseMovement = (storeHouseMovement : StoreHouseMovement) => {
    this.storeHouseMovement = storeHouseMovement
    this.goForward()
  }

  onSubmitProductMovements = (productMovements : ProductMovement[]) => {
    this.productMovements = productMovements
    this.submitAll()
  }

  private submitAll(){
    this.alert.loading()
    this.createSubscription = this.storeHouseMovementsService.create({
      ...this.storeHouseMovement,
      products : this.productMovements
    }).subscribe(data => {
      this.alert.success()
      this.router.navigate(['/store-house-movements'])
    }, error => {
      this.alert.error('Ooops', this.errorService.make(error.error))
    })
  }

  onCancel(){
    this.router.navigate(['/store-house-movements'])
  }

  goForward(){
    this.stepper.selected.completed = true
    this.stepper.selected.editable = true
    this.stepper.next()
  }

}
