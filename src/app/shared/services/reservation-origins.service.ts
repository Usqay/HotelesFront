import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { ReservationOrigin } from '../interfaces/reservation-origin';

@Injectable({
  providedIn: 'root'
})
export class ReservationOriginsService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}reservation-origins?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(reservationOrigin : ReservationOrigin){
    return this.http.post(`${environment.apiUrl}reservation-origins`, reservationOrigin,{
      headers : this.headers
    })
  }

  delete(reservationOriginId){
    return this.http.delete(`${environment.apiUrl}reservation-origins/${reservationOriginId}`,{
      headers : this.headers
    })
  }

  update(reservationOriginId, reservationOrigin : ReservationOrigin){
    return this.http.put(`${environment.apiUrl}reservation-origins/${reservationOriginId}`, reservationOrigin,{
      headers : this.headers
    })
  }

  show(reservationOriginId){
    return this.http.get(`${environment.apiUrl}reservation-origins/${reservationOriginId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as ReservationOrigin))
  }
}
