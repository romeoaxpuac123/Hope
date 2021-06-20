import { Component, OnInit } from '@angular/core';
import {LocalService} from '../../services/local.service';
import {AlertasComponent} from '../alertas/alertas.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public OnnSesion:boolean = false;
  public Alamars:AlertasComponent = new AlertasComponent;
  constructor(

    private Almacenamiento:LocalService,
  ) { 
    
    

  }

  ngOnInit(): void {
    this.OnnSesion = this.SesionOnn();
    console.log("hooolaaaaaaaaaa");
    console.log(this.OnnSesion);
  }
  SesionOff(){
    this.Almacenamiento.LimpiarLS();
    this.Alamars.Mensaje_De_Confirmacion("Fin de sesión","Gracias por utilizar Hope Diabetic")
  }
  SesionOnn():boolean{
    var Info = this.Almacenamiento.ObtenerInformacionLS("Usuario");
    console.log("hooooooooooolaXD");
    console.log("-" + Info + "-")
          var o = JSON.parse(Info);
      console.log(o);
      if(o != null){
        return true;
      }
  
    return false;
  }

}
