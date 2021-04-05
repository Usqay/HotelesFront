import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { SunatCode } from '../interfaces/sunat-code';

@Injectable({
  providedIn: 'root'
})
export class SunatCodeService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}sunat-codes?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(sunatCode : SunatCode){
    return this.http.post(`${environment.apiUrl}sunat-codes`, sunatCode,{
      headers : this.headers
    })
  }

  delete(sunatCodeId){
    return this.http.delete(`${environment.apiUrl}sunat-codes/${sunatCodeId}`,{
      headers : this.headers
    })
  }

  update(sunatCodeId, sunatCode : SunatCode){
    return this.http.put(`${environment.apiUrl}sunat-codes/${sunatCodeId}`, sunatCode,{
      headers : this.headers
    })
  }

  show(sunatCodeId){
    return this.http.get(`${environment.apiUrl}sunat-codes/${sunatCodeId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as SunatCode))
  }
}
