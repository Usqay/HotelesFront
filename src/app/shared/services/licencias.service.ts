import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LicenciasService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  searchToken(token){
    return this.http.post(`${environment.apiUrl}licencias/searchToken`,token,{
      headers : this.headers
    })
  }

  getData(token){
    return this.http.post(`${environment.apiUrl}licencias/getData`,token,{
      headers : this.headers
    })
  }

  validarLicencia(systemConfiguration : any){
    return this.http.post(`${environment.apiUrl}licencias/validarLicencia`, systemConfiguration,{
      headers : this.headers
    })
  }

  ValidarUso(data: any){
    return this.http.post(`${environment.apiUrl}licencias/validarUso`, data,{
      headers : this.headers
    })
  }
  
  searchDocument(electronicVoucherId){
    return this.http.delete(`${environment.apiUrl}licencias/searchDocument/${electronicVoucherId}`,{
      headers : this.headers
    })
  }



}
