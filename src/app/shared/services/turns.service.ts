import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { Turn } from '../interfaces/turn';

@Injectable({
  providedIn: 'root'
})
export class TurnsService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}turns?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(turn : Turn){
    return this.http.post(`${environment.apiUrl}turns`, turn,{
      headers : this.headers
    })
  }

  delete(turnId){
    return this.http.delete(`${environment.apiUrl}turns/${turnId}`,{
      headers : this.headers
    })
  }

  update(turnId, turn : Turn){
    return this.http.put(`${environment.apiUrl}turns/${turnId}`, turn,{
      headers : this.headers
    })
  }

  show(turnId){
    return this.http.get(`${environment.apiUrl}turns/${turnId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as Turn))
  }
}
