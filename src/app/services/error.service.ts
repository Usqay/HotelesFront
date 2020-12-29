import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  make(errorObj) : string{
    let stringResult = 'Ocurrio un error'
    
    if(typeof(errorObj) == 'string') stringResult = errorObj
    else{
      if(errorObj && 'code' in errorObj){
        switch(errorObj.code){
          case 422 : 
            try{
              const keys = Object.keys(errorObj.error)
              stringResult = ''
              keys.forEach(key => {
                const subErrors : string[] = errorObj.error[key]
                stringResult += subErrors.reduce((a, b) => a + '<br>' + b) + '<br>'
              })
            }catch{
              stringResult = 'Ocurrio un error.'
            }
          break;
    
    
          case 403 : 
            stringResult = 'Sin permisos necesarios.'
          break;
    
    
          default :
            stringResult = 'Ocurrio un error'
          break;
        }
      }
    }
    return stringResult
  }
}
