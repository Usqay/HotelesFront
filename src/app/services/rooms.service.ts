import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { Room } from '../interfaces/room';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25, statusId = null) : Observable<ApiResource>{
    let url = `${environment.apiUrl}rooms?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    if(statusId){
      url += '&status=' + statusId;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(room : Room){
    return this.http.post(`${environment.apiUrl}rooms`, room,{
      headers : this.headers
    })
  }

  reserve(data : any){
    return this.http.post(`${environment.apiUrl}room-reserve`, data,{
      headers : this.headers
    })
  }

  delete(roomId){
    return this.http.delete(`${environment.apiUrl}rooms/${roomId}`,{
      headers : this.headers
    })
  }

  update(roomId, room : Room){
    return this.http.put(`${environment.apiUrl}rooms/${roomId}`, room,{
      headers : this.headers
    })
  }

  show(roomId){
    return this.http.get(`${environment.apiUrl}rooms/${roomId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as Room))
  }
}
