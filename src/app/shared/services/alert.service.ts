import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor() {}

  loading(title: string = 'Por favor espere', description: string = 'Procesando...'){
    Swal.fire({
      title : title,
      text : description,
      icon : 'info',
      allowOutsideClick : false,
      allowEscapeKey : false
    })
    Swal.showLoading()
  }

  info(title: string, description: string, loader = false){
    Swal.fire({
      title : title,
      text : description,
      icon : 'info',
      allowOutsideClick : false,
      allowEscapeKey : false
    })
    if(loader) Swal.showLoading()
  }

  warning(description: string, title: string = 'Advertencia'){
    Swal.fire({
      title : title,
      text : description,
      icon : 'warning',
      allowOutsideClick : false,
      allowEscapeKey : false
    })
  }

  success(title: string = 'Bien hecho!', description: string = 'Operación exitosa'){
    Swal.fire({
      title : title,
      text : description,
      icon : 'success',
      allowOutsideClick : false,
      allowEscapeKey : false
    })
  }

  error(title: string = 'Ooops', description: string = 'Ocurrio un error a cargar la información'){
    Swal.fire({
      title : title,
      // text : description,
      html : description,
      icon : 'error',
      allowOutsideClick : false,
      allowEscapeKey : false
    })
  }

  question(description: string, title: string = "¿Estas seguro de realizar esta acción?"){
    return Swal.fire({
      title : title,
      // text : description,
      html : description,
      icon : 'question',
      allowOutsideClick : false,
      allowEscapeKey : false,
      showCancelButton : true,
      cancelButtonText : 'Cancelar',
      focusCancel : true
    })
  }
  
  hide(){
    Swal.close()
  }

}