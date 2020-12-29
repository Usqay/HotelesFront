import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form : FormGroup
  loginSubscription : Subscription = null
  enviromentsSubscription : Subscription = null

  constructor(private alert : AlertService,
    private formBuilder : FormBuilder,
    private router : Router,
    private userService : UserService) { }

  ngOnInit(): void {
    this.createForm()
  }

  ngOnDestroy(){
    if(this.loginSubscription != null) this.loginSubscription.unsubscribe()
    if(this.enviromentsSubscription != null) this.enviromentsSubscription.unsubscribe()
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
    this.alert.loading()
    const formData = this.form.value
    const {email, password, remember} = formData
    this.loginSubscription = this.userService.login(email, password, remember)
    .subscribe(data => {
      //here is token inside data
      this.enviromentsSubscription = this.userService.getEnviroments()
      .subscribe(enviroments => {
        this.alert.hide()
        this.router.navigate(['/dashboard'])
      }, error => {
        this.alert.error('Ooops', 'No se pudo acceder, verifique sus credenciales.')
      })
    }, error => {
      this.alert.error('Ooops', 'No se pudo acceder, verifique sus credenciales.')
    })
  }

}
