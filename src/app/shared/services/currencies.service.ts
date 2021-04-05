import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { map } from 'rxjs/operators';
import { Currency } from '../interfaces/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}currencies?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(currency : Currency){
    return this.http.post(`${environment.apiUrl}currencies`, currency,{
      headers : this.headers
    })
  }

  delete(currencyId){
    return this.http.delete(`${environment.apiUrl}currencies/${currencyId}`,{
      headers : this.headers
    })
  }

  update(currencyId, currency : Currency){
    return this.http.put(`${environment.apiUrl}currencies/${currencyId}`, currency,{
      headers : this.headers
    })
  }

  show(currencyId){
    return this.http.get(`${environment.apiUrl}currencies/${currencyId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as Currency))
  }
}