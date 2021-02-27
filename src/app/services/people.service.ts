import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { People } from '../interfaces/people';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}people?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(people : People){
    return this.http.post(`${environment.apiUrl}people`, people,{
      headers : this.headers
    })
  }

  delete(peopleId){
    return this.http.delete(`${environment.apiUrl}people/${peopleId}`,{
      headers : this.headers
    })
  }

  update(peopleId, people : People){
    return this.http.put(`${environment.apiUrl}people/${peopleId}`, people,{
      headers : this.headers
    })
  }

  show(peopleId){
    return this.http.get(`${environment.apiUrl}people/${peopleId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as People))
  }

  searchApi(type: number, document: string) {

    let route = '';

    if (type == 1) {
      route = `${environment.apiDni}?documento=${document}`;
    }

    if (type == 3) {
      route = `${environment.apiRuc}?documento=${document}`;
    }

    return this.http.get(route);

  }

}
