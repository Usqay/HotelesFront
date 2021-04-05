import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Currency } from 'src/app/shared/interfaces/currency';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CurrenciesService } from 'src/app/shared/services/currencies.service';

@Component({
  selector: 'app-show-currency',
  templateUrl: './show-currency.component.html',
  styleUrls: ['./show-currency.component.scss']
})
export class ShowCurrencyComponent implements OnInit {

  currencyId : string
  currency : Currency

  paramsSubscription : Subscription = null
  showCurrencySubscription : Subscription = null
  dialogSubscription : Subscription = null

  constructor(private alert : AlertService,
    private route : ActivatedRoute,
    private router : Router,
    public dialog: MatDialog,
    private currenciesService : CurrenciesService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params
    .subscribe(params => {
      this.currencyId = params.id
      this.showCurrency()
    })
  }

  ngOnDestroy(){
    if(this.paramsSubscription != null) this.paramsSubscription.unsubscribe()
    if(this.showCurrencySubscription != null) this.showCurrencySubscription.unsubscribe()
    if(this.dialogSubscription != null) this.dialogSubscription.unsubscribe()
  }

  showCurrency(){
    this.alert.loading()
    this.showCurrencySubscription = this.currenciesService.show(this.currencyId)
    .subscribe(data => {
      this.currency = data
      this.alert.hide()
    }, error => {
      this.alert.error()
      this.router.navigate(['/currencies'])
    })
  }

  showEditDialog(){
    const dialogRef = this.dialog.open(DialogEditCurrency, {
      disableClose : true,
      data : {
        currencyId : this.currencyId,
        currency : this.currency,
      }
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if(result && result.reload){
        this.showCurrency()
      }
    });
  }

}


@Component({
  selector: 'dialog-edit-currency',
  templateUrl: 'edit-currency.html',
})
export class DialogEditCurrency {
  currency : Currency
  currencyId : string

  updateSubscription : Subscription = null

  constructor(private currenciesService : CurrenciesService,
    private alert : AlertService,
    public dialogRef: MatDialogRef<DialogEditCurrency>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.currency = this.data.currency
    this.currencyId = this.data.currencyId
  }

  onSubmit(currency : Currency){
    this.alert.loading()
    this.updateSubscription = this.currenciesService.update(this.currencyId, currency)
    .subscribe(data => {
      this.alert.success()
      this.dialogRef.close({
        reload : true
      });
    }, error => {
      this.alert.error('Ooops', 'No se pudo actualizar la moneda, intentalo nuevamente.')
    })
  }

  ngOnDestroy(){
    if(this.updateSubscription != null) this.updateSubscription.unsubscribe()
  }

  onCancel(){
    this.dialogRef.close({
      reload : false
    });
  }
}
