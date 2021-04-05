import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { StoreHouseMovementType } from '../interfaces/store-house-movement-type';

@Injectable({
  providedIn: 'root'
})
export class StoreHouseMovementTypesService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}store-house-movement-types?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(storeHouseMovementType : StoreHouseMovementType){
    return this.http.post(`${environment.apiUrl}store-house-movement-types`, storeHouseMovementType,{
      headers : this.headers
    })
  }

  delete(storeHouseMovementTypeId){
    return this.http.delete(`${environment.apiUrl}store-house-movement-types/${storeHouseMovementTypeId}`,{
      headers : this.headers
    })
  }

  update(storeHouseMovementTypeId, storeHouseMovementType : StoreHouseMovementType){
    return this.http.put(`${environment.apiUrl}store-house-movement-types/${storeHouseMovementTypeId}`, storeHouseMovementType,{
      headers : this.headers
    })
  }

  show(storeHouseMovementTypeId){
    return this.http.get(`${environment.apiUrl}store-house-movement-types/${storeHouseMovementTypeId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as StoreHouseMovementType))
  }
}
