import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';
import { SunatCode } from 'src/app/shared/interfaces/sunat-code';
import { AlertService } from 'src/app/shared/services/alert.service';
import { SunatCodeService } from 'src/app/shared/services/sunat-code.service';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() product : Product
  @Output() onSubmit = new EventEmitter<Product>()
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
    if(this.product){
      this.form.setValue({
        name : this.product.name,
        description : this.product.description,
        sunat_code : this.product.sunat_code,
      })
    }
  }

  _onSubmit = () => {
    const product = this.form.value
    this.onSubmit.emit({
      ...product,
      sunat_code : product.sunat_code.code
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
