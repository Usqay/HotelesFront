import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { map } from 'rxjs/operators';
import { TurnChange } from '../interfaces/turn-change';

@Injectable({
  providedIn: 'root'
})
export class TurnChangesService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}turn-changes?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(turnChange : TurnChange){
    return this.http.post(`${environment.apiUrl}turn-changes`, turnChange,{
      headers : this.headers
    })
  }

  delete(turnChangeId){
    return this.http.delete(`${environment.apiUrl}turn-changes/${turnChangeId}`,{
      headers : this.headers
    })
  }

  update(turnChangeId, turnChange : TurnChange){
    return this.http.put(`${environment.apiUrl}turn-changes/${turnChangeId}`, turnChange,{
      headers : this.headers
    })
  }

  show(turnChangeId){
    return this.http.get(`${environment.apiUrl}turn-changes/${turnChangeId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as TurnChange))
  }
}
