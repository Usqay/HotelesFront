import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Printer } from 'src/app/shared/interfaces/printer';
import { PrinterType } from 'src/app/shared/interfaces/printer-type';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PrinterTypeService } from 'src/app/shared/services/printer-type.service';

@Component({
  selector: 'app-printer-form',
  templateUrl: './printer-form.component.html',
  styleUrls: ['./printer-form.component.scss']
})
export class PrinterFormComponent implements OnInit {
  @Input() printer : Printer
  @Output() onSubmit = new EventEmitter<Printer>()
  @Output() onCancel = new EventEmitter<any>()

  form : FormGroup

  printerTypes : PrinterType[] = []

  getPrinterTypesSubscription : Subscription = null

  constructor(private formBuilder : FormBuilder,
    private alert : AlertService,
    private printerTypesService : PrinterTypeService) { }

  ngOnInit(): void {
    this.createForm()
    this.getPrinterTypes()
  }

  ngOnDestroy(){
    if(this.getPrinterTypesSubscription != null) this.getPrinterTypesSubscription.unsubscribe()
  }

  createForm = () => {
    this.form = this.formBuilder.group({
      name : this.formBuilder.control('', Validators.required),
      port : this.formBuilder.control(''),
      ip_address : this.formBuilder.control(''),
      printer_type_id : this.formBuilder.control(1, Validators.required),
    });

    this.setData()
  }

  setData(){
    if(this.printer){
      this.form.setValue({
        name : this.printer.name,
        port : this.printer.port,
        ip_address : this.printer.ip_address,
        printer_type_id : this.printer.printer_type_id,
      })
    }
  }

  _onSubmit = () => {
    const printer : Printer = this.form.value
    this.onSubmit.emit(printer)
  }

  _onCancel = () => {
    this.onCancel.emit(true)
  }

  private getPrinterTypes(){
    this.alert.loading()
    this.getPrinterTypesSubscription = this.printerTypesService.list(null, 1, 99)
    .subscribe(data => {
      this.printerTypes = data.data
      this.alert.hide()
    }, error => this.alert.error())
  }
}
