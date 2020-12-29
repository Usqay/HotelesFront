import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductPrice } from 'src/app/interfaces/product-price';

@Component({
  selector: 'app-product-prices-form',
  templateUrl: './product-prices-form.component.html',
  styleUrls: ['./product-prices-form.component.scss']
})
export class ProductPricesFormComponent implements OnInit {
  @Input() product : Product
  @Output() onSubmit = new EventEmitter<Product>()
  @Output() onCancel = new EventEmitter<any>()

  productPrices : ProductPrice[] = []

  constructor() { }

  ngOnInit() {
    if(this.product){
      this.productPrices = this.product.prices
    }
  }
  
  _onSubmit = () => {
    const product : any = {
      ...this.product,
      prices : this.productPrices.map(i => {
        return {
          currency_id : i.currency.id,
          purchase_price : i.purchase_price,
          sale_price : i.sale_price,
        }
      })
    }
    
    product.sunat_code = product.sunat_code.code,
    this.onSubmit.emit(product)
  }

  _onCancel = () => {
    this.onCancel.emit(true)
  }

}
