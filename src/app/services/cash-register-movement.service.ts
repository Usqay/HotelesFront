import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { map } from 'rxjs/operators';
import { CashRegisterMovement } from '../interfaces/cash-register-movement';

@Injectable({
  providedIn: 'root'
})
export class CashRegisterMovementService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25, cashRegisterId = null) : Observable<ApiResource>{
    let url = `${environment.apiUrl}cash-register-movements?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }
    if(cashRegisterId){
      url += '&cash_register=' + cashRegisterId;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(cashRegisterMovement : CashRegisterMovement){
    return this.http.post(`${environment.apiUrl}cash-register-movements`, cashRegisterMovement,{
      headers : this.headers
    })
  }

  delete(cashRegisterMovementId){
    return this.http.delete(`${environment.apiUrl}cash-register-movements/${cashRegisterMovementId}`,{
      headers : this.headers
    })
  }

  update(cashRegisterMovementId, cashRegisterMovement : CashRegisterMovement){
    return this.http.put(`${environment.apiUrl}cash-register-movements/${cashRegisterMovementId}`, cashRegisterMovement,{
      headers : this.headers
    })
  }

  show(cashRegisterMovementId){
    return this.http.get(`${environment.apiUrl}cash-register-movements/${cashRegisterMovementId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as CashRegisterMovement))
  }
}
