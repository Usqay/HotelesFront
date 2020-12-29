import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { PrinterType } from '../interfaces/printer-type';

@Injectable({
  providedIn: 'root'
})
export class PrinterTypeService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}printer-types?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(printertype : PrinterType){
    return this.http.post(`${environment.apiUrl}printer-types`, printertype,{
      headers : this.headers
    })
  }

  delete(printertypeId){
    return this.http.delete(`${environment.apiUrl}printer-types/${printertypeId}`,{
      headers : this.headers
    })
  }

  update(printertypeId, printertype : PrinterType){
    return this.http.put(`${environment.apiUrl}printer-types/${printertypeId}`, printertype,{
      headers : this.headers
    })
  }

  show(printertypeId){
    return this.http.get(`${environment.apiUrl}printer-types/${printertypeId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as PrinterType))
  }
}
