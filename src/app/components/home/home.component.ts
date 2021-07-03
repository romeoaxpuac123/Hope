import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';
import { AlertasComponent } from '../alertas/alertas.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public Alamars: AlertasComponent = new AlertasComponent;
  public Coleccion: string[] = [];
  public Direcciones: string[] = [];
  public arregloMenu: any = [];
  public i: number = 0;
  public OnnSesion: boolean = false;
  constructor(
    private Almacenamiento: LocalService,
    private navegacion: Router,
  ) {
    this.Coleccion = ["https://github.com/romeoaxpuac123/MisImagenes/blob/main/Diabetic/Banner6.jpg?raw=true",
      "https://github.com/romeoaxpuac123/MisImagenes/blob/main/Diabetic/Banner2.jpg?raw=true",
      "https://github.com/romeoaxpuac123/MisImagenes/blob/main/Diabetic/DMS.jpg?raw=true",
      "https://github.com/romeoaxpuac123/MisImagenes/blob/main/Diabetic/Banner1.jpg?raw=true"
    ]

    this.Direcciones = ["https://www.facebook.com/HopeDiabetic",
      "",
      "https://www.diainternacionalde.com/ficha/dia-mundial-diabetes",
      "",

    ]
    this.i += 1;


  }

  ngOnInit(): void {
    setInterval(() => { this.CambiarImagen() }, 6000);
    this.OnnSesion = this.SesionOnn();
    if (this.OnnSesion == false) {
      this.Alamars.Mensaje_De_Error("Usuario sin permisos", "Para hacer uso de esta función inice sesión");
      this.navegacion.navigate(['']);
    } else {
      if (this.EsMedico() == true) {
        //Arreglo Medico
        this.arregloMenu = [
        {
          "titulo": "Siguenos en Facebook",
          "texto": "En esta red social podrás encontrar información referente a la diabetes, una comunidad que comparte sus opiniones y más entorno a este estilo de vida.",
          "enlace": "https://www.facebook.com/HopeDiabetic"
        },
        
        {
          "titulo": "Día internacional de la diabetes",
          "texto": "Se aproxima el dia internacional de la diabetes, conoce toda la información y conoce más sobre este día dando clic en el botón.",
          "enlace": "https://www.diainternacionalde.com/ficha/dia-mundial-diabetes"
        },
        ]

      } else {
        //Arreglo Usuario
        this.arregloMenu = [{
          "titulo": "Ficha Médica",
          "texto": "Es de suma importancia para nosotros el poder conocerte màs a fondo, por lo cual es importante que llenes una pequeña ficha médica, ya que por ello podremos recomendarte distintos platillos y ejercicios. Llena esta información dando clic en el siguiente boton",
          "enlace": "/Ficha"
        },
        {
          "titulo": "Siguenos en Facebook",
          "texto": "En esta red social podrás encontrar información referente a la diabetes, una comunidad que comparte sus opiniones y más entorno a este estilo de vida.",
          "enlace": "https://www.facebook.com/HopeDiabetic"
        },
        {
          "titulo": "Baila con todas tus fuerzas",
          "texto": "¿Sabias que el baile es saludable para ti? El baile proporciona músculos y huesos más fuertes, mejora la salud y la memoria además de reducir el estrés, un factor no beneficioso para la diabetes. Encontramos unos videos divertidos para ti y que motivaran a moverte y salir de tu zona de confort. Da clic en el siguiente boton.",
          "enlace": "https://youtu.be/PcuL6L8xqRE"
        },
        {
          "titulo": "Día internacional de la diabetes",
          "texto": "Se aproxima el dia internacional de la diabetes, conoce toda la información y conoce más sobre este día dando clic en el botón.",
          "enlace": "https://www.diainternacionalde.com/ficha/dia-mundial-diabetes"
        },
        ]

      }
    }
  }
  CambiarImagen() {
    let imagen: any = document.getElementById('slide');
    let ruta: any = document.getElementById('ruta');
    imagen.src = this.Coleccion[this.i];
    ruta.href = this.Direcciones[this.i];
    this.i = (this.i < this.Coleccion.length - 1) ? this.i + 1 : 0;
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

}
