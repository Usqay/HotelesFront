import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { Service } from '../interfaces/service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}services?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(service : Service){
    return this.http.post(`${environment.apiUrl}services`, service,{
      headers : this.headers
    })
  }

  delete(serviceId){
    return this.http.delete(`${environment.apiUrl}services/${serviceId}`,{
      headers : this.headers
    })
  }

  update(serviceId, service : Service){
    return this.http.put(`${environment.apiUrl}services/${serviceId}`, service,{
      headers : this.headers
    })
  }

  show(serviceId){
    return this.http.get(`${environment.apiUrl}services/${serviceId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as Service))
  }
}
