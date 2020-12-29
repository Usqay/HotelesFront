import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { SystemConfiguration } from '../interfaces/system-configuration';

@Injectable({
  providedIn: 'root'
})
export class SystemConfigurationsService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}system-configurations?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(systemConfiguration : any){
    return this.http.post(`${environment.apiUrl}system-configurations`, systemConfiguration,{
      headers : this.headers
    })
  }

  delete(systemConfigurationId){
    return this.http.delete(`${environment.apiUrl}system-configurations/${systemConfigurationId}`,{
      headers : this.headers
    })
  }

  update(systemConfigurationId, systemConfiguration : SystemConfiguration){
    return this.http.put(`${environment.apiUrl}system-configurations/${systemConfigurationId}`, systemConfiguration,{
      headers : this.headers
    })
  }

  show(systemConfigurationId){
    return this.http.get(`${environment.apiUrl}system-configurations/${systemConfigurationId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as SystemConfiguration))
  }
}
