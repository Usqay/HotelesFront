import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CashRegister } from 'src/app/shared/interfaces/cash-register';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CashRegistersService } from 'src/app/shared/services/cash-registers.service';

@Component({
  selector: 'app-show-cash-register',
  templateUrl: './show-cash-register.component.html',
  styleUrls: ['./show-cash-register.component.scss']
})
export class ShowCashRegisterComponent implements OnInit {

  cashRegisterId: string
  cashRegister: CashRegister

  paramsSubscription: Subscription = null
  showCashRegisterSubscription: Subscription = null
  dialogSubscription: Subscription = null

  constructor(private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private cashRegistersService: CashRegistersService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params
      .subscribe(params => {
        this.cashRegisterId = params.id
        this.showCashRegister()
      })
  }

  ngOnDestroy() {
    if (this.paramsSubscription != null) this.paramsSubscription.unsubscribe()
    if (this.showCashRegisterSubscription != null) this.showCashRegisterSubscription.unsubscribe()
    if (this.dialogSubscription != null) this.dialogSubscription.unsubscribe()
  }

  showCashRegister() {
    this.alert.loading()
    this.showCashRegisterSubscription = this.cashRegistersService.show(this.cashRegisterId)
      .subscribe(data => {
        this.cashRegister = data
        this.alert.hide()
      }, error => {
        this.alert.error()
        this.router.navigate(['/cash-registers'])
      })
  }

  showEditDialog(component) {
    const dialogRef = this.dialog.open(DialogEditCashRegister, {
      disableClose: true,
      data: {
        cashRegisterId: this.cashRegisterId,
        cashRegister: this.cashRegister,
        component: component
      }
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result && result.reload) {
        this.showCashRegister()
      }
    });
  }
}

@Component({
  selector: 'dialog-edit-cash-register',
  templateUrl: 'edit-cash-register.html',
})
export class DialogEditCashRegister {
  cashRegister: CashRegister
  cashRegisterId: string
  component: string
  reload = false

  updateSubscription: Subscription = null

  constructor(private cashRegistersService: CashRegistersService,
    private alert: AlertService,
    public dialogRef: MatDialogRef<DialogEditCashRegister>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.cashRegister = this.data.cashRegister
    this.cashRegisterId = this.data.cashRegisterId
    this.component = this.data.component
  }

  onSubmit(cashRegister: CashRegister) {
    this.updateSubscription = this.cashRegistersService.update(this.cashRegisterId, cashRegister)
      .subscribe(data => {
        this.dialogRef.close({
          reload: true
        });
      }, error => {
        this.alert.error('Ooops', 'No se pudo actualizar la caja, intentalo nuevamente.')
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
