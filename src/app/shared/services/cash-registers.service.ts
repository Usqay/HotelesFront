import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { map } from 'rxjs/operators';
import { CashRegister } from '../interfaces/cash-register';

@Injectable({
  providedIn: 'root'
})
export class CashRegistersService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}cash-registers?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(cashRegister : CashRegister){
    return this.http.post(`${environment.apiUrl}cash-registers`, cashRegister,{
      headers : this.headers
    })
  }

  delete(cashRegisterId){
    return this.http.delete(`${environment.apiUrl}cash-registers/${cashRegisterId}`,{
      headers : this.headers
    })
  }

  update(cashRegisterId, cashRegister : CashRegister){
    return this.http.put(`${environment.apiUrl}cash-registers/${cashRegisterId}`, cashRegister,{
      headers : this.headers
    })
  }

  show(cashRegisterId){
    return this.http.get(`${environment.apiUrl}cash-registers/${cashRegisterId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as CashRegister))
  }
}
