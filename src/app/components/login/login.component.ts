import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import {AlertasComponent} from '../alertas/alertas.component';
import {MicroserviciosService} from '../../services/microservicios.service';
import {LocalService} from '../../services/local.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

//pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}
export class LoginComponent implements OnInit {
  public Alamars:AlertasComponent = new AlertasComponent;
  public OnnSesion: boolean = false;
  public Correo:string = "";
  public Password:string = "";
  public Medico:boolean = true;
  public Usuario:boolean = false;
 
  constructor(
    private navegacion: Router,
    private Microservicio: MicroserviciosService,
    private Almacenamiento:LocalService,
  ) {
    

  }

  ngOnInit(): void {
    this.OnnSesion = this.SesionOnn();

    if (this.OnnSesion == true) {
      this.Alamars.Mensaje_De_Error("Sesión abierta","Para ingresar con otra cuenta, cierre sesión");  
      this.navegacion.navigate(['']);
    }
  }

  Session(){
    console.log("SeSIONxd");
    if(this.Medico==true){
      this.SesisonDoctor(this.Correo,this.Password);
    }else if(this.Usuario==true){
      this.SecionCliente(this.Correo,this.Password);
    }
  }

  ChangeMedico(){
    console.log("kiton")
    if(this.Medico == false){
      this.Medico = true;
      this.Usuario = false;
    }
    console.log(this.Medico);
    console.log(this.Usuario);
  }
  ChangeUsuario(){
    console.log("kiton2")
    if(this.Usuario == false){
      this.Medico = false;
      this.Usuario = true;
    }
    console.log(this.Medico);
    console.log(this.Usuario);
  }

  SecionCliente(correo:string, password:string){
    console.log("Microservicio CLIENTE");
    this.Microservicio.SesionCliente(correo,password).subscribe((resp:any)=>{
      if(resp.msg ==true){
        console.log("Iniciar sesion-------------");        
        var user = "Usuario";
        var informacion= {
          "user":resp.user, 
          "name":resp.name, 
          "apellido":resp.apellido,
          "email": resp.email,
          "Genero": resp.Genero,
          "Nacimiento": resp.Nacimiento,
          "Foto": resp.Foto,
          "password":resp.password,
          
        };
        this.Almacenamiento.AlmancerYActualizarLocalStorage(user,informacion);
        this.Almacenamiento.AlmancerYActualizarLocalStorage("Tipo",{"TipoUsuario":"Cliente"});
        this.Alamars.Mensaje_De_Confirmacion("Bienvenido","Gracias por utilizar Hope Diabetic")
        
        this.navegacion.navigate(['Home']);
        
      }else{
        console.log("No sesion-----------");
        this.Alamars.Mensaje_De_Error("Datos incorrectos","Correo, contraseña, cuenta o tipo de usuario invalidos");  
      } 
    });
  }
  SesisonDoctor(correo:string, password:string){
    console.log("Microservicio Doctor");
    this.Microservicio.SesionMedico(correo,password).subscribe((resp:any)=>{
      if(resp.msg ==true){
        console.log("Iniciar sesion-------------");
        var user = "Usuario";
        var informacion= {
          "user":resp.user, 
          "name":resp.name, 
          "apellido":resp.apellido,
          "password": resp.password,
          "email": resp.email,          
        };
        this.Almacenamiento.AlmancerYActualizarLocalStorage(user,informacion);
        this.Almacenamiento.AlmancerYActualizarLocalStorage("Tipo",{"TipoUsuario":"Medico"});
        this.Alamars.Mensaje_De_Confirmacion("Bienvenido","Gracias por utilizar Hope Diabetic")
        
        this.navegacion.navigate(['Home']);
      }else{
        console.log("No sesion-----------");
        this.Alamars.Mensaje_De_Error("Datos incorrectos","Correo, contraseña, cuenta o tipo de usuario invalidos");  
      } 
    });
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
