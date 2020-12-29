import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Printer } from 'src/app/interfaces/printer';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorService } from 'src/app/services/error.service';
import { PrinterService } from 'src/app/services/printer.service';

@Component({
  selector: 'app-create-printer',
  templateUrl: './create-printer.component.html',
  styleUrls: ['./create-printer.component.scss']
})
export class CreatePrinterComponent implements OnInit {

  createSubscription : Subscription = null

  constructor(private alert : AlertService,
    private router : Router,
    private errorService : ErrorService,
    private printersService : PrinterService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    if(this.createSubscription != null) this.createSubscription.unsubscribe()
  }

  onSubmit = (currency : Printer) => {
    this.alert.loading()
    this.createSubscription = this.printersService.create(currency)
    .subscribe(data => {
      this.alert.success('Exito', 'Registro correcto')
      location.reload()
    }, error => {
      this.alert.error('Ooops', this.errorService.make(error.error))
    })
  }

  onCancel(){
    this.router.navigate(['/printers'])
  }
}