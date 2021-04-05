import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { Gender } from '../interfaces/gender';

@Injectable({
  providedIn: 'root'
})
export class GendersService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}genders?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(gender : Gender){
    return this.http.post(`${environment.apiUrl}genders`, gender,{
      headers : this.headers
    })
  }

  delete(genderId){
    return this.http.delete(`${environment.apiUrl}genders/${genderId}`,{
      headers : this.headers
    })
  }

  update(genderId, gender : Gender){
    return this.http.put(`${environment.apiUrl}genders/${genderId}`, gender,{
      headers : this.headers
    })
  }

  show(genderId){
    return this.http.get(`${environment.apiUrl}genders/${genderId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as Gender))
  }
}
