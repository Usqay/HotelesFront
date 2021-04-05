import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { StoreHouse } from '../interfaces/store-house';

@Injectable({
  providedIn: 'root'
})
export class StoreHousesService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}store-houses?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(storeHouse : StoreHouse){
    return this.http.post(`${environment.apiUrl}store-houses`, storeHouse,{
      headers : this.headers
    })
  }

  delete(storeHouseId){
    return this.http.delete(`${environment.apiUrl}store-houses/${storeHouseId}`,{
      headers : this.headers
    })
  }

  update(storeHouseId, storeHouse : StoreHouse){
    return this.http.put(`${environment.apiUrl}store-houses/${storeHouseId}`, storeHouse,{
      headers : this.headers
    })
  }

  show(storeHouseId){
    return this.http.get(`${environment.apiUrl}store-houses/${storeHouseId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as StoreHouse))
  }
}
