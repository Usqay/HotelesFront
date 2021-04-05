import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { map } from 'rxjs/operators';
import { CurrencyRate } from '../interfaces/currency-rate';

@Injectable({
  providedIn: 'root'
})
export class CurrencyRatesService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}currency-rates?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(currencyRate : CurrencyRate){
    return this.http.post(`${environment.apiUrl}currency-rates`, currencyRate,{
      headers : this.headers
    })
  }

  delete(currencyRateId){
    return this.http.delete(`${environment.apiUrl}currency-rates/${currencyRateId}`,{
      headers : this.headers
    })
  }

  update(currencyRateId, currencyRate : CurrencyRate){
    return this.http.put(`${environment.apiUrl}currency-rates/${currencyRateId}`, currencyRate,{
      headers : this.headers
    })
  }

  show(currencyRateId){
    return this.http.get(`${environment.apiUrl}currency-rates/${currencyRateId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as CurrencyRate))
  }
}
