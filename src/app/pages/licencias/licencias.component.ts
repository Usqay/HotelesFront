import { SystemConfigurationsService } from './../../shared/services/system-configurations.service';
import { LicenciasService } from './../../shared/services/licencias.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { SystemConfiguration } from 'src/app/shared/interfaces/system-configuration';
import { Router } from '@angular/router';

@Component({
  selector: 'app-licencias',
  templateUrl: './licencias.component.html',
  styleUrls: ['./licencias.component.css']
})
export class LicenciasComponent implements OnInit {

  formLicencias : FormGroup
  searchTokenSubscription : Subscription = null
  ValidTokenSubscription : Subscription =null
  SaveTokenSubscription : Subscription =null
  datos : any[] =[];
  
  constructor(private formBuilder : FormBuilder, 
    private licenciasServie : LicenciasService,
    private alert : AlertService, 
    private errorService : ErrorService,
    private router : Router,
    private systemsConfigurationService : SystemConfigurationsService) { }

  ngOnInit(): void {

    this.createForm();
    let env =( localStorage.getItem('_token1'));  
    
    if(env != '0'){     
      this.router.navigate(['/login']);
    }
  }
  ngOnDestroy(){
    if(this.searchTokenSubscription != null) this.searchTokenSubscription.unsubscribe()
    if(this.ValidTokenSubscription != null) this.ValidTokenSubscription.unsubscribe()
    if(this.SaveTokenSubscription != null) this.SaveTokenSubscription.unsubscribe()
  }

  createForm = () => {
    this.formLicencias = this.formBuilder.group({
      token : this.formBuilder.control('', Validators.required),
      ruc : this.formBuilder.control('', Validators.required),
      nombre : this.formBuilder.control(''),
      razonSocial : this.formBuilder.control('', Validators.required),
      nombreComercial : this.formBuilder.control(''),
      direccion : this.formBuilder.control(''),
      telefono : this.formBuilder.control(''),
      ciudad : this.formBuilder.control(''),

    
    });

   
  }

  consultaToken(valor ){
    let data ={token : valor.value};
    this.alert.loading()
    this.searchTokenSubscription = this.licenciasServie.searchToken(data)
    .subscribe(
      (data : any) =>{
        
        if(data.ok){
          
          let datos =data.data.empresa
          //this.datos ={...datos};
          console.log(datos);
          this.formLicencias.patchValue({
            ruc : datos.ruc,
            nombre : datos.nombre,
            razonSocial : datos.razon_social,
            nombreComercial : datos.nombre_comercial,
            direccion: datos.direccion,
            telefono : datos.telefono,
            ciudad : datos.ciudad

          });       

        }

        this.alert.hide();
      }, error => {
        this.alert.error('Ooops', this.errorService.make(error.error))
      }
    )
    

  }
  _onSubmit(){
   /* const formData = this.makeArrayFromObject(this.datos);
    const index = formData.findIndex(i => i.key == 'pse_token')
    var res;
    if(index != -1){
      res = formData[index];
    }     
  */
    this.datos ={...this.formLicencias.value};
    console.log(this.datos);
    if (this.datos){
      
      this.ValidTokenSubscription = this.licenciasServie.validarLicencia(this.datos)
      .subscribe((data : any) =>{
        console.log(data);
        if(data){          

          let datos =[{key : 'billing_token', value : data.data.token}];
          const items = {
            'items' :  datos
          }
          this.saveNewToken(items);
          
        }else{
          this.alert.error('Error',data.message);
        }

      });

    }else{
      this.alert.warning('Por favor complete la información del formulario')
    }
   
  }

  private saveNewToken(items){

    this.SaveTokenSubscription = this.systemsConfigurationService.create(items)
    .subscribe((data : any) => {

      if(data.data.success){
        localStorage.clear();
        this.alert.success('Actualizanción de token', data.message)          
        this.router.navigate(['/login']);
      }else{
        this.alert.error( data.message, 'Por favor contacte con el administrador del sistema')
      }
      
    });

  }

  private makeArrayFromObject(obj : Object) {
    const objectArray = Object.entries(obj);
    
   const result = objectArray.map(([key, value]) => {
      return {key : key, value : value}
    });
    console.log(result);
    return result ? result : []
  }

  private getSystemConfigurationValue(key : string, systemConfigurations){
    console.log(systemConfigurations);
    const index = systemConfigurations.findIndex(i => i.key == key)
    if(index != -1) return systemConfigurations[index].value
    return null
  }

  

}
