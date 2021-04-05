import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StoreHouse } from 'src/app/shared/interfaces/store-house';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { StoreHousesService } from 'src/app/shared/services/store-houses.service';

@Component({
  selector: 'app-create-store-house',
  templateUrl: './create-store-house.component.html',
  styleUrls: ['./create-store-house.component.scss']
})
export class CreateStoreHouseComponent implements OnInit {

  createSubscription : Subscription = null

  constructor(private alert : AlertService,
    private router : Router,
    private errorService : ErrorService,
    private storeHousesService : StoreHousesService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    if(this.createSubscription != null) this.createSubscription.unsubscribe()
  }

  onSubmit = (storehouse : StoreHouse) => {
    this.alert.loading()
    this.createSubscription = this.storeHousesService.create(storehouse)
    .subscribe(data => {
      this.alert.success('Exito', 'Registro correcto')
      location.reload()
    }, error => {
      this.alert.error('Ooops', this.errorService.make(error.error))
    })
  }

  onCancel(){
    this.router.navigate(['/store-houses'])
  }
}
