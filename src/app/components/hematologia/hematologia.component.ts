import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertasComponent } from '../alertas/alertas.component';
import Swal from 'sweetalert2';
import { MicroserviciosService } from '../../services/microservicios.service';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-hematologia',
  templateUrl: './hematologia.component.html',
  styleUrls: ['./hematologia.component.css']
})
export class HematologiaComponent implements OnInit, OnDestroy {
  public Alamars: AlertasComponent = new AlertasComponent;
  public subscription: Subscription = new Subscription();
  public Pagina: number = 1;
  public Hematologias: any = [];
  public TipoHemalogias: any = [];
  //REGISTRAR HEMATOLOGIA
  public Cantidad: any;
  public Tipo: any;
  public Fecha: any;
  public Unidad: any;
  public minusculas = "abcdefghyjklmnñopqrstuvwxyz";
  public mayusculas = "ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
  public simbolos = "¿@#$%&/()=?¡!*+-\\:;,|°\"\'^[]{}´";
  public codigoHematologia: number = 0;
  public MaximoHematologia: number = 0;
  public CodigoUsuario: number = 0;
  public OnnSesion: boolean = false;
  public EsMedicoA: boolean = false;
  public CodigoUsuarioH: number = 0;
  public HematologiABuscar: string = "";
  public FechaInicio:string = "";
  public FechaFinal:string = "";
  constructor(
    private Microservicio: MicroserviciosService,
    private Almacenamiento: LocalService,
    private navegacion: Router,
  ) {

   
  }
  ngOnDestroy():void{
    this.subscription.unsubscribe();
    console.log("Observable cerrado");
}
  ngOnInit(): void {
    this.OnnSesion = this.SesionOnn();
    if (this.OnnSesion == false) {
      this.Alamars.Mensaje_De_Error("Usuario sin permisos", "Para hacer uso de esta función inice sesión");
      this.navegacion.navigate(['']);
    } else {
      if (this.EsMedico() == true) {
        this.Alamars.Mensaje_De_Error("Usuario sin permisos", "Para hacer uso de esta función inice sesión");
        this.navegacion.navigate(['']);
      } else {
        //Metodo para ver todas tus hematologias
        this.ActualizarHematologias();
        this. ObtenerNombreHematologias();
        this.subscription = this.Microservicio.refresh2$.subscribe(()=>{
          
          this.ActualizarHematologias();
        }) 
      }
    }
  }

  mensajeCorto(texto: string): string {
    if (texto.length > 20) {
      let salida: string = "";
      for (let i = 0; i < 20; i++) {
        salida = salida + texto[i];
      }
      return salida;
    }
    return texto;
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
  mostrarMensaje(Nombre: string, Cantidad: string, Unidad: string, Fecha: string) {
    this.Alamars.Mensaje_Hematologia(Nombre, Cantidad + " " + Unidad, Fecha);
  }
  aumentarPagina() {
    let Anterior: any = document.getElementById('Anterior');
    let Siguiente: any = document.getElementById('Siguiente');
    Anterior.disabled = false;
    this.Pagina += 1;
    if (this.Pagina == 1) {
      Anterior.disabled = true;
    }
    if (this.Hematologias.length <= 5) {
      this.Pagina = 1;
      Siguiente.disabled = true;
    }
    if (this.Pagina * 5 >= this.Hematologias.length) {
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
  EnviarHematologia() {
    //this.Alamars.Formulario_Hematologia();
    this.Fecha = "Vacio";
    this.Unidad = "Vacio";
    this.Tipo = "Vacio";
    this.Cantidad = "Vacio";
    Swal.fire({
      background: '#5f6769',
      title: '<a style=\"color:white\">Registrar\nHematologia</a>',
      html:
        '<label  style = \'color:white; font-family:Verdana; font-size: 150%;\' for="Tipo">Tipo</label><br><br>' +
        '<select   required style = \'width: 50%; font-family:Verdana;  height: 40px;  \' name="Tipox" id="Tipox">' +
        '<option>HEMOGLOBINA GLICOSILADA</option>' +
        '<option>GLUCOSA PRE-PRANDRIAL</option>' +
        '<option>GLUCOSA POST-PRANDRIAL</option>' +
        '<option>CREATININA</option>' +
        '<option>COLESTEROL TOTAL</option>' +
        '<option>COLESTEROL HDL</option>' +
        '<option>COLESTEROL LDL</option>' +
        '<option>TRIGLICERIDOS</option>' +
        '<option>LIPIDOS TOTALES</option>' +
        '<option>ASAT-TGO</option>' +
        '<option>ALAT-TGP</option>' +
        '</select><br><br>' +


        '<label  style = \'color:white; font-family:Verdana; font-size: 150%;\' for="Cantidad">Cantidad</label><br><br>' +
        '<input  type="text" style = \'width: 25%; font-family:Verdana;  height: 30px;  \' id="Cantidadx" type="text" name="Cantidadx"  required>' +
        '<select  required style = \'width: 25%; font-family:Verdana;  height: 37px;  \' name="Unidadx" id="Unidadx">' +
        '<option>mg/dl</option>' +
        '<option>%</option>' +
        '<option>UI/L</option>' +
        '</select><br><br>' +

        '<label  style = \'color:white; font-family:Verdana; font-size: 150%;\' for="Fecha">Fecha</label><br><br>' +
        '<input style = \'width: 50%; font-family:Verdana;  height: 40px;\' id="Fechax" type="date" name="Fechax" required>'


      ,
      focusConfirm: false,
      confirmButtonText: "Guardar",
      confirmButtonColor: "black",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        this.Tipo = (<HTMLInputElement>document.getElementById('Tipox')).value;
        this.Cantidad = (<HTMLInputElement>document.getElementById('Cantidadx')).value;
        this.Unidad = (<HTMLInputElement>document.getElementById('Unidadx')).value;
        this.Fecha = (<HTMLInputElement>document.getElementById('Fechax')).value;
        console.log("Los datos son :D");
        console.log("Tipo:" + this.Tipo + ".");
        console.log("Cantidad:" + this.Cantidad + ".");
        console.log("Unidad:" + this.Unidad + ".");
        console.log("Fecha:" + this.Fecha + ".")
        console.log("wau")
        console.log(JSON.stringify(this.Cantidad));
        var TipoDatoX: Boolean = true;
        if (this.tieneLetras(this.Cantidad) == true || this.Cantidad == "" || this.Fecha == "" || this.Unidad == "" || this.Tipo == "") {
          this.Alamars.Mensaje_De_Error("Datos incorrectos", "Los campos o datos a ingresar\n no cumplen con lo solicitado.\nINTENTELO DE NUEVO")
        } else {
          if (this.Tipo == 'ASAT-TGO' || this.Tipo == 'ALAT-TGP') {
            console.log("ASSST")
            if (this.Unidad != 'UI/L') {
              TipoDatoX = false;
              this.Alamars.Mensaje_De_Error("Datos incorrectos", "La hematología " + this.Tipo + " utiliza UI/L como unidad\nINTENTELO DE NUEVO");
            }
          } else if (this.Tipo == 'HEMOGLOBINA GLICOSILADA') {
            console.log("Hemoglovina")
            if (this.Unidad != '%') {
              TipoDatoX = false;
              this.Alamars.Mensaje_De_Error("Datos incorrectos", "La hematología " + this.Tipo + " utiliza % como unidad\nINTENTELO DE NUEVO");
            }
          } else {
            console.log("otroooooooo");
            if (this.Unidad != 'mg/dl') {
              TipoDatoX = false;
              this.Alamars.Mensaje_De_Error("Datos incorrectos", "La hematología " + this.Tipo + " utiliza mg/ld como unidad\nINTENTELO DE NUEVO");
            }
          }
          if (TipoDatoX == true) {
            this.Microservicio.IdHematologa(this.Tipo).subscribe((resp: any) => {
              if (resp.msg == true) {
                this.codigoHematologia = resp.info[0].Internal_ID_Hematologia;
                this.MaximoHematologia = resp.info[0].Maximo;
                this.Mensaje_Estas_Seguro("Datos registrados", "Sus datos fueron almacenados correctamente",
                  "Revisar Datos", "Al dar Afirmar sus datos serán almacenados y no podrá modificarlos.");
              } else {
                this.Alamars.Mensaje_De_Error("Datos incorrectos", "La hematología " + this.Tipo + " no existe en nuestro sistema");

              }
            });


          }

        }
      }
    })
  }
  tieneLetras(texto: string): boolean {
    for (let i = 0; i < texto.length; i++) {
      if (this.mayusculas.indexOf(texto.charAt(i), 0) != -1) {
        console.log("AAAAA" + texto.charAt(i));
        return true;
      }
      if (this.simbolos.indexOf(texto.charAt(i), 0) != -1) {
        console.log("BBBBBB" + texto.charAt(i));
        return true;
      }
      if (this.minusculas.indexOf(texto.charAt(i), 0) != -1) {
        console.log("CCCCCCC" + texto.charAt(i));
        return true;
      }
    }
    return false;

  }
  Mensaje_Estas_Seguro(TituloCorrecto: string, DescricionCorrecta: string,
    TituloIncorrecto: string, DescripcionIncorrecta: string) {
    Swal.fire({
      background: '#fff no-repeat center url(https://github.com/romeoaxpuac123/MisImagenes/blob/main/Pruebas/Prueba.png?raw=true)',
      imageUrl: 'https://github.com/romeoaxpuac123/MisImagenes/blob/main/Diabetic/Iconos/advertencia.png?raw=true',
      imageHeight: 120,
      title: TituloIncorrecto,
      text: DescripcionIncorrecta,
      showCancelButton: true,
      confirmButtonColor: 'black',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Afirmar',
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          background: '#fff no-repeat center url(https://github.com/romeoaxpuac123/MisImagenes/blob/main/Pruebas/Prueba.png?raw=true)',
          imageUrl: 'https://github.com/romeoaxpuac123/MisImagenes/blob/main/Diabetic/Iconos/ok.png?raw=true',
          imageHeight: 120,
          title: "<a style=\"color:black\">" + TituloCorrecto + "</a>",
          text: DescricionCorrecta,
          confirmButtonText: "Aceptar",
          confirmButtonColor: "black",
        });
        console.log("ACÁ VA EL CODIGO BUENO->" + this.MaximoHematologia);
        console.log("ACÁ VA EL CODIGO BUENO->" + this.codigoHematologia);
        var Info = this.Almacenamiento.ObtenerInformacionLS("Usuario");
        var o = JSON.parse(Info);
        this.CodigoUsuario = o.user
        console.log("ACÁ VA EL CODIGO BUENO->" + this.CodigoUsuario);
        console.log("ACÁ VA EL CODIGO BUENO->" + this.Cantidad);
        console.log("ACÁ VA EL CODIGO BUENO->" + this.Fecha);
        this.Microservicio.RegistrarHematologa(this.codigoHematologia, this.CodigoUsuario, this.Cantidad, this.Fecha).subscribe((resp: any) => {
          if (resp.msg == false) {
            this.Alamars.Mensaje_De_Error("Datos incorrectos", "La hematología " + this.Tipo + " no pudo ser registrada, intentelo de nuevo");

          }
        });
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

  ActualizarHematologias() {
    console.log("HEMATOLOGIAS");
    this.Hematologias = [];
    var Info = this.Almacenamiento.ObtenerInformacionLS("Usuario");
    var o = JSON.parse(Info);
    this.CodigoUsuarioH = o.user;
    this.Microservicio.ObtenerHematologiasTotales(this.CodigoUsuarioH).subscribe((resp: any) => {
      console.log("resp->" + resp)
      if (resp.msg == true) {
        const reversed = resp.info.reverse();
        for (let MensajeRecibido of reversed) {
          var unidadFinal:string = "";
          if (MensajeRecibido.Nombre == 'ASAT-TGO' || this.Tipo == 'ALAT-TGP') {
            console.log("ASSST")
            unidadFinal = "UI/L"

          } else if (MensajeRecibido.Nombre == 'HEMOGLOBINA GLICOSILADA') {
            console.log("Hemoglovina")
            unidadFinal = "%"
          } else {
            unidadFinal = "mg/dl"
          }
          this.Hematologias.push({
            "Nombre": MensajeRecibido.Nombre,
            "Cantidad": MensajeRecibido.Cantidad,
            "Unidad": unidadFinal,
            "Fecha": MensajeRecibido.Fecha_Registro.substring(0, 10)
          });

        }
      }
    });
  }
  ObtenerNombreHematologias() {
    console.log("HEMATOLOGIAS");
    this.TipoHemalogias = [];
   
    this.Microservicio.ObtenerNombreHematologias().subscribe((resp: any) => {
      console.log("resp->" + resp)
      if (resp.msg == true) {
        const reversed = resp.info.reverse();
        for (let MensajeRecibido of reversed) {
         
          this.TipoHemalogias.push({
            "Nombre": MensajeRecibido.Nombre
          });

        }
      }
    });
  }

  Buscar(){
    console.log("HEMATOLOGIAS a buscar BUSCANDO XD");
    console.log("HEMATOLOGIAS a buscar BUSCANDO XD->" + this.HematologiABuscar);
    console.log("HEMATOLOGIAS a buscar BUSCANDO XD->" + this.FechaInicio);
    console.log("HEMATOLOGIAS a buscar BUSCANDO XD->" + this.FechaFinal);
    var Fecha1 = new Date(this.FechaInicio);
    var Fecha2 = new Date(this.FechaFinal);
    console.log("HEMATOLOGIAS a buscar BUSCANDO XD->" + Fecha1);
    console.log("HEMATOLOGIAS a buscar BUSCANDO XD->" + Fecha2);
    this.Hematologias = [];
    var Info = this.Almacenamiento.ObtenerInformacionLS("Usuario");
    var o = JSON.parse(Info);
    this.CodigoUsuarioH = o.user;
    this.Microservicio.IdHematologa(this.HematologiABuscar).subscribe((resp: any) => {
      if (resp.msg == true) {
        this.codigoHematologia = resp.info[0].Internal_ID_Hematologia;
        console.log("HEMATOLOGIAS a buscar BUSCANDFO XD->" + this.codigoHematologia);
        if(Fecha1>Fecha2){
          this.Alamars.Mensaje_De_Error("Datos incorrectos", "La fecha final debe ser superior o igual a la fecha de inicio");
          
        }else{
          this.Microservicio.verHematologias(this.CodigoUsuarioH,this.codigoHematologia,this.FechaInicio,this.FechaFinal).subscribe((resp: any) => {
            if (resp.msg == true) { 
              const reversed = resp.info.reverse();
              for (let MensajeRecibido of reversed) {
                var unidadFinal:string = "";
                if (MensajeRecibido.Nombre == 'ASAT-TGO' || this.Tipo == 'ALAT-TGP') {
                  console.log("ASSST")
                  unidadFinal = "UI/L"
      
                } else if (MensajeRecibido.Nombre == 'HEMOGLOBINA GLICOSILADA') {
                  console.log("Hemoglovina")
                  unidadFinal = "%"
                } else {
                  unidadFinal = "mg/dl"
                }
                this.Hematologias.push({
                  "Nombre": this.HematologiABuscar,
                  "Cantidad": MensajeRecibido.Cantidad,
                  "Unidad": unidadFinal,
                  "Fecha": MensajeRecibido.Fecha_Registro.substring(0, 10)
                });
      
              }
            }else{
              this.Hematologias.push({
                "Nombre": "REGISTROS NO ENCONTRADOS",
                "Cantidad": "0",
                "Unidad": "--",
                "Fecha": "--"
              });
            }
          });
        }
        
      } else {
        this.Alamars.Mensaje_De_Error("Datos incorrectos", "La hematología " + this.HematologiABuscar + " no existe en nuestro sistema");

      }
    });
    /*
    this.Microservicio.ObtenerHematologiasTotales(this.CodigoUsuarioH).subscribe((resp: any) => {
      console.log("resp->" + resp)
      if (resp.msg == true) {
        const reversed = resp.info.reverse();
        for (let MensajeRecibido of reversed) {
          var unidadFinal:string = "";
          if (MensajeRecibido.Nombre == 'ASAT-TGO' || this.Tipo == 'ALAT-TGP') {
            console.log("ASSST")
            unidadFinal = "UI/L"

          } else if (MensajeRecibido.Nombre == 'HEMOGLOBINA GLICOSILADA') {
            console.log("Hemoglovina")
            unidadFinal = "%"
          } else {
            unidadFinal = "mg/dl"
          }
          this.Hematologias.push({
            "Nombre": MensajeRecibido.Nombre,
            "Cantidad": MensajeRecibido.Cantidad,
            "Unidad": unidadFinal,
            "Fecha": MensajeRecibido.Fecha_Registro.substring(0, 10)
          });

        }
      }
    });
    */
  }
}
