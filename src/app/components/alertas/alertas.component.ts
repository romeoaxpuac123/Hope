import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {
  /*Inicio Variables de formulario hematologia*/
  public Cantidad: any;
  public Tipo: any;
  public Fecha: any;
  public Unidad: any;
  public minusculas = "abcdefghyjklmnñopqrstuvwxyz";
  public mayusculas = "ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
  public simbolos = "¿@#$%&/()=?¡!*+-\\:;,|°\"\'^[]{}´"
  /*Fin variables de formulario hematologia*/

  /* INICIO VARIABLES MENSAJE*/

  public Destinatario: any;
  public Asunto: any;
  public Mensaje: any;

  /* FINI VARIABLES MENSAJE */

  public timerInterval: any;
  public b: any;
  constructor(
 
  ) { }

  ngOnInit(): void {
  }
  Mensaje_De_Error(titulo: string, Descripcion: string) {
    Swal.fire({
      background: '#fff no-repeat center url(https://github.com/romeoaxpuac123/MisImagenes/blob/main/Pruebas/Prueba.png?raw=true)',
      imageUrl: 'https://github.com/romeoaxpuac123/MisImagenes/blob/main/Diabetic/Iconos/error.png?raw=true',
      imageHeight: 90,
      title: "<a style=\"color:black\">" + titulo + "</a>",
      text: Descripcion,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "black",
    })

  }

  Mensaje_De_Confirmacion(titulo: string, Descripcion: string) {
    Swal.fire({
      background: '#fff no-repeat center url(https://github.com/romeoaxpuac123/MisImagenes/blob/main/Pruebas/Prueba.png?raw=true)',
      imageUrl: 'https://github.com/romeoaxpuac123/MisImagenes/blob/main/Diabetic/Iconos/ok.png?raw=true',
      imageHeight: 120,
      title: "<a style=\"color:black\">" + titulo + "</a>",
      text: Descripcion,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "black",
    })
  }

  Mensaje_De_ALERTA(titulo: string, Descripcion: string) {
    Swal.fire({
      background: '#fff no-repeat center url(https://github.com/romeoaxpuac123/MisImagenes/blob/main/Pruebas/Prueba.png?raw=true)',
      imageUrl: 'https://github.com/romeoaxpuac123/MisImagenes/blob/main/Diabetic/Iconos/advertencia.png?raw=true',
      imageHeight: 120,
      title: "<a style=\"color:black\">" + titulo + "</a>",
      text: Descripcion,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "black",
    })
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
        console.log("ACÁ VA EL CODIGO BUENO");
      }

    })
  }

  Mensaje_De_Mensaje(titulo: string, Descripcion: string) {
    Swal.fire({
      background: '#fff no-repeat center url(https://github.com/romeoaxpuac123/MisImagenes/blob/main/Pruebas/Prueba.png?raw=true)',
      title: "<a style=\"color:black\">" + titulo + "</a>",
      input: 'textarea',
      inputValue: Descripcion,
      inputAttributes: {
        'disabled': 'false'
      },
      confirmButtonText: "Aceptar",
      confirmButtonColor: "black",
    })
  }
  Mensaje_De_Espera() {
    Swal.fire({
      title: "<a style=\"color:black\">" + "HOPE DIABETIC" + "</a>",
      background: '#fff no-repeat center url(https://github.com/romeoaxpuac123/MisImagenes/blob/main/Pruebas/Prueba.png?raw=true)',
      html: 'Espere un momento',
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        this.timerInterval = setInterval(() => {
          const content = Swal.getHtmlContainer()
          if (content) {
            this.b = content.querySelector('b')
            if (this.b) {
              this.b.textContent = Swal.getTimerLeft()
            }
          }
        }, 100)
      },
      willClose: () => {
        clearInterval(this.timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }
  Formulario_Hematologia() {
    this.Fecha = "Vacio";
    this.Unidad = "Vacio";
    this.Tipo = "Vacio";
    this.Cantidad = "Vacio";
    Swal.fire({
      background: '#5f6769',
      title: '<a style=\"color:white\">Registrar\nHematologia</a>',
      html:
        '<label  style = \'color:white; font-family:Verdana; font-size: 150%;\' for="Tipo">Tipo</label><br><br>' +
        '<select   required style = \'width: 50%; font-family:Verdana;  height: 40px;  \' name="Tipo" id="Tipo">' +
        '<option>Opcion 1</option>' +
        '<option>Opcion 2</option>' +
        '</select><br><br>' +


        '<label  style = \'color:white; font-family:Verdana; font-size: 150%;\' for="Cantidad">Cantidad</label><br><br>' +
        '<input  type="text" style = \'width: 25%; font-family:Verdana;  height: 30px;  \' id="Cantidad" type="text" name="Cantidad"  required>' +
        '<select  required style = \'width: 25%; font-family:Verdana;  height: 37px;  \' name="Unidad" id="Unidad">' +
        '<option>Mg/dl</option>' +
        '<option>Unidad 2</option>' +
        '</select><br><br>' +

        '<label  style = \'color:white; font-family:Verdana; font-size: 150%;\' for="Fecha">Fecha</label><br><br>' +
        '<input style = \'width: 50%; font-family:Verdana;  height: 40px;\' id="Fecha" type="date" name="Fecha" required>'


      ,
      focusConfirm: false,
      confirmButtonText: "Guardar",
      confirmButtonColor: "black",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        this.Tipo = (<HTMLInputElement>document.getElementById('Tipo')).value;
        this.Cantidad = (<HTMLInputElement>document.getElementById('Cantidad')).value;
        this.Unidad = (<HTMLInputElement>document.getElementById('Unidad')).value;
        this.Fecha = (<HTMLInputElement>document.getElementById('Fecha')).value;
        console.log("Los datos son :D");
        console.log("Tipo:" + this.Tipo + ".");
        console.log("Cantidad:" + this.Cantidad + ".");
        console.log("Unidad:" + this.Unidad + ".");
        console.log("Fecha:" + this.Fecha + ".")
        console.log("wau")
        console.log(JSON.stringify(this.Cantidad));
        if (this.tieneLetras(this.Cantidad) == true || this.Cantidad == "" || this.Fecha == "" || this.Unidad == "" || this.Tipo == "") {
          this.Mensaje_De_Error("Datos incorrectos", "Los campos o datos a ingresar\n no cumplen con lo solicitado.\nINTENTELO DE NUEVO")
        } else {
          this.Mensaje_Estas_Seguro("Datos registrados", "Sus datos fueron almacenados correctamente",
            "Revisar Datos", "Al dar Afirmar sus datos serán almacenados y no podrá modificarlos.");
          console.log("Acá guardamos los datos");
        }
      }
    })
  }
  Cuadro_Mesaje() {
    Swal.fire({
      background: '#5f6769',
      title: '<a style=\"color:white\">Nuevo mensaje</a>',
      html:
        '<input  type="text" placeholder="Destinatario" style = \'width: 100%; font-family:Verdana;  height: 50px;  \' id="Correo" type="text" name="Correo"  required><br>' +

        '<input  type="text" placeholder="Asunto" style = \'width: 100%; font-family:Verdana;  height: 50px;  \' id="Asunto" type="text" name="Asunto"  required><br>' +

        '<textarea style = \'width: 100%; height:200px; font-family:Verdana;   \' id="Mensaje" type="text" name="Mensaje"  required></textarea>'


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
        this.Asunto = (<HTMLInputElement>document.getElementById('Asunto')).value;
        this.Mensaje = (<HTMLInputElement>document.getElementById('Mensaje')).value;
        console.log("Los datos son :D");
        console.log("Destinatario:" + this.Destinatario + ".");
        console.log("Asunto:" + this.Asunto + ".");
        console.log("Mensaje:" + this.Mensaje + ".");
        if (this.Destinatario == "" || this.Asunto == "" || this.Mensaje == "") {
          this.Mensaje_De_Error("Datos incorrectos", "Los campos o datos a ingresar\n no cumplen con lo solicitado.\nINTENTELO DE NUEVO")
        } else {
          /*
          if(this.EsMedico() == true){

          }else{

          }*/
          this.Mensaje_De_Confirmacion('Mensaje enviado', 'El mensaje ha sido enviado correctamente');
          console.log("Acá guardamos los datos");
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
  Mensaje_Correo(emisor:string,Asunto:string,Fecha:string,Mensaje:string){
    Swal.fire({
      background: '#fff no-repeat center url(https://github.com/romeoaxpuac123/MisImagenes/blob/main/Diabetic/Fondoperfil.png?raw=true',
      title: "<a style=\"color:black\">"+ "Información Mensaje" +"</a>" 
            + "<br><span>De: " + emisor + "</span>"
            + "<br><span>Asunto: " + Asunto + "</span>"
            + "<br><span>Correo: " + Fecha + "</span>",
      input: 'textarea',
       inputValue: Mensaje,
      inputAttributes: {
        'disabled':'false',
      },
      confirmButtonText: "Aceptar",
      confirmButtonColor: "black",
    })  
  }
  Mensaje_Hematologia(Nombre:string,Cantidad:string,Fecha:string){
    Swal.fire({
      background: '#fff no-repeat center url(https://github.com/romeoaxpuac123/MisImagenes/blob/main/Diabetic/Fondoperfil.png?raw=true',
      title: "<a style=\"color:black\">"+ "Información Hematologia" +"</a>" 
            + "<br><span>Hematología: " + Nombre + "</span>"
            + "<br><span>Total: " + Cantidad + "</span>"
            + "<br><span>Fecha: " + Fecha + "</span>",
      
      confirmButtonText: "Aceptar",
      confirmButtonColor: "black",
    })  
  }
  //Metodos para el envio de mensajes
  /*
  EsMedico(): boolean {
    var Info = this.Almacenamiento.ObtenerInformacionLS("Tipo");

    var o = JSON.parse(Info);
    if (o.TipoUsuario == 'Medico') {
      return true;
    }
    return false;
  }
  */

}
