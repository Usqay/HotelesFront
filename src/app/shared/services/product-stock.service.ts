import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { ProductStock } from '../interfaces/product-stock';

@Injectable({
  providedIn: 'root'
})
export class ProductStockStockService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(storeHouseId, q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}product-stocks?storeHouseId=${storeHouseId}&?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(productStock : ProductStock){
    return this.http.post(`${environment.apiUrl}product-stocks`, productStock,{
      headers : this.headers
    })
  }

  delete(productStockId){
    return this.http.delete(`${environment.apiUrl}product-stocks/${productStockId}`,{
      headers : this.headers
    })
  }

  update(productStockId, productStock : ProductStock){
    return this.http.put(`${environment.apiUrl}product-stocks/${productStockId}`, productStock,{
      headers : this.headers
    })
  }

  show(productStockId){
    return this.http.get(`${environment.apiUrl}product-stocks/${productStockId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as ProductStock))
  }
}
