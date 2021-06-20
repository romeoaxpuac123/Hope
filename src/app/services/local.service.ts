import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  public respuestaLS:any;
  constructor() { }

    /*metodos*/
    AlmancerYActualizarLocalStorage(llave:string,informacion:any){
      localStorage.setItem(llave,JSON.stringify(informacion));
    }
    ObtenerInformacionLS(llave:string):string{
      this.respuestaLS = localStorage.getItem(llave);
      return this.respuestaLS;
    }
    EliminarDeLS(llave:string){
      localStorage.removeItem(llave);
    }
    LimpiarLS(){
      localStorage.clear();
    }
}
