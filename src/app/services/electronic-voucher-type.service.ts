import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { ElectronicVoucherType } from '../interfaces/electronic-voucher-type';

@Injectable({
  providedIn: 'root'
})
export class ElectronicVoucherTypeService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}electronic-voucher-types?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(electronicVoucherType : ElectronicVoucherType){
    return this.http.post(`${environment.apiUrl}electronic-voucher-types`, electronicVoucherType,{
      headers : this.headers
    })
  }

  delete(electronicVoucherTypeId){
    return this.http.delete(`${environment.apiUrl}electronic-voucher-types/${electronicVoucherTypeId}`,{
      headers : this.headers
    })
  }

  update(electronicVoucherTypeId, electronicVoucherType : ElectronicVoucherType){
    return this.http.put(`${environment.apiUrl}electronic-voucher-types/${electronicVoucherTypeId}`, electronicVoucherType,{
      headers : this.headers
    })
  }

  show(electronicVoucherTypeId){
    return this.http.get(`${environment.apiUrl}electronic-voucher-types/${electronicVoucherTypeId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as ElectronicVoucherType))
  }
}
