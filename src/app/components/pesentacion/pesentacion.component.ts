import { Component, OnInit } from '@angular/core';
import {AlertasComponent} from '../alertas/alertas.component';
import {MicroserviciosService} from '../../services/microservicios.service';
@Component({
  selector: 'app-pesentacion',
  templateUrl: './pesentacion.component.html',
  styleUrls: ['./pesentacion.component.css']
})
export class PesentacionComponent implements OnInit {
  public Alamars:AlertasComponent = new AlertasComponent;
  public Coleccion: string[] = [];
  public Direcciones:string [] = [];
  public i:number = 0;
  public nombre:string = "";
  public correo:string = ""; 
  public asunto:string = "";
  public mensaje:string = "";
  constructor(

    private Microservicio: MicroserviciosService,
  ) {
     
    this.Coleccion = ["https://github.com/romeoaxpuac123/MisImagenes/blob/main/Diabetic/Banner5.jpg?raw=true",
    "https://github.com/romeoaxpuac123/MisImagenes/blob/main/Diabetic/Banner2.jpg?raw=true",
    "https://github.com/romeoaxpuac123/MisImagenes/blob/main/Diabetic/Banner4.jpg?raw=true",
    "https://github.com/romeoaxpuac123/MisImagenes/blob/main/Diabetic/Banner1.jpg?raw=true"
 ]

this.Direcciones = ["https://www.facebook.com/HopeDiabetic",
     "",                      
     "https://www.diainternacionalde.com/ficha/dia-mundial-diabetes",
     "",

]
   
  }

  ngOnInit(): void {
    setInterval(() => {this.CambiarImagen()}, 5000);
  }

  CambiarImagen(){
    let imagen: any = document.getElementById('slide');
    let ruta: any = document.getElementById('ruta');
    imagen.src = this.Coleccion[this.i];
    ruta.href = this.Direcciones[this.i];
    this.i = (this.i < this.Coleccion.length - 1) ? this.i+1 : 0;
  }
  Contactanos(){
    console.log("Contactanos");
    if(this.nombre == "" || this.correo == "" || this.mensaje == "" || this.asunto == ""){
      this.Alamars.Mensaje_De_Error("Error","Lleno todos los datos del formulario");
    }else{
      this.Microservicio.Contactanos(this.nombre,this.asunto,this.correo)  .subscribe((resp:any)=>{
        this.Alamars.Mensaje_De_Confirmacion("Bienvenido","Gracias por utilizar Hope Diabetic, pronto responderemos tu mensaje")

      });
      this.Microservicio.InfoContacanos(this.nombre,this.asunto,this.correo,this.mensaje).subscribe((resp:any)=>{
        //this.Alamars.Mensaje_De_Confirmacion("Bienvenido","Gracias por utilizar Hope Diabetic")
        console.log("fin");
      });

    }

  }

}
