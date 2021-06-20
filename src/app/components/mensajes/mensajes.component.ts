import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertasComponent } from '../alertas/alertas.component';
import { MicroserviciosService } from '../../services/microservicios.service';
import { LocalService } from '../../services/local.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit, OnDestroy {

  public Alamars: AlertasComponent = new AlertasComponent;
  public Pagina: number = 1;
  public Mensajes: any = [];
  /* INICIO VARIABLES MENSAJE*/
  public OnnSesion: boolean = false;
  public Destinatario: any;
  public AsuntoMensaje: any;
  public MensajeAEnviar: any;
  public External_ID_Cliente: number = 0;
  public External_ID_Medico: number = 0;
  public Internal_ID_Asignacion: number = 0;
  public Emisor: string = "";
  public EmailEmisor: string = "";
  public EmailEmisor2: string = "";
  public subscription : Subscription = new Subscription();
  
  constructor(
    private Microservicio: MicroserviciosService,
    private Almacenamiento: LocalService,
    private navegacion: Router,
    //public suscripcion:Subscription,
  ) {
 
  }

  ngOnDestroy():void{
      this.subscription.unsubscribe();
      console.log("Observable cerrado");
  }
  ngOnInit(): void {
    console.log("ssshola");
    this.OnnSesion = this.SesionOnn();
    if (this.OnnSesion == false) {
      this.Alamars.Mensaje_De_Error("Usuario sin permisos", "Para hacer uso de esta función inice sesión");
      this.navegacion.navigate(['']);
    }else{
      console.log("Entro")
      this.ActualizarMensajes();
      
      console.log("Entor x2")
      this.subscription = this.Microservicio.refresh$.subscribe(()=>{
        console.log("Entro x3")
        this.ActualizarMensajes();
        console.log("Entro x4")
        console.log(this.Mensajes);
        console.log("finxd");
      })  
      
    }
    
  }

  mensajeCorto(texto: string): string {
    if (texto.length > 20) {
      let salida: string = "";
      for (let i = 0; i < 20; i++) {
        salida = salida + texto[i];
      }
      return salida + "...";
    }
    return texto + "...";
  }
  mensajeCorto2(texto: string): string {
    if (texto.length > 20) {
      let salida: string = "";
      for (let i = 0; i < 20; i++) {
        salida = salida + texto[i];
      }
      return salida;
    }
    return texto;
  }
  mostrarMensaje(Emisor: string, Asunto: string, Fecha: string, mensaje: string) {
    this.Alamars.Mensaje_Correo(Emisor, Asunto, Fecha, mensaje);
  }
  aumentarPagina() {
    let Anterior: any = document.getElementById('Anterior');
    let Siguiente: any = document.getElementById('Siguiente');
    Anterior.disabled = false;
    this.Pagina += 1;
    if (this.Pagina == 1) {
      Anterior.disabled = true;
    }
    if (this.Mensajes.length <= 5) {
      this.Pagina = 1;
      Siguiente.disabled = true;
    }
    if (this.Pagina * 5 >= this.Mensajes.length) {
      Siguiente.disabled = true;
    } else {
      Siguiente.disabled = false;
    }

  }
  disminuirPagina() {
    let Anterior: any = document.getElementById('Anterior');
    let Siguiente: any = document.getElementById('Siguiente');
    if (this.Pagina == 1) {
      Anterior.disabled = true;
    } else {
      this.Pagina -= 1;
      Siguiente.disabled = false;
    }

  }
  EnviarMensaje() {
    //this.Alamars.Cuadro_Mesaje();

    Swal.fire({
      background: '#5f6769',
      title: '<a style=\"color:white\">Nuevo mensaje</a>',
      html:
        '<input  type="text" placeholder="Destinatario" style = \'width: 100%; font-family:Verdana;  height: 50px;  \' id="Correo" type="text" name="Correo"  required><br>' +

        '<input  type="text" placeholder="Asunto"       style = \'width: 100%; font-family:Verdana;  height: 50px;  \' id="AsuntoX" type="text" name="AsuntoX"  required><br>' +

        '<textarea style = \'width: 100%; height:200px; font-family:Verdana;   \' id="MensajeX" type="text" name="MensajeX"  required></textarea>'


      ,
      focusConfirm: false,
      confirmButtonText: "Enviar",
      confirmButtonColor: "black",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: "Cancelar",
      position: 'bottom-end',
      preConfirm: () => {
        console.log("Mensajeeee");
        this.Destinatario = (<HTMLInputElement>document.getElementById('Correo')).value;
        this.AsuntoMensaje = (<HTMLInputElement>document.getElementById('AsuntoX')).value;
        this.MensajeAEnviar = (<HTMLInputElement>document.getElementById('MensajeX')).value;
        console.log("Los datos son :D");
        console.log("Destinatario:" + this.Destinatario + ".");
        console.log("AsuntoMensaje:" + this.AsuntoMensaje + ".");
        console.log("MensajeAEnviar:" + this.MensajeAEnviar + ".");

        if (this.Destinatario == "" || this.AsuntoMensaje == "" || this.MensajeAEnviar == "") {
          this.Alamars.Mensaje_De_Error("Datos incorrectos", "Los campos o datos a ingresar\n no cumplen con lo solicitado.\nINTENTELO DE NUEVO")
        } else {
          if (this.EsMedico() == true) {
            //Vamos a enviar un correo a un cliente
            this.Microservicio.ExisteCliente(this.Destinatario).subscribe((resp: any) => {
              if (resp.msg == true) {
                console.log("enviar mensaje desde Medico");
                this.External_ID_Cliente = resp.user[0].External_ID_Cliente;
                var Info = this.Almacenamiento.ObtenerInformacionLS("Usuario");
                var o = JSON.parse(Info);
                this.External_ID_Medico = o.user;
                this.Emisor = o.name;
                this.EmailEmisor = o.email;
                console.log("External_ID_Medico:" + this.External_ID_Medico);
                console.log("External_ID_Cliente:" + this.External_ID_Cliente);
                this.Microservicio.ExisteAsignacionMedica(this.External_ID_Cliente, this.External_ID_Medico).subscribe((resp2: any) => {
                  if (resp2.msg == true) {
                    this.Internal_ID_Asignacion = resp2.user[0].Internal_ID_Asignacion;
                    console.log("SI EXISTE ASIGNACION->" + this.Internal_ID_Asignacion);
                    this.Microservicio.GuardarMensaje(this.Internal_ID_Asignacion, this.MensajeAEnviar, this.Emisor, this.EmailEmisor, this.Destinatario, this.AsuntoMensaje).subscribe((resp4: any) => {
                      if (resp4.msg == true) {
                        
                       this.Alamars.Mensaje_De_Confirmacion('Mensaje enviado', 'El mensaje ha sido enviado correctamente, te recomendamos actualizar esta pagina');
                        
                      } else {
                        this.Alamars.Mensaje_De_Error("ERROR", "Error en el servidor, disculpe las molestias");
                      }
                    });
                  } else {
                    console.log("NO EXISTE ASIGNACION");
                    this.Microservicio.AsignacionMedica(this.External_ID_Cliente, this.External_ID_Medico).subscribe((resp3: any) => {
                      if (resp3.msg == true) {
                        console.log("Se creo asignacion");
                        this.Internal_ID_Asignacion = resp3.user[0].Internal_ID_Asignacion;
                        console.log("se creo ASIGNACION->" + this.Internal_ID_Asignacion);
                        this.Microservicio.GuardarMensaje(this.Internal_ID_Asignacion, this.MensajeAEnviar, this.Emisor, this.EmailEmisor, this.Destinatario, this.AsuntoMensaje).subscribe((resp4: any) => {
                          if (resp4.msg == true) {
                            
                            this.Alamars.Mensaje_De_Confirmacion('Mensaje enviado', 'El mensaje ha sido enviado correctamente, te recomendamos actualizar esta pagina');
                            
                          } else {
                            this.Alamars.Mensaje_De_Error("ERROR", "Error en el servidor, disculpe las molestias");
                          }
                        });
                      } else {
                        this.Alamars.Mensaje_De_Error("ERROR", "Error en el servidor, disculpe las molestias");

                      }

                    });
                  }
                });

              } else {
                console.log("No sesion-----------");
                this.Alamars.Mensaje_De_Error("Datos incorrectos", "El correo no pertenece a un cliente o no existe en el sistema");
              }
            });
          } else {
            //Vamos a enviar un correo a un medico
            this.Microservicio.ExisteMedico(this.Destinatario).subscribe((resp: any) => {
              if (resp.msg == true) {
                console.log("enviar mensaje desde Cliente");
                this.External_ID_Medico = resp.user[0].External_ID_Medico;
                var Info = this.Almacenamiento.ObtenerInformacionLS("Usuario");
                var o = JSON.parse(Info);
                this.External_ID_Cliente = o.user;
                this.Emisor = o.name;
                this.EmailEmisor = o.email;
                console.log("External_ID_Medico:" + this.External_ID_Medico);
                console.log("External_ID_Cliente:" + this.External_ID_Cliente);
                this.Microservicio.ExisteAsignacionMedica(this.External_ID_Cliente, this.External_ID_Medico).subscribe((resp2: any) => {
                  if (resp2.msg == true) {
                    this.Internal_ID_Asignacion = resp2.user[0].Internal_ID_Asignacion;
                    console.log("SI EXISTE ASIGNACION->" + this.Internal_ID_Asignacion);
                    this.Microservicio.GuardarMensaje(this.Internal_ID_Asignacion, this.MensajeAEnviar, this.Emisor, this.EmailEmisor, this.Destinatario, this.AsuntoMensaje).subscribe((resp4: any) => {
                      if (resp4.msg == true) {
                        
                        this.Alamars.Mensaje_De_Confirmacion('Mensaje enviado', 'El mensaje ha sido enviado correctamente, te recomendamos actualizar esta pagina');
                        
                      } else {
                        this.Alamars.Mensaje_De_Error("ERROR", "Error en el servidor, disculpe las molestias");
                      }
                    });
                  } else {
                    console.log("NO EXISTE ASIGNACION");
                    this.Microservicio.AsignacionMedica(this.External_ID_Cliente, this.External_ID_Medico).subscribe((resp3: any) => {
                      if (resp3.msg == true) {
                        console.log("Se creo asignacion");
                        this.Internal_ID_Asignacion = resp3.user[0].Internal_ID_Asignacion;
                        console.log("se creo ASIGNACION->" + this.Internal_ID_Asignacion);
                        this.Microservicio.GuardarMensaje(this.Internal_ID_Asignacion, this.MensajeAEnviar, this.Emisor, this.EmailEmisor, this.Destinatario, this.AsuntoMensaje).subscribe((resp4: any) => {
                          if (resp4.msg == true) {
                            
                            this.Alamars.Mensaje_De_Confirmacion('Mensaje enviado', 'El mensaje ha sido enviado correctamente, te recomendamos actualizar esta pagina');
                            
                          } else {
                            this.Alamars.Mensaje_De_Error("ERROR", "Error en el servidor, disculpe las molestias");
                          }
                        });
                      } else {
                        this.Alamars.Mensaje_De_Error("ERROR", "Error en el servidor, disculpe las molestias");

                      }

                    });
                  }
                });

              } else {
                console.log("No sesion-----------");
                this.Alamars.Mensaje_De_Error("Datos incorrectos", "El correo no pertenece a un cliente o no existe en el sistema");
              }
            });
          }


        }
      }
    })


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
  ActualizarMensajes(){
    console.log("MEEEEEEEENSAJE");
    this.Mensajes = [];
    var Info = this.Almacenamiento.ObtenerInformacionLS("Usuario");
    var o = JSON.parse(Info);
    this.EmailEmisor2 = o.email;
    this.Microservicio.Mensajes(this.EmailEmisor2).subscribe((resp: any) => {
      if (resp.msg == true) {
        const reversed = resp.user.reverse();
        for (let MensajeRecibido of reversed){
          
            this.Mensajes.push( {
            "Asunto": MensajeRecibido.Asunto,
            "De": MensajeRecibido.Emisor,
            "Mensaje": MensajeRecibido.Mensaje,
            "Fecha": MensajeRecibido.EmailEmisor
          });
          
        }
      }
    });
  }


}
