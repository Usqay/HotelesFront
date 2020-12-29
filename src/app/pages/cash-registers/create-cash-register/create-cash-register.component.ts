import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CashRegister } from 'src/app/interfaces/cash-register';
import { AlertService } from 'src/app/services/alert.service';
import { CashRegistersService } from 'src/app/services/cash-registers.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-create-cash-register',
  templateUrl: './create-cash-register.component.html',
  styleUrls: ['./create-cash-register.component.scss']
})
export class CreateCashRegisterComponent implements OnInit {

  createSubscription : Subscription = null

  constructor(private alert : AlertService,
    private router : Router,
    private errorService : ErrorService,
    private cashRegistersService : CashRegistersService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    if(this.createSubscription != null) this.createSubscription.unsubscribe()
  }

  onSubmit = (cashRegister : CashRegister) => {
    this.alert.loading()
    this.createSubscription = this.cashRegistersService.create(cashRegister)
    .subscribe(data => {
      this.alert.success('Exito', 'Registro correcto')
      location.reload()
    }, error => {
      this.alert.error('Ooops', this.errorService.make(error.error))
    })
  }

  onCancel(){
    this.router.navigate(['/cash-registers'])
  }
}
