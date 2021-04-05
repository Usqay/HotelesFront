import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {

  }

  dashboard() : Observable<ApiResource>{

    let url = `${environment.apiUrl}dashboard`
    return this.http.get(url)
    .pipe(map(data => data as ApiResource))
  }

  data() {
    let url = `${environment.apiUrl}data`
    return this.http.get(url);
  }



}
