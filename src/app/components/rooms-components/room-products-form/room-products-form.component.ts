import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';
import { Room } from 'src/app/shared/interfaces/room';
import { RoomProduct } from 'src/app/shared/interfaces/room-product';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { RoomProductsService } from 'src/app/shared/services/room-products.service';

@Component({
  selector: 'app-room-products-form',
  templateUrl: './room-products-form.component.html',
  styleUrls: ['./room-products-form.component.scss']
})
export class RoomProductsFormComponent implements OnInit {
  @Input() room : Room
  @Output() onReload = new EventEmitter<boolean>()

  form : FormGroup

  roomProducts : RoomProduct[]
  products : Product[] = []

  searchProductSubscription : Subscription = null
  submitSubscription : Subscription = null

  constructor(private alert : AlertService,
    private formBuilder : FormBuilder,
    private roomProductsService : RoomProductsService,
    private productsService : ProductsService) { }

  ngOnInit() {
    this.createForm()
    if(this.room){
      this.roomProducts = this.room.room_products
    }
  }

  ngOnDestroy(){
    if(this.searchProductSubscription != null) this.searchProductSubscription.unsubscribe()
    if(this.submitSubscription != null) this.submitSubscription.unsubscribe()
  }

  createForm(){
    this.form = this.formBuilder.group({
      product_id : this.formBuilder.control('', Validators.required),
      room_id : this.formBuilder.control(this.room.id, Validators.required),
      quantity : this.formBuilder.control(1, [
        Validators.required,
        Validators.min(0.1)
      ]),
    })
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

  onSubmit(){
    this.alert.loading()
    const roomProduct : RoomProduct = this.form.value
    this.submitSubscription = this.roomProductsService.create(roomProduct)
    .subscribe(data => {
      this.addRoomProduct(data)
      this.alert.hide()
    }, error => {
      this.alert.error('Ooops', 'No se pudo registrar el insumo')
    })
  }

  ondelete(roomProductid){
    this.alert.loading()
    this.submitSubscription = this.roomProductsService.delete(roomProductid)
    .subscribe(data => {
      this.deleteRoomProduct(roomProductid)
      this.alert.hide()
    }, error => {
      this.alert.error('Ooops', 'No se pudo eliminar el insumo')
    })
  }

  onAutocompleteSelect(product){
    this.form.controls['product_id'].setValue(product.id)
  }

  addRoomProduct(roomProduct){
    const index = this.roomProducts.findIndex(item => item.id == roomProduct.id)

    if(index != -1){
      this.roomProducts[index].quantity = roomProduct.quantity
    }else{
      this.roomProducts.push(roomProduct)
    }
  }


  deleteRoomProduct(roomProductId){
    const index = this.roomProducts.findIndex(item => item.id == roomProductId)

    if(index != -1){
      this.roomProducts.splice(index, 1);
    }
  }

  _onSubmit(){
    this.onReload.emit(true)
  }

  _onCancel(){
    this.onReload.emit(false)
  }
}
