import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { ENTER } from '@angular/cdk/keycodes';
import { SystemConfiguration } from 'src/app/shared/interfaces/system-configuration';
import { SystemConfigurationsService } from 'src/app/shared/services/system-configurations.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Printer } from 'src/app/shared/interfaces/printer';
import { PrinterService } from 'src/app/shared/services/printer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-system-configurations',
  templateUrl: './system-configurations.component.html',
  styleUrls: ['./system-configurations.component.scss']
})
export class SystemConfigurationsComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER];

  businessForm : FormGroup
  notificationsForm : FormGroup
  billingForm : FormGroup
  printingForm : FormGroup

  printers : Printer[] = []

  notificationsEmails : string[] = []

  systemConfigurations : SystemConfiguration[] = []

  businessLogoUrl = environment.filesUrl+"logo.png";

  systemConfigurationsSubscription : Subscription = null
  enviromentsSubscription : Subscription = null
  getPrintersSubscription : Subscription = null

  constructor(private alert : AlertService,
    private formBuilder : FormBuilder,
    private userService : UserService,
    private systemConfigurationsService : SystemConfigurationsService,
    private printersService : PrinterService,
    private errorService : ErrorService) { }

  ngOnInit(): void {
    this.createForms()
    this.getSystemConfigurations()
    this.getPrinters()
  }

  ngOnDestroy(){
    if(this.systemConfigurationsSubscription != null) this.systemConfigurationsSubscription.unsubscribe()
    if(this.enviromentsSubscription != null) this.enviromentsSubscription.unsubscribe()
    if(this.getPrintersSubscription != null) this.getPrintersSubscription.unsubscribe()
  }

  private createForms(){
    this.businessForm = this.formBuilder.group({
      business_name : this.formBuilder.control('', Validators.required),
      ruc : this.formBuilder.control('', Validators.required),
      commercial_name : this.formBuilder.control('', Validators.required),
      business_address : this.formBuilder.control('', Validators.required),
      business_phone_number : this.formBuilder.control(''),
      business_holder_name : this.formBuilder.control('', Validators.required),
      business_holder_document_number : this.formBuilder.control('', Validators.required),
      print_logo : this.formBuilder.control(true, Validators.required),
    })

    this.notificationsForm = this.formBuilder.group({
      notifications_emails : this.formBuilder.control(''),
      notify_reservation_created : this.formBuilder.control(true, Validators.required),
      notify_reservation_updated : this.formBuilder.control(true, Validators.required),
      notify_reservation_canceled : this.formBuilder.control(true, Validators.required),
    })

    this.billingForm = this.formBuilder.group({
      billing_route : this.formBuilder.control('', Validators.required),
      billing_token : this.formBuilder.control('', Validators.required),
      invoice_series : this.formBuilder.control('', Validators.required),
      invoice_auto_increment : this.formBuilder.control('', Validators.required),
      ballot_series : this.formBuilder.control('', Validators.required),
      ballot_auto_increment : this.formBuilder.control('', Validators.required),
    })

    this.printingForm = this.formBuilder.group({
      invoice_printer : this.formBuilder.control('', Validators.required),
      ballot_printer : this.formBuilder.control('', Validators.required),
      ticket_printer : this.formBuilder.control('', Validators.required),
      base_printer : this.formBuilder.control('', Validators.required),
    })
  }

  private getSystemConfigurations(){

    this.systemConfigurationsSubscription = this.systemConfigurationsService.list(null, 1, 999)
    .subscribe(data => {
      this.systemConfigurations = data.data
      this.setSystemConfigurations()

    }, error => {
      this.alert.error('Ooops', this.errorService.make(error.error));
    })
  }

  private getPrinters(){

    this.getPrintersSubscription = this.printersService.list(null, 1, 99)
    .subscribe(data => {
      this.printers = data.data

    }, error => {
      this.alert.error('Ooops', this.errorService.make(error.error));
    })
  }

  onSubmitBusinessForm(){
    const data = this.businessForm.value
    const items : SystemConfiguration[] = this.makeArrayFromObject(data)
    this.onSubmitSystemConfigurations(items)
  }

  onSubmitNotificationsForm(){
    const data = this.notificationsForm.value
    data.notifications_emails = JSON.stringify(this.notificationsEmails)
    const items : SystemConfiguration[] = this.makeArrayFromObject(data)
    this.onSubmitSystemConfigurations(items)
  }

  onSubmitBillingForm(){
    const data = this.billingForm.value
    const items : SystemConfiguration[] = this.makeArrayFromObject(data)
    this.onSubmitSystemConfigurations(items)
  }

  onSubmitPrintingForm(){
    const data = this.printingForm.value
    const items : SystemConfiguration[] = this.makeArrayFromObject(data)
    this.onSubmitSystemConfigurations(items)
  }

  private onSubmitSystemConfigurations(items : SystemConfiguration[]){
    this.alert.loading()
    const data = {
      'items' : items
    }

    this.systemConfigurationsSubscription = this.systemConfigurationsService.create(data)
    .subscribe(data => {
      this.enviromentsSubscription = this.userService.getEnviroments()
      .subscribe()
      this.alert.success()
    }, error => {
      this.alert.error('Ooops', this.errorService.make(error.error))
    })
  }

  addNotificationEmail(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.notificationsEmails.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeNotificaitonEmail(email: string): void {
    const index = this.notificationsEmails.indexOf(email);

    if (index >= 0) {
      this.notificationsEmails.splice(index, 1);
    }
  }

  private setSystemConfigurations(){
    this.businessForm.setValue({
      business_name : this.getSystemConfigurationValue('business_name'),
      ruc : this.getSystemConfigurationValue('ruc'),
      commercial_name : this.getSystemConfigurationValue('commercial_name'),
      business_phone_number : this.getSystemConfigurationValue('business_phone_number'),
      business_address : this.getSystemConfigurationValue('business_address'),
      business_holder_name : this.getSystemConfigurationValue('business_holder_name'),
      business_holder_document_number : this.getSystemConfigurationValue('business_holder_document_number'),
      print_logo : parseInt(this.getSystemConfigurationValue('print_logo')),
    });

    this.notificationsForm.setValue({
      notifications_emails : '',
      notify_reservation_created : parseInt(this.getSystemConfigurationValue('notify_reservation_created')),
      notify_reservation_updated : parseInt(this.getSystemConfigurationValue('notify_reservation_updated')),
      notify_reservation_canceled : parseInt(this.getSystemConfigurationValue('notify_reservation_canceled')),
    })

    this.billingForm.setValue({
      billing_route : this.getSystemConfigurationValue('billing_route'),
      billing_token : this.getSystemConfigurationValue('billing_token'),
      invoice_series : this.getSystemConfigurationValue('invoice_series'),
      invoice_auto_increment : this.getSystemConfigurationValue('invoice_auto_increment'),
      ballot_series : this.getSystemConfigurationValue('ballot_series'),
      ballot_auto_increment : this.getSystemConfigurationValue('ballot_auto_increment'),
    })

    this.printingForm.setValue({
      invoice_printer : parseInt(this.getSystemConfigurationValue('invoice_printer')),
      ballot_printer : parseInt(this.getSystemConfigurationValue('ballot_printer')),
      ticket_printer : parseInt(this.getSystemConfigurationValue('ticket_printer')),
      base_printer : parseInt(this.getSystemConfigurationValue('base_printer')),
    })

    this.notificationsEmails = JSON.parse(this.getSystemConfigurationValue('notifications_emails'))
  }

  private getSystemConfigurationValue(key : string){
    const index = this.systemConfigurations.findIndex(i => i.key == key)
    if(index != -1) return this.systemConfigurations[index].value
    return null
  }

  private makeArrayFromObject(obj : Object) : SystemConfiguration[]{
    const objectArray = Object.entries(obj);

    const result = objectArray.map(([key, value]) => {
      return {key : key, value : value}
    });

    return result ? result : []
  }

  uploadLogo(logoFile){
    this.alert.loading()

    let formModel = new FormData()
    formModel.append('logo_file', logoFile)

    this.systemConfigurationsSubscription = this.systemConfigurationsService.create(formModel)
    .subscribe(data => {
      this.alert.success()
      location.reload()
    }, error => {
      this.alert.error('Ooops', this.errorService.make(error.error))
    })
  }

  onSelectLogoFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.uploadLogo(file)
    }
  }

}
