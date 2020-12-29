import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { DocumentType } from '../interfaces/document-type';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypesService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}document-types?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(documentType : DocumentType){
    return this.http.post(`${environment.apiUrl}document-types`, documentType,{
      headers : this.headers
    })
  }

  delete(documentTypeId){
    return this.http.delete(`${environment.apiUrl}document-types/${documentTypeId}`,{
      headers : this.headers
    })
  }

  update(documentTypeId, documentType : DocumentType){
    return this.http.put(`${environment.apiUrl}document-types/${documentTypeId}`, documentType,{
      headers : this.headers
    })
  }

  show(documentTypeId){
    return this.http.get(`${environment.apiUrl}document-types/${documentTypeId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as DocumentType))
  }
}
