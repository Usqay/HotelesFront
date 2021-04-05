import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  createSubscription : Subscription = null

  constructor(private alert : AlertService,
    private router : Router,
    private errorService : ErrorService,
    private productsService : ProductsService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    if(this.createSubscription != null) this.createSubscription.unsubscribe()
  }

  onSubmit = (product : Product) => {
    this.alert.loading()
    this.createSubscription = this.productsService.create(product)
    .subscribe(data => {
      this.alert.success('Exito', 'Registro correcto')
      location.reload()
    }, error => {
      this.alert.error('Ooops', this.errorService.make(error.error))
    })
  }

  onCancel(){
    this.router.navigate(['/products'])
  }
}
