import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubSink } from 'subsink';
import { CashRegister } from 'src/app/shared/interfaces/cash-register';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CashRegistersService } from 'src/app/shared/services/cash-registers.service';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: 'app-create-cash-register',
  templateUrl: './create-cash-register.component.html',
  styleUrls: ['./create-cash-register.component.scss']
})
export class CreateCashRegisterComponent implements OnInit {

  private subs = new SubSink();

  constructor(private alert : AlertService,
    private router : Router,
    private errorService : ErrorService,
    private cashRegistersService : CashRegistersService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  onSubmit = (cashRegister : CashRegister) => {
    this.subs.add(
      this.cashRegistersService.create(cashRegister)
      .subscribe(data => {
        this.alert.success('Exito', 'Registro correcto')
        location.reload()
      }, error => {
        this.alert.error('Ooops', this.errorService.make(error.error))
      })
    );
  }

  onCancel(){
    this.router.navigate(['/cash-registers'])
  }
}
