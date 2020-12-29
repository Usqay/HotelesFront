import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Service } from 'src/app/interfaces/service';
import { SunatCode } from 'src/app/interfaces/sunat-code';
import { AlertService } from 'src/app/services/alert.service';
import { SunatCodeService } from 'src/app/services/sunat-code.service';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit {
  @Input() service : Service
  @Output() onSubmit = new EventEmitter<Service>()
  @Output() onCancel = new EventEmitter<any>()
  
  form : FormGroup

  sunatCodes : SunatCode[] = []

  formSubscription : Subscription = null
  sunatCodesSubscription : Subscription = null

  constructor(private formBuilder : FormBuilder,
    private alert : AlertService,
    private sunatCodesService : SunatCodeService) { }

  ngOnInit(): void {
    this.createForm()
  }

  ngOnDestroy(){
    if(this.formSubscription != null) this.formSubscription.unsubscribe()
    if(this.sunatCodesSubscription != null) this.sunatCodesSubscription.unsubscribe()
  }
  
  createForm = () => {
    this.form = this.formBuilder.group({
      name : this.formBuilder.control('', Validators.required),
      description : this.formBuilder.control(''),
      sunat_code : this.formBuilder.control(''),
    });

    this.formSubscription = this.form.controls['sunat_code']
    .valueChanges
    .pipe(
      filter(Boolean),
      debounceTime(500),
      distinctUntilChanged(),
      tap((text : string) => {
        this.getSunatCodes(text)
      })
    )
    .subscribe();

    this.setData()
  }

  setData(){
    if(this.service){
      this.form.setValue({
        name : this.service.name,
        description : this.service.description,
        sunat_code : this.service.sunat_code,
      })
    }
  }

  _onSubmit = () => {    
    const service = this.form.value
    this.onSubmit.emit({
      ...service,
      sunat_code : service.sunat_code.code
    })
  }

  _onCancel = () => {
    this.onCancel.emit(true)
  }
  
  getSunatCodes(q : string){
    this.sunatCodesSubscription = this.sunatCodesService.list(q, 1, 10)
    .subscribe(data => {
      this.sunatCodes = data.data
    }, error => {
      this.alert.error()
    })
  }
  
  displaySunatCode(sunatCode: SunatCode): string {
    return sunatCode && sunatCode.code+' - '+sunatCode.description ? sunatCode.code+' - '+sunatCode.description : '';
  }
}
