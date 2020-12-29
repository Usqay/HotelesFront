import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { Sale } from '../interfaces/sale';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25, reservationId = null) : Observable<ApiResource>{
    let url = `${environment.apiUrl}sales?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }
    if(reservationId){
      url += '&reservation=' + reservationId;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(sale : Sale){
    return this.http.post(`${environment.apiUrl}sales`, sale,{
      headers : this.headers
    })
  }

  delete(saleId){
    return this.http.delete(`${environment.apiUrl}sales/${saleId}`,{
      headers : this.headers
    })
  }

  update(saleId, sale : Sale){
    return this.http.put(`${environment.apiUrl}sales/${saleId}`, sale,{
      headers : this.headers
    })
  }

  show(saleId){
    return this.http.get(`${environment.apiUrl}sales/${saleId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as Sale))
  }
}
