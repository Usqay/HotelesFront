import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}users?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(user : User){
    return this.http.post(`${environment.apiUrl}users`, user,{
      headers : this.headers
    })
  }

  delete(userId){
    return this.http.delete(`${environment.apiUrl}users/${userId}`,{
      headers : this.headers
    })
  }

  update(userId, user : User){
    return this.http.put(`${environment.apiUrl}users/${userId}`, user,{
      headers : this.headers
    })
  }

  show(userId){
    return this.http.get(`${environment.apiUrl}users/${userId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as User))
  }
}
