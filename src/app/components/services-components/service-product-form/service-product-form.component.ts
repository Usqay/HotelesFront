import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { Service } from 'src/app/interfaces/service';
import { ServiceProduct } from 'src/app/interfaces/service-product';
import { AlertService } from 'src/app/services/alert.service';
import { ProductsService } from 'src/app/services/products.service';
import { ServiceProductsService } from 'src/app/services/service-products.service';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-service-product-form',
  templateUrl: './service-product-form.component.html',
  styleUrls: ['./service-product-form.component.scss']
})
export class ServiceProductFormComponent implements OnInit {
  @ViewChild('searchInput') searchInput: ElementRef;
  @Input() service : Service
  @Output() onSubmit = new EventEmitter<any>()
  @Output() onCancel = new EventEmitter<any>()

  form : FormGroup

  serviceProducts : ServiceProduct[]
  products : Product[] = []

  searchProductSubscription : Subscription = null
  submitSubscription : Subscription = null
  searchProductsSubscription : Subscription = null

  constructor(private alert : AlertService,
    private formBuilder : FormBuilder,
    private serviceProductsService : ServiceProductsService,
    private productsService : ProductsService) { }

  ngOnInit() {
    this.createForm()
    if(this.service){
      this.serviceProducts = this.service.products
    }
  }

  ngAfterViewInit() {
    this.searchProductsSubscription = fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap((text) => {
          this._searchProduct(this.searchInput.nativeElement.value)
        })
      )
      .subscribe();
  }

  ngOnDestroy(){
    if(this.searchProductSubscription != null) this.searchProductSubscription.unsubscribe()
    if(this.submitSubscription != null) this.submitSubscription.unsubscribe()
    if(this.searchProductsSubscription != null) this.searchProductsSubscription.unsubscribe()
  }

  createForm(){
    this.form = this.formBuilder.group({
      product_id : this.formBuilder.control('', Validators.required),
      service_id : this.formBuilder.control(this.service.id, Validators.required),
      quantity : this.formBuilder.control(1, [
        Validators.required,
        Validators.min(0.1)
      ]),
    })
  }

  async _searchProduct(q : string){
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
  
  displayProduct(product: Product): string {
    return product && product.name ? product.name : '';
  }

  onSubmitProduct(){
    this.alert.loading()
    const serviceProduct : ServiceProduct = this.form.value
    this.submitSubscription = this.serviceProductsService.create(serviceProduct)
    .subscribe(data => {
      this.addServiceProduct(data)
      this.alert.hide()
    }, error => {
      this.alert.error('Ooops', 'No se pudo registrar el producto')
    })
  }

  ondelete(serviceProductid){
    this.alert.loading()
    this.submitSubscription = this.serviceProductsService.delete(serviceProductid)
    .subscribe(data => {
      this.deleteServiceProduct(serviceProductid)
      this.alert.hide()
    }, error => {
      this.alert.error('Ooops', 'No se pudo eliminar el producto')
    })
  }

  onAutocompleteSelect(product){
    this.form.controls['product_id'].setValue(product.id)
  }

  addServiceProduct(serviceProduct){
    const index = this.serviceProducts.findIndex(item => item.id == serviceProduct.id)
    
    if(index != -1){
      this.serviceProducts[index].quantity = serviceProduct.quantity
    }else{
      this.serviceProducts.push(serviceProduct)
    }
  }
  

  deleteServiceProduct(serviceProductId){
    const index = this.serviceProducts.findIndex(item => item.id == serviceProductId)
    
    if(index != -1){
      this.serviceProducts.splice(index, 1);
    }
  }

  _onSubmit(){
    this.onSubmit.emit(true)
  }

  _onCancel(){
    this.onCancel.emit(false)
  }
}
