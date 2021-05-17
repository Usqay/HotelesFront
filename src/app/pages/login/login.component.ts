import { SystemConfigurationsService } from './../../shared/services/system-configurations.service';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import {   Subscription } from 'rxjs';
import { SubSink } from 'subsink';
import { trigger, state, style, animate, transition, query, animateChild } from '@angular/animations';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
 /* animations: [
    trigger('enterExitLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-200px)' }),
        animate(
          '500ms ease-in',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '500ms ease-in',
          style({ opacity: 0, transform: 'translateX(-200px)' })
        ),
      ]),
    ]),
    trigger('enterExitRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(200px)' }),
        animate(
          '500ms ease-in',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '500ms ease-in',
          style({ opacity: 0, transform: 'translateX(200px)' })
        ),
      ]),
    ]),
    trigger('container', [
      transition(':enter, :leave', [
        query('@*', animateChild(), { optional: true }),
      ]),
    ]),


  ]*/
})

export class LoginComponent implements OnInit {

  isDisplayed: boolean = false;
  form : FormGroup
  private subs = new SubSink();

  constructor(private alert : AlertService,
    private formBuilder : FormBuilder,
    private router : Router,
    private userService : UserService,
    private configuracionService : SystemConfigurationsService) { }

  ngOnInit(): void {
    this.vrificaToken();
    this.createForm()
    this.isDisplayed= false;

  }


  ngOnDestroy(){
    this.subs.unsubscribe();
  }
  ngAfterContentInit(){
    this.isDisplayed= true;
  }
  createForm(){
    this.form = this.formBuilder.group({
      email : this.formBuilder.control('', [
        Validators.required,
        Validators.email
      ]),
      password : this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      remember : this.formBuilder.control(true, Validators.required)
    })
  }
//eyJhbGciOiJIUzI1NiJ9.ImIwMGM4ZTc1ZTQwYTQzZDI4YzFlNDBhMTJhYWE0NWVjYzRiZjNhZjFhYjUxNGU2YmI5NTVjMzQwMTA5YWUwZDki.Mn4iBhqpQd2HAF1YeWbaR0yfWr-0uUpnpVvTuziunyk
  onLogin(){
    const formData = this.form.value
    const {email, password, remember} = formData
    this.subs.add(
      this.userService.login(email, password, remember)
      .subscribe((data : any ) => {
        localStorage.setItem('_authTkn', data.data.token);
        localStorage.setItem('_user', JSON.stringify(data.data.user));
        //here is token inside data
        localStorage.setItem('_env', JSON.stringify(data.data.env))

        this.router.navigate(['/dashboard']);
      


      }, error => {
        this.alert.error('Ooops', 'No se pudo acceder, verifique sus credenciales.')
      })
    );
  }

  private vrificaToken(){

    this.subs.add(
       this.configuracionService.list(null, 1, 999)
      .subscribe((data : any) => {
        //console.log(data.data);       

        var res= this.getSystemConfigurationValue('billing_token',data.data);
        localStorage.setItem('_token1', (res))

        if(res ==0){ // No hay token configurado para la conexión a firebase
          this.router.navigate(['/validar-licencia']);
        }else{
          this.router.navigate(['/login']);
        }
  
      }, error => {
        this.alert.error('Ooops', 'No se pudo leer la información');
      })
    );
  

  }

  private getSystemConfigurationValue(key : string, systemConfigurations){
 
    const index = systemConfigurations.findIndex(i => i.key == key)
    if(index != -1) return systemConfigurations[index].value
    return null
  }


  get f() { return this.form.controls; }



}
