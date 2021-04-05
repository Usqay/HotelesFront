import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { RoomStatus } from '../interfaces/room-status';

@Injectable({
  providedIn: 'root'
})
export class RoomStatusesService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}room-statuses?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(roomStatus : RoomStatus){
    return this.http.post(`${environment.apiUrl}room-statuses`, roomStatus,{
      headers : this.headers
    })
  }

  delete(roomStatusId){
    return this.http.delete(`${environment.apiUrl}room-statuses/${roomStatusId}`,{
      headers : this.headers
    })
  }

  update(roomStatusId, roomStatus : RoomStatus){
    return this.http.put(`${environment.apiUrl}room-statuses/${roomStatusId}`, roomStatus,{
      headers : this.headers
    })
  }

  show(roomStatusId){
    return this.http.get(`${environment.apiUrl}room-statuses/${roomStatusId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as RoomStatus))
  }
}
