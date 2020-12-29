 import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { Product } from 'src/app/interfaces/product';
import { ProductMovement } from 'src/app/interfaces/product-movement';
import { AlertService } from 'src/app/services/alert.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-store-house-movement-products-form',                                                                                                                                                                                                                    
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<ProductMovement[]>()
  @Output() onCancel = new EventEmitter<any>()

  form : FormGroup
  products : Product[] = []
  productMovements : ProductMovement[] = []

  searchProductSubscription : Subscription = null
  formListenerSubscription : Subscription = null

  constructor(private alert : AlertService,
    private formBuilder : FormBuilder,
    private productsService : ProductsService) { }

  ngOnInit() {
    this.createForm()
  }

  ngOnDestroy(){
    if(this.searchProductSubscription != null) this.searchProductSubscription.unsubscribe()
  }

  createForm(){
    this.form = this.formBuilder.group({
      product_name : this.formBuilder.control(''),
      product_id : this.formBuilder.control('', Validators.required),
      quantity : this.formBuilder.control(1, [
        Validators.required,
        Validators.min(0.1)
      ]),
    })

    this.formListenerSubscription = this.form.controls['product_name'].valueChanges
    .pipe(
      filter(Boolean),
      debounceTime(500),
      distinctUntilChanged(),
      tap((text : string) => {
        this._searchProduct(text)
      })
    )
    .subscribe();
  }

  async _searchProduct(q : string){
    if(q && q.length > 4){
      this.alert.loading()
      this.searchProductSubscription = await this.productsService
      .list(q, 1, 10)
      .subscribe(data => {
        this.products = data.data
        this.alert.hide()
      }, error => {
        this.alert.error()
      })
    }

    return this.products
  }
  
  displayProduct(product: Product): string {
    return product && product.name ? product.name : '';
  }

  _onSubmit = () => {
    this.onSubmit.emit(this.productMovements)
  }

  _onCancel = () => {
    this.onCancel.emit(true)
  }

  onAutocompleteSelect(product){
    this.form.controls['product_id'].setValue(product.id)
  }

  addProduct(){
    const formData = this.form.value
    const productMovement = {
      ...formData,
      product : this.products.filter(i => i.id == formData.product_id)[0]
    }
    
    const index = this.productMovements.findIndex(item => item.product_id == productMovement.product_id)
    
    if(index != -1){
      this.productMovements[index].quantity = productMovement.quantity
    }else{
      this.productMovements.push(productMovement)
    }

    this.form.setValue({
      product_name : '',
      product_id : null,
      quantity : 1
    })
  }
  
  deleteProduct(productId){
    const index = this.productMovements.findIndex(item => item.product_id == productId)
    
    if(index != -1){
      this.productMovements.splice(index, 1);
    }
  }

}
