import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { Printer } from '../interfaces/printer';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}printers?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(printer : Printer){
    return this.http.post(`${environment.apiUrl}printers`, printer,{
      headers : this.headers
    })
  }

  delete(printerId){
    return this.http.delete(`${environment.apiUrl}printers/${printerId}`,{
      headers : this.headers
    })
  }

  update(printerId, printer : Printer){
    return this.http.put(`${environment.apiUrl}printers/${printerId}`, printer,{
      headers : this.headers
    })
  }

  show(printerId){
    return this.http.get(`${environment.apiUrl}printers/${printerId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as Printer))
  }
}
