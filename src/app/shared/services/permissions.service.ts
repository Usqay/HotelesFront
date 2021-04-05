import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { Permission } from '../interfaces/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}permissions?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(permission : any){
    return this.http.post(`${environment.apiUrl}permissions`, permission,{
      headers : this.headers
    })
  }

  delete(permissionId){
    return this.http.delete(`${environment.apiUrl}permissions/${permissionId}`,{
      headers : this.headers
    })
  }

  update(permissionId, permission : Permission){
    return this.http.put(`${environment.apiUrl}permissions/${permissionId}`, permission,{
      headers : this.headers
    })
  }

  show(permissionId){
    return this.http.get(`${environment.apiUrl}permissions/${permissionId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as Permission))
  }
}
