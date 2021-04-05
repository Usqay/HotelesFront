import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StoreHouse } from 'src/app/shared/interfaces/store-house';
import { StoreHouseMovement } from 'src/app/shared/interfaces/store-house-movement';
import { StoreHouseMovementType } from 'src/app/shared/interfaces/store-house-movement-type';
import { AlertService } from 'src/app/shared/services/alert.service';
import { StoreHouseMovementTypesService } from 'src/app/shared/services/store-house-movement-types.service';
import { StoreHousesService } from 'src/app/shared/services/store-houses.service';

@Component({
  selector: 'app-store-house-movement-form',
  templateUrl: './store-house-movement-form.component.html',
  styleUrls: ['./store-house-movement-form.component.scss']
})
export class StoreHouseMovementFormComponent implements OnInit {
  @Input() storeHouseMovement : StoreHouseMovement
  @Output() onSubmit = new EventEmitter<StoreHouseMovement>()
  @Output() onCancel = new EventEmitter<any>()

  form : FormGroup

  storeHouses : StoreHouse[] = []
  storeHouseMovementTypes : StoreHouseMovementType[] = []

  storeHouseMovementTypesSubscription : Subscription = null
  storeHousesSubscription : Subscription = null

  constructor(private formBuilder : FormBuilder,
    private alert : AlertService,
    private storeHouseMovementTypesService : StoreHouseMovementTypesService,
    private storeHousesService : StoreHousesService) { }

  ngOnInit(): void {
    this.createForm()
    this.getStoreHouseMovementTypes()
    this.getStoreHouses()
  }

  ngOnDestroy(){
    if(this.storeHouseMovementTypesSubscription != null) this.storeHouseMovementTypesSubscription.unsubscribe()
    if(this.storeHousesSubscription != null) this.storeHousesSubscription.unsubscribe()
  }

  createForm = () => {
    this.form = this.formBuilder.group({
      store_house_id : this.formBuilder.control('', Validators.required),
      second_store_house_id : this.formBuilder.control(''),
      store_house_movement_type_id : this.formBuilder.control('', Validators.required),
      description : this.formBuilder.control(''),
    });

    this.setData()
  }

  setData(){
    if(this.storeHouseMovement){
      this.form.setValue({
        store_house_id : this.storeHouseMovement.store_house_id,
        store_house_movement_type_id : this.storeHouseMovement.store_house_movement_type_id,
        description : this.storeHouseMovement.description,
      })
    }
  }

  private getStoreHouseMovementTypes(){
    this.alert.loading()
    this.storeHouseMovementTypesSubscription = this.storeHouseMovementTypesService.list(null, 1, 999)
    .subscribe(data => {
      this.storeHouseMovementTypes = data.data
      .filter((i : StoreHouseMovementType) => {
        return i.id == 1 || i.id == 2 || i.id == 3
      })
      this.alert.hide()
    }, error => {
      this.alert.error()
    })
  }

  private getStoreHouses(){
    this.alert.loading()
    this.storeHousesSubscription = this.storeHousesService.list(null, 1, 999)
    .subscribe(data => {
      this.storeHouses = data.data
      this.alert.hide()
    }, error => {
      this.alert.error()
    })
  }

  _onSubmit = () => {
    const storeHouseMovement : StoreHouseMovement = this.form.value
    this.onSubmit.emit(storeHouseMovement)
  }

  _onCancel = () => {
    this.onCancel.emit(true)
  }
}
