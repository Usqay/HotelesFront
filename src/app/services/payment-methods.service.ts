import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { PaymentMethod } from '../interfaces/payment-method';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodsService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}payment-methods?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(paymentMethod : PaymentMethod){
    return this.http.post(`${environment.apiUrl}payment-methods`, paymentMethod,{
      headers : this.headers
    })
  }

  delete(paymentMethodId){
    return this.http.delete(`${environment.apiUrl}payment-methods/${paymentMethodId}`,{
      headers : this.headers
    })
  }

  update(paymentMethodId, paymentMethod : PaymentMethod){
    return this.http.put(`${environment.apiUrl}payment-methods/${paymentMethodId}`, paymentMethod,{
      headers : this.headers
    })
  }

  show(paymentMethodId){
    return this.http.get(`${environment.apiUrl}payment-methods/${paymentMethodId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as PaymentMethod))
  }
}
