import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { Reservation } from '../interfaces/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25, state = null) : Observable<ApiResource>{
    let url = `${environment.apiUrl}reservations?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }
    if(state){
      url += '&state=' + state;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  listado(q = null, page = 1, paginate = 25, state = null) : Observable<ApiResource>{
    let url = `${environment.apiUrl}listado?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }
    if(state){
      url += '&state=' + state;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(reservation : any){
    return this.http.post(`${environment.apiUrl}reservations`, reservation,{
      headers : this.headers
    })
  }

  delete(reservationId){
    return this.http.delete(`${environment.apiUrl}reservations/${reservationId}`,{
      headers : this.headers
    })
  }

  update(reservationId, reservation : Reservation){
    return this.http.put(`${environment.apiUrl}reservations/${reservationId}`, reservation,{
      headers : this.headers
    })
  }

  show(reservationId){
    return this.http.get(`${environment.apiUrl}reservations/${reservationId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as Reservation))
  }
}
