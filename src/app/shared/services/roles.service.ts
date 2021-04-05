import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { Role } from '../interfaces/role';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}roles?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(role : Role){
    return this.http.post(`${environment.apiUrl}roles`, role,{
      headers : this.headers
    })
  }

  delete(roleId){
    return this.http.delete(`${environment.apiUrl}roles/${roleId}`,{
      headers : this.headers
    })
  }

  update(roleId, role : Role){
    return this.http.put(`${environment.apiUrl}roles/${roleId}`, role,{
      headers : this.headers
    })
  }

  show(roleId){
    return this.http.get(`${environment.apiUrl}roles/${roleId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as Role))
  }
}
