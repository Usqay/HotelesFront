import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { ReservationGuest } from '../interfaces/reservation-guest';

@Injectable({
  providedIn: 'root'
})
export class ReservationGuestsService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}reservation-guests?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(reservationGuest : ReservationGuest){
    return this.http.post(`${environment.apiUrl}reservation-guests`, reservationGuest,{
      headers : this.headers
    })
  }

  delete(reservationGuestId){
    return this.http.delete(`${environment.apiUrl}reservation-guests/${reservationGuestId}`,{
      headers : this.headers
    })
  }

  update(reservationGuestId, reservationGuest : ReservationGuest){
    return this.http.put(`${environment.apiUrl}reservation-guests/${reservationGuestId}`, reservationGuest,{
      headers : this.headers
    })
  }

  show(reservationGuestId){
    return this.http.get(`${environment.apiUrl}reservation-guests/${reservationGuestId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as ReservationGuest))
  }
}
