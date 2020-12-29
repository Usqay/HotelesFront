import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  rooms(filters : any){
    return this.http.post(`${environment.apiUrl}report-rooms`, filters,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data))
  }

  reservations(filters : any){
    return this.http.post(`${environment.apiUrl}report-reservations`, filters,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data))
  }

  sales(filters : any){
    return this.http.post(`${environment.apiUrl}report-sales`, filters,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data))
  }

  dayli(filters : any){
    return this.http.post(`${environment.apiUrl}report-dayli`, filters,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data))
  }
}
