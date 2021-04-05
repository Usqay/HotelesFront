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
    private userService : UserService) { }

  ngOnInit(): void {
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


  get f() { return this.form.controls; }



}
