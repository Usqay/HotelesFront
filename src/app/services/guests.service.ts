import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { Guest } from '../interfaces/guest';
import { People } from '../interfaces/people';

@Injectable({
  providedIn: 'root'
})
export class GuestsService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}guests?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(guest : People){
    return this.http.post(`${environment.apiUrl}guests`, guest,{
      headers : this.headers
    })
  }

  delete(guestId){
    return this.http.delete(`${environment.apiUrl}guests/${guestId}`,{
      headers : this.headers
    })
  }

  update(guestId, guest : People){
    return this.http.put(`${environment.apiUrl}guests/${guestId}`, guest,{
      headers : this.headers
    })
  }

  show(guestId){
    return this.http.get(`${environment.apiUrl}guests/${guestId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as Guest))
  }
}
