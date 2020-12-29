import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { ReservationPayment } from '../interfaces/reservation-payment';

@Injectable({
  providedIn: 'root'
})
export class ReservationPaymentsService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(reservationId : number, q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}reservation-payments?reservationId=${reservationId}&page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(reservationPayment : any){
    return this.http.post(`${environment.apiUrl}reservation-payments`, reservationPayment,{
      headers : this.headers
    })
  }

  delete(reservationPaymentId){
    return this.http.delete(`${environment.apiUrl}reservation-payments/${reservationPaymentId}`,{
      headers : this.headers
    })
  }

  update(reservationPaymentId, reservationPayment : ReservationPayment){
    return this.http.put(`${environment.apiUrl}reservation-payments/${reservationPaymentId}`, reservationPayment,{
      headers : this.headers
    })
  }

  show(reservationPaymentId){
    return this.http.get(`${environment.apiUrl}reservation-payments/${reservationPaymentId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as ReservationPayment))
  }
}
