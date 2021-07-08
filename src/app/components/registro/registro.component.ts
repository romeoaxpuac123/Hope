import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AlertasComponent } from '../alertas/alertas.component';
import { MicroserviciosService } from '../../services/microservicios.service';
import {LocalService} from '../../services/local.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public edited = false;
  public seguridad = false;
  public ValorContrasena: number = 0;
  public minusculas = "abcdefghyjklmnñopqrstuvwxyz";
  public mayusculas = "ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
  public numeros = "1234567890";
  public IgualPass = true;
  public Nivel: string = "Muy Bajo";
  PassWord = '';
  PassWord2 = '';
  public OnnSesion: boolean = false;
  public Alamars: AlertasComponent = new AlertasComponent;
  public PerfilDefault = "https://github.com/romeoaxpuac123/MisImagenes/blob/main/Diabetic/Iconos/Perfil.png?raw=true";
  //VARIABLES PARA REGISTRAR
  public NombreRegistro:string = "";
  public ApellidoRegistro:string = "";
  public CorreoRegistro:string = "";
  public FechaRegistro:string = ""; 
  public sexo:string = "";
  
  constructor(
    private navegacion: Router,
    private Microservicio: MicroserviciosService,
    private Almacenamiento:LocalService,
  ) {
    this.OnnSesion = false;

  }

  ngOnInit(): void {
    this.OnnSesion = this.SesionOnn();
    if (this.OnnSesion == true) {
      this.Alamars.Mensaje_De_Error("Sesión abierta", "El registro de cuentas no esta disponible,\nPOR FAVOR CIERRE SESIÓN");
      this.navegacion.navigate(['']);
    }
  }

  mostrar(): void {

    this.edited = true;

  }

  Nomostrar(): void {

    this.edited = false;

  }

  MostrarSeguridad(): void {


    this.ValorContrasena = this.TieneMinusculas(this.PassWord) + this.TieneMayusculas(this.PassWord) + this.Largo(this.PassWord) + this.TieneNumeros(this.PassWord);
    if (this.ValorContrasena == 25) {
      this.Nivel = "Muy Bajo";
    } else if (this.ValorContrasena == 50) {
      this.Nivel = "Medio";
    } else if (this.ValorContrasena == 75) {
      this.Nivel = "Alto";
    } else if (this.ValorContrasena == 100) {
      this.Nivel = "Muy alto";
    } else {
      this.Nivel = "Muy Bajo"
    }
    this.seguridad = true;
  }

  MostrarIgualdad(): void {

    if (this.PassWord == this.PassWord2) {
      this.IgualPass = true;

    } else {
      this.IgualPass = false;
    }
  }


  TieneMinusculas(texto: string): number {

    for (let i = 0; i < texto.length; i++) {
      if (this.minusculas.indexOf(texto.charAt(i), 0) != -1) {
        return 25;
      }
    }
    return 0;
  }
  TieneMayusculas(texto: string): number {

    for (let i = 0; i < texto.length; i++) {
      if (this.mayusculas.indexOf(texto.charAt(i), 0) != -1) {
        return 25;
      }
    }
    return 0;
  }

  TieneNumeros(texto: string): number {

    for (let i = 0; i < texto.length; i++) {
      if (this.numeros.indexOf(texto.charAt(i), 0) != -1) {
        return 25;
      }
    }
    return 0;
  }

  Largo(texto: string): number {
    if (texto.length > 7) {
      return 25;
    }
    return 0;
  }

  cambiarTipo() {
    let tipo: any = document.getElementById('password');
    if (tipo.type == "password") {
      tipo.type = "text";
    } else {
      tipo.type = "password";
    }
  }

  Registrar() {
    if(this.PassWord != this.PassWord2){
      console.log("No Registrar");
      this.Alamars.Mensaje_De_Error("ERROR", "Las contraseñas no son iguales");
    }else{
      if (this.edited == true) {
        if(this.NombreRegistro == "" || this.ApellidoRegistro == "" || this.CorreoRegistro == ""
        || this.PassWord == "" || this.FechaRegistro == "" || this.sexo == ""){
          this.Alamars.Mensaje_De_Error("ERROR", "Datos incompletos");
        }else{
          console.log("Registremos un Cliente");
          console.log(this.NombreRegistro);
          console.log(this.ApellidoRegistro);
          console.log(this.CorreoRegistro);
          console.log(this.PassWord);
          console.log(this.FechaRegistro);
          console.log(this.sexo);
          console.log(this.PerfilDefault);
          let chas = this. ChashItem();
          console.log(chas);
          this.CorreoConfirmacion(this.CorreoRegistro,
            "http://34.132.31.121:4200/Cuenta/"+this.CorreoRegistro+"&&"+chas+"&&"+"1",this.NombreRegistro,this.PassWord
            );
          this.RegistrarCliente(
            this.NombreRegistro,this.ApellidoRegistro,this.PassWord,
            this.CorreoRegistro,this.sexo,this.FechaRegistro,this.PerfilDefault,chas
          );
          
        }
       
  
      } else {
        if(this.NombreRegistro == "" || this.ApellidoRegistro == "" || this.CorreoRegistro == ""
        || this.PassWord == ""){
          this.Alamars.Mensaje_De_Error("ERROR", "Datos incompletos");
        }else{
          console.log("Registremos un Medico");
          console.log(this.NombreRegistro);
          console.log(this.ApellidoRegistro);
          console.log(this.CorreoRegistro);
          console.log(this.PassWord);
          let chas = this. ChashItem();
          console.log(chas);
          this.CorreoConfirmacion(this.CorreoRegistro,
            "http://localhost:4200/Cuenta/"+this.CorreoRegistro+"&&"+chas+"&&"+"0",this.NombreRegistro,this.PassWord
            );
          this.RegistrarMedico(this.NombreRegistro,this.ApellidoRegistro,this.PassWord,this.CorreoRegistro,chas);
        }

  
      }
    }
    
  }

  RegistrarCliente(Nombre: string, Apellido: string, password: string, email: string, genero: string, fecha: string, foto: string, Chas: string) {
    console.log("Microservicio CLIENTE");
    this.Microservicio.registrarCliente(Nombre, Apellido, password, email, genero, fecha, foto, Chas).subscribe((resp: any) => {
      if (resp.msg == true) {
        console.log("Registro Cliente ------------");
        this.Alamars.Mensaje_De_Confirmacion("Bienvenido", "Al correo ingresado se le envio un mensaj para validar su cuenta.")

        window.location.href='http://34.132.31.121:4200/';

      } else {
        console.log("No sesion-----------");
        this.Alamars.Mensaje_De_Error("Datos incorrectos", "Correo, previamente registrado");
      }
    });
  }
  RegistrarMedico(Nombre: string, Apellido: string, password: string, email: string, Chas: string) {
    this.Microservicio.RegistrarMedico(Nombre, Apellido, password, email, Chas).subscribe((resp: any) => {
      if (resp.msg == true) {
        console.log("Registro Cliente ------------");
        this.Alamars.Mensaje_De_Confirmacion("Bienvenido", "Al correo ingresado se le envio un mensaj para validar su cuenta.")

        this.navegacion.navigate(['']);

      } else {
        console.log("No sesion-----------");
        this.Alamars.Mensaje_De_Error("Datos incorrectos", "Correo, previamente registrado");
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

  ChashItem():string{
    var cadena:string = "";
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 18; i++) {
        cadena += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return cadena;
  }

  CorreoConfirmacion(email:string,codigo:string,nombre:string,password:string) {
    this.Microservicio.CorreoCuenta(email,codigo,nombre,password).subscribe((resp: any) => {
  
    });
  }
}
