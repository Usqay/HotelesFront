import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { ReservationRoom } from '../interfaces/reservation-room';

@Injectable({
  providedIn: 'root'
})
export class ReservationRoomsService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}reservation-rooms?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(reservationRoom : ReservationRoom){
    return this.http.post(`${environment.apiUrl}reservation-rooms`, reservationRoom,{
      headers : this.headers
    })
  }

  delete(reservationRoomId){
    return this.http.delete(`${environment.apiUrl}reservation-rooms/${reservationRoomId}`,{
      headers : this.headers
    })
  }

  update(reservationRoomId, reservationRoom : ReservationRoom){
    return this.http.put(`${environment.apiUrl}reservation-rooms/${reservationRoomId}`, reservationRoom,{
      headers : this.headers
    })
  }

  show(reservationRoomId){
    return this.http.get(`${environment.apiUrl}reservation-rooms/${reservationRoomId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as ReservationRoom))
  }
}
