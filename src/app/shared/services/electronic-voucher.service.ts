import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResource } from '../interfaces/api-resource';
import { ElectronicVoucher } from '../interfaces/electronic-voucher';

@Injectable({
  providedIn: 'root'
})
export class ElectronicVoucherService {

  headers : HttpHeaders

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders({
      "Authorization" : `Bearer ${localStorage.getItem("_authTkn")}`
    })
  }

  list(q = null, page = 1, paginate = 25) : Observable<ApiResource>{
    let url = `${environment.apiUrl}electronic-vouchers?page=${page}&paginate=${paginate}`
    if(q){
      url += '&q=' + q;
    }

    return this.http.get(url,{
      headers : this.headers
    })
    .pipe(map(data => data as ApiResource))
  }

  create(electronicVoucher : ElectronicVoucher){
    return this.http.post(`${environment.apiUrl}electronic-vouchers`, electronicVoucher,{
      headers : this.headers
    })
  }

  delete(electronicVoucherId){
    return this.http.delete(`${environment.apiUrl}electronic-vouchers/${electronicVoucherId}`,{
      headers : this.headers
    })
  }

  update(electronicVoucherId, electronicVoucher : ElectronicVoucher){
    return this.http.put(`${environment.apiUrl}electronic-vouchers/${electronicVoucherId}`, electronicVoucher,{
      headers : this.headers
    })
  }

  show(electronicVoucherId){
    return this.http.get(`${environment.apiUrl}electronic-vouchers/${electronicVoucherId}`,{
      headers : this.headers
    })
    .pipe(map((data : any) => data.data as ElectronicVoucher))
  }

  print(datos){
    return this.http.post(`${environment.apiUrl}electronic-vouchers/imprimir`,datos,{
      headers : this.headers
    })
  }
}
