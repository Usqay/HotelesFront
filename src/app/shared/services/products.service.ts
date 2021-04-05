import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}products?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(product : Product){
    return this.http.post(`${environment.apiUrl}products`, product,{
      headers : this.headers
    })
  }

  delete(productId){
    return this.http.delete(`${environment.apiUrl}products/${productId}`,{
      headers : this.headers
    })
  }

  update(productId, product : Product){
    return this.http.put(`${environment.apiUrl}products/${productId}`, product,{
      headers : this.headers
    })
  }

  show(productId){
    return this.http.get(`${environment.apiUrl}products/${productId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as Product))
  }
}
