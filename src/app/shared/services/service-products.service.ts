import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { ServiceProduct } from '../interfaces/service-product';

@Injectable({
  providedIn: 'root'
})
export class ServiceProductsService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}service-products?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(serviceProduct : ServiceProduct){
    return this.http.post(`${environment.apiUrl}service-products`, serviceProduct,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as ServiceProduct))
  }

  delete(serviceProductId){
    return this.http.delete(`${environment.apiUrl}service-products/${serviceProductId}`,{
      headers : this.headers
    })
  }

  update(serviceProductId, serviceProduct : ServiceProduct){
    return this.http.put(`${environment.apiUrl}service-products/${serviceProductId}`, serviceProduct,{
      headers : this.headers
    })
  }

  show(serviceProductId){
    return this.http.get(`${environment.apiUrl}service-products/${serviceProductId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as ServiceProduct))
  }
}
