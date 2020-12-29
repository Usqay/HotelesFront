import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { RoomCategory } from '../interfaces/room-category';

@Injectable({
  providedIn: 'root'
})
export class RoomCategoriesService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}room-categories?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(roomCategory : RoomCategory){
    return this.http.post(`${environment.apiUrl}room-categories`, roomCategory,{
      headers : this.headers
    })
  }

  delete(roomCategoryId){
    return this.http.delete(`${environment.apiUrl}room-categories/${roomCategoryId}`,{
      headers : this.headers
    })
  }

  update(roomCategoryId, roomCategory : RoomCategory){
    return this.http.put(`${environment.apiUrl}room-categories/${roomCategoryId}`, roomCategory,{
      headers : this.headers
    })
  }

  show(roomCategoryId){
    return this.http.get(`${environment.apiUrl}room-categories/${roomCategoryId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as RoomCategory))
  }
}