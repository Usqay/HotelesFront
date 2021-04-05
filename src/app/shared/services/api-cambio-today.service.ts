import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Currency } from '../interfaces/currency';

@Injectable({
  providedIn: 'root'
})
export class ApiCambioTodayService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  rate(baseCurrency : Currency){
    return this.http.get(`${environment.apiUrl}currency-rates-today/${baseCurrency.code}`,{
      headers : this.headers
    })
    .pipe(map((data : any) =>  data.data))
  }
}
