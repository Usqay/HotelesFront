import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { StoreHouseMovement } from '../interfaces/store-house-movement';

@Injectable({
  providedIn: 'root'
})
export class StoreHouseMovementsService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(storeHouseId, q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}store-house-movements?storeHouseId=${storeHouseId}&page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(storeHouseMovement : StoreHouseMovement){
    return this.http.post(`${environment.apiUrl}store-house-movements`, storeHouseMovement,{
      headers : this.headers
    })
  }

  delete(storeHouseMovementId){
    return this.http.delete(`${environment.apiUrl}store-house-movements/${storeHouseMovementId}`,{
      headers : this.headers
    })
  }

  update(storeHouseMovementId, storeHouseMovement : StoreHouseMovement){
    return this.http.put(`${environment.apiUrl}store-house-movements/${storeHouseMovementId}`, storeHouseMovement,{
      headers : this.headers
    })
  }

  show(storeHouseMovementId){
    return this.http.get(`${environment.apiUrl}store-house-movements/${storeHouseMovementId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as StoreHouseMovement))
  }
}
