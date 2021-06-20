import { Component, OnInit } from '@angular/core';
import { AlertasComponent } from '../alertas/alertas.component';
import { MicroserviciosService } from '../../services/microservicios.service';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public Alamars: AlertasComponent = new AlertasComponent;
  public OnnSesion: boolean = false;
  public Medico: boolean = true;
  //Variables de datos
  public Nombre: string = "";
  public Apellido: string = "";
  public Usuario: string = "";
  public contrasena: string = "";
  public correo: string = "";
  public foto: string = "";
  public nacimiento: string = "";
  public sexo: string = "";
  public date: Date = new Date();
  //Variables para Actualizar
  public Nombre2: string = "";
  public Apellido2: string = "";
  public Usuario2: string = "";
  public contrasena2: string = "";
  public correo2: string = "";
  public foto2: string = "";
  public nacimiento2: string = "";
  public sexo2: string = "";
  public date2: Date = new Date();
  //Codigos
  public codigo: number = 0;
  constructor(
    private navegacion: Router,
    private Microservicio: MicroserviciosService,
    private Almacenamiento: LocalService,
  ) { }

  ngOnInit(): void {
    this.OnnSesion = this.SesionOnn();
    if (this.OnnSesion == false) {
      this.Alamars.Mensaje_De_Error("Usuario sin permisos", "Para hacer uso de esta función inice sesión");
      this.navegacion.navigate(['']);
    }
    this.Medico = this.EsMedico();
    this.DatosUsuario();
  }
  SesionOnn(): boolean {
    var Info = this.Almacenamiento.ObtenerInformacionLS("Usuario");
    console.log("hooooooooooolaXD");
    console.log("-" + Info + "-")
    var o = JSON.parse(Info);
    console.log(o);
    if (o != null) {
      return true;
    }

    return false;
  }
  EsMedico(): boolean {
    var Info = this.Almacenamiento.ObtenerInformacionLS("Tipo");

    var o = JSON.parse(Info);
    if (o.TipoUsuario == 'Medico') {
      return true;
    }
    return false;
  }
  DatosUsuario(): void {
    var Info = this.Almacenamiento.ObtenerInformacionLS("Usuario");
    var o = JSON.parse(Info);
    this.codigo = o.user;
    this.Nombre = o.name;
    this.Apellido = o.apellido;
    this.Usuario = "@" + this.Nombre + this.Apellido;
    this.correo = o.email;
    this.contrasena = o.password;
    this.foto = "https://github.com/romeoaxpuac123/MisImagenes/blob/main/Diabetic/Iconos/Perfil.png?raw=true";
    if (this.Medico == false) {
      this.sexo = o.Genero;
      this.nacimiento = o.Nacimiento;
      this.nacimiento = this.nacimiento.substring(0, 10);
      this.foto = o.Foto;
    }
  }
  ActualizarCliente() {
    console.log("Microservicio CLIENTE");
    this.Microservicio.ActualizarCliente(this.codigo, this.Nombre, this.Apellido, this.contrasena,
      this.correo, this.sexo, this.nacimiento, this.foto).subscribe((resp: any) => {
        if (resp.msg == true) {
          var user = "Usuario";
          var informacion = {
            "user": resp.user,
            "name": resp.name,
            "apellido": resp.apellido,
            "email": resp.email,
            "Genero": resp.Genero,
            "Nacimiento": resp.Nacimiento,
            "Foto": resp.Foto,
            "password": resp.password,

          };
          this.Almacenamiento.AlmancerYActualizarLocalStorage(user, informacion);
          this.Almacenamiento.AlmancerYActualizarLocalStorage("Tipo", { "TipoUsuario": "Cliente" });
          this.DatosUsuario();
          this.Alamars.Mensaje_De_Confirmacion("Actualizacion", "Sus datos han sido actualizados con éxito")


        } else {
          console.log("No sesion-----------");
          this.Alamars.Mensaje_De_Error("Datos incorrectos", "Correo, contraseña, cuenta o tipo de usuario invalidos");
        }
      });
  }
  ActualizarMedico() {
    console.log("Microservicio Doctor");
    this.Microservicio.ActualizarMedico(this.codigo, this.Nombre, this.Apellido,
      this.contrasena, this.correo).subscribe((resp: any) => {
        if (resp.msg == true) {
          console.log("Iniciar sesion-------------");
          var user = "Usuario";
          var informacion = {
            "user": resp.user,
            "name": resp.name,
            "apellido": resp.apellido,
            "password": resp.password,
            "email": resp.email,
          };
          this.Almacenamiento.AlmancerYActualizarLocalStorage(user, informacion);
          this.Almacenamiento.AlmancerYActualizarLocalStorage("Tipo", { "TipoUsuario": "Medico" });
          this.DatosUsuario();
          this.Alamars.Mensaje_De_Confirmacion("Actualizacion", "Sus datos han sido actualizados con éxito")

        } else {
          console.log("No sesion-----------");
          this.Alamars.Mensaje_De_Error("Datos incorrectos", "Correo, contraseña, cuenta o tipo de usuario invalidos");
        }
      });
  }
  Actualizar() {
    if (this.Medico == true) {
      if (this.Nombre == "" || this.Apellido == "" || this.contrasena == "",
        this.correo == ""
      ) {
        this.Alamars.Mensaje_De_Error("Datos incompletos", "Llene todo los datos");
      } else {
        this.ActualizarMedico();
      }

    } else {
      if (this.Nombre == "" || this.Apellido == "" || this.contrasena == "",
        this.correo == "" || this.sexo == "" || this.nacimiento == "" || this.foto == ""
      ) {
        this.Alamars.Mensaje_De_Error("Datos incompletos", "Llene todo los datos");
      } else {
        this.ActualizarCliente();
      }

    }
  }
}
