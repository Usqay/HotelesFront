import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })

  }

  login(email, password, remember = false){
    return this.http.post(`${environment.apiUrl}login`, {email, password, remember},{
      headers : this.headers
    })
  /*  .pipe(map((data : any) => {
      localStorage.setItem('_authTkn', data.data.token)
      localStorage.setItem('_user', JSON.stringify(data.data.user))
      return data
    }))*/
  }

  logout(){
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })


    const data = {aux : 'logout'};
    return this.http.post(`${environment.apiUrl}logout`, data,{
      headers : this.headers
    })
    .pipe(map((data : any) => {
      localStorage.clear()
      return data
    }))
  }

  getEnviroments(){
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })

    return this.http.get(`${environment.apiUrl}enviroments`,{
      headers : this.headers
    })
    .pipe(map((data : any) => {
      localStorage.setItem('_env', JSON.stringify(data.data))
      return data
    }))
  }

  enviroment(envName = null, data : any = null) : any{
    const enviroments = JSON.parse(localStorage.getItem('_env'));
    if(data){
      enviroments[envName] = data
      localStorage.setItem('_env', JSON.stringify(enviroments))
      return enviroments[envName]
    }else{
      if(envName){
        return enviroments[envName]
      }
      return enviroments
    }
  }

  getLocalUser() : User{
    const user = JSON.parse(localStorage.getItem('_user'));
    return user
  }
}
