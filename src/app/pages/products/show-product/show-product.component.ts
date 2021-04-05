import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent implements OnInit {

  productId: string
  product: Product

  paramsSubscription: Subscription = null
  showProductSubscription: Subscription = null
  dialogSubscription: Subscription = null

  constructor(private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private productsService: ProductsService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params
      .subscribe(params => {
        this.productId = params.id
        this.showProduct()
      })
  }

  ngOnDestroy() {
    if (this.paramsSubscription != null) this.paramsSubscription.unsubscribe()
    if (this.showProductSubscription != null) this.showProductSubscription.unsubscribe()
    if (this.dialogSubscription != null) this.dialogSubscription.unsubscribe()
  }

  showProduct() {
    this.alert.loading()
    this.showProductSubscription = this.productsService.show(this.productId)
      .subscribe(data => {
        this.product = data
        this.alert.hide()
      }, error => {
        this.alert.error()
        this.router.navigate(['/products'])
      })
  }

  showEditDialog(component) {
    const dialogRef = this.dialog.open(DialogEditProduct, {
      disableClose : true,
      data : {
        productId : this.productId,
        product : this.product,
        component : component
      }
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if(result && result.reload){
        this.showProduct()
      }
    });
  }

}

@Component({
  selector: 'dialog-edit-product',
  templateUrl: 'edit-product.html',
})
export class DialogEditProduct {
  product: Product
  productId: string
  component : string
  reload = false

  updateSubscription: Subscription = null

  constructor(private productsService: ProductsService,
    private alert: AlertService,
    public dialogRef: MatDialogRef<DialogEditProduct>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.product = this.data.product
    this.productId = this.data.productId
    this.component = this.data.component
  }

  onSubmit(product: any) {
    console.log(product);
    this.alert.loading()
    this.updateSubscription = this.productsService.update(this.productId, product)
    .subscribe(data => {
      this.alert.success()
      this.dialogRef.close({
        reload: true
      });
    }, error => {
      this.alert.error('Ooops', 'No se pudo actualizar el producto, intentalo nuevamente.')
    })
  }

  ngOnDestroy() {
    if (this.updateSubscription != null) this.updateSubscription.unsubscribe()
  }

  onCancel() {
    this.dialogRef.close({
      reload: this.reload
    });
  }
}
