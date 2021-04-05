import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import {SharedModule} from '../../shared/shared.module';

const LOGIN_ROUTE = [
  { path: '', component: LoginComponent },
];

@NgModule({
  declarations: [
    LoginComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(LOGIN_ROUTE),

   //EffectsModule.forRoot([AuthEffects]),

  ],
  providers : [

    ]
})
export class LoginModule {

 }
