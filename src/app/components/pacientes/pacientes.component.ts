import { Component, OnInit } from '@angular/core';
import { MicroserviciosService } from '../../services/microservicios.service';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';
import { AlertasComponent } from '../alertas/alertas.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  public Alamars: AlertasComponent = new AlertasComponent;
  public OnnSesion: boolean = false;
  public lista: any = [];
  public correo:string = "";
  public subscription : Subscription = new Subscription();
  constructor(
    private Microservicio: MicroserviciosService,
    private Almacenamiento: LocalService,
    private navegacion: Router,
  ) { }

  ngOnInit(): void {
    this.OnnSesion = this.SesionOnn();
    if (this.OnnSesion == false) {
      this.Alamars.Mensaje_De_Error("Usuario sin permisos", "Para hacer uso de esta función inice sesión");
      this.navegacion.navigate(['']);
    } else {
      if (this.EsMedico() == false) {
        this.Alamars.Mensaje_De_Error("Usuario sin permisos", "Para hacer uso de esta función inice sesión");
        this.navegacion.navigate(['']);
      } else {
        //Acciones de inicio para un medico
        this.VerPacientes();
        this.subscription = this.Microservicio.refresh3$.subscribe(()=>{
          this.VerPacientes();
        })  
      }
    }
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

  VerPacientes(){
    this.lista = [];
    var Info = this.Almacenamiento.ObtenerInformacionLS("Usuario");
    var o = JSON.parse(Info);
    var usuario = o.user
    this.Microservicio.ObtenerPacientes(usuario).subscribe((resp: any) => {
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          
          console.log("ACA BUSCAMOS LA INFORMACIÓN DEL PACIENTE");
          var HEMOGLOBINA = "--";
          var GLUCOSAPRE = "--";
          var GLUCOSAPOST = "--";
          var CREATININA = "--";
          var TRIGLICERIDOS = "--";
          this.Microservicio.DatosPaciente(MensajeRecibido.External_ID_Cliente).subscribe((resp2: any) => {
            if (resp2.msg == true) {
              for(let InformacionPaciente of resp2.info){
                if(InformacionPaciente.Internal_ID_Hematologia == 1){
                  HEMOGLOBINA = InformacionPaciente.Cantidad;
                }
                else if(InformacionPaciente.Internal_ID_Hematologia == 2){
                  GLUCOSAPRE = InformacionPaciente.Cantidad;
                }
                else if(InformacionPaciente.Internal_ID_Hematologia == 3){
                  GLUCOSAPOST = InformacionPaciente.Cantidad;
                }
                else if(InformacionPaciente.Internal_ID_Hematologia == 4){
                  CREATININA = InformacionPaciente.Cantidad;
                }
                if(InformacionPaciente.Internal_ID_Hematologia == 8){
                  TRIGLICERIDOS = InformacionPaciente.Cantidad;
                }
              }
              
              this.lista.push({
                "Nombre": MensajeRecibido.Nombre + " " + MensajeRecibido.Apellido,
                "Correo": MensajeRecibido.Email,
                "Foto": MensajeRecibido.fotografia,
                "HEMOGLOBINA": HEMOGLOBINA + " %",
                "PRE_PRANDRIAL": GLUCOSAPRE + " mg/dl",
                "POST_PRANDRIAL": GLUCOSAPOST+ " mg/dl",
                "CREATININA": CREATININA + " mg/dl",
                "TRIGLICERIDOS": TRIGLICERIDOS + " mg/dl",
              })
            }else{
              this.lista.push({
                "Nombre": MensajeRecibido.Nombre + " " + MensajeRecibido.Apellido,
                "Correo": MensajeRecibido.Email,
                "Foto": MensajeRecibido.fotografia,
                "HEMOGLOBINA": HEMOGLOBINA + " %",
                "PRE_PRANDRIAL": GLUCOSAPRE + " mg/dl",
                "POST_PRANDRIAL": GLUCOSAPOST+ " mg/dl",
                "CREATININA": CREATININA + " mg/dl",
                "TRIGLICERIDOS": TRIGLICERIDOS + " mg/dl",
              })
            }
          });

        }
      }
    });
  }

  agregar(){
    console.log("Agregar Paciente");
    var Info = this.Almacenamiento.ObtenerInformacionLS("Usuario");
    var o = JSON.parse(Info);
    var usuario = o.user
    if(this.correo != ""){
      this.Microservicio.Relacion(usuario,this.correo).subscribe((resp: any) => {
        if (resp.msg == true) { 
          this.Alamars.Mensaje_De_Error("Erro en asignación","El paciente ya ha sido asignado a sus registros");
        }else{
          this.Microservicio.CodigoPaciente(this.correo).subscribe((resp2: any) => {
            if (resp2.msg == true) { 
              console.log("ASIGNAR AL PACIENTE->" + resp2.info[0].External_ID_Cliente);
              console.log("ASIGNAR AL MEDICO->" + o.user);
              this.Microservicio.Asignacion(resp2.info[0].External_ID_Cliente,o.user).subscribe((resp23: any) => {
                if (resp23.msg == true) { 
                  this.Alamars.Mensaje_De_Confirmacion("Asignación Correcta","El paciente fue asignado de forma satisfactoria");
                }else{
                  this.Alamars.Mensaje_De_Error("ERRO EN EL SISTEMA","Existio un problema al crear la asignación, disculpe las molestias");
                }
              });
            }else{
              this.Alamars.Mensaje_De_Error("Datos incorrectos","El correo ingresado no se encuentra registrado");
            } 
          });
        } 
      });
    }else{
      this.Alamars.Mensaje_De_Error("Datos incorrectos","Ingrese el correo del paciente");
    }
   
  }
}
