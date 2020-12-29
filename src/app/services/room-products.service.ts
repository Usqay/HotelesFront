import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { RoomProduct } from '../interfaces/room-product';

@Injectable({
  providedIn: 'root'
})
export class RoomProductsService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}room-products?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(roomProduct : RoomProduct){
    return this.http.post(`${environment.apiUrl}room-products`, roomProduct,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as RoomProduct))
  }

  delete(roomProductId){
    return this.http.delete(`${environment.apiUrl}room-products/${roomProductId}`,{
      headers : this.headers
    })
  }

  update(roomProductId, roomProduct : RoomProduct){
    return this.http.put(`${environment.apiUrl}room-products/${roomProductId}`, roomProduct,{
      headers : this.headers
    })
  }

  show(roomProductId){
    return this.http.get(`${environment.apiUrl}room-products/${roomProductId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as RoomProduct))
  }
}
