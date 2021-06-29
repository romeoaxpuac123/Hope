import { Component, OnInit, ɵConsole } from '@angular/core';
import { MicroserviciosService } from '../../services/microservicios.service';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';
import { AlertasComponent } from '../alertas/alertas.component';
@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent implements OnInit {
  public Alamars: AlertasComponent = new AlertasComponent;
  public arregloMenu: any = [];
  public Nombre: string = "";
  public Calorias: number = 0;
  public Grasa: number = 0;
  public Colesterol:number = 0;
  public Carbohidratos: number = 0;
  public Azucares: number = 0;
  public Proteina: number = 0;
  public Ingredientes: any = [];
  public Imagen: string = "";
  public Paso1: string = "";
  public Paso2: string = "";
  public Paso3: string = "";
  public Paso4: string = "";
  public subtitulo:string="";
  public subtitulo2:string="";  
  public subtitulo3:string=""; 
  public imagenComida:string="";
  public ver:boolean = false;
  public OnnSesion: boolean = false;
  public EsMedicoA: boolean = false;
  public ParrafoComida:string = "";
  public TipoAlimento:string = "";
  constructor(
    private Microservicio: MicroserviciosService,
    private Almacenamiento: LocalService,
    private navegacion: Router,
  ) { 
    
   
}

  ngOnInit(): void {
    
    this.OnnSesion = this.SesionOnn();
    if (this.OnnSesion == false) {
      this.Alamars.Mensaje_De_Error("Usuario sin permisos", "Para hacer uso de esta función inice sesión");
      this.navegacion.navigate(['']);
    } else {
      if (this.EsMedico() == true) {
        this.Alamars.Mensaje_De_Error("Usuario sin permisos", "Para hacer uso de esta función inice sesión como paciente");
        this.navegacion.navigate(['']);
      } else {
         this.MenuCompleto();
      }
    }
  }
  Informacion(Titulo: string,Elementos:string, Paso1:string, Paso2:string,Paso3:string,Paso4:string,
    Imagen:string,cal:number,grasa:number,car:number,azu:number,pro:number,cole:number): void {
    this.ver = true;
    this.Nombre = Titulo;    
    this.subtitulo = "Ingredientes:";
    this.Ingredientes = Elementos.split(".");
    this.subtitulo2 = "Instrucciones:"
    this.subtitulo3 = "Información nutricional (por porción):"
    this.Paso1 = Paso1;
    this.Paso2 = Paso2;
    this.Paso3 = Paso3;
    this.Paso4 = Paso4;
    this.imagenComida = Imagen;
    this.Calorias = cal;
    this.Grasa = grasa;
    this.Carbohidratos = car;
    this.Azucares = azu;
    this.Proteina = pro;
    this.Colesterol = cole;
  }
  MenuCompleto(){
    this.ParrafoComida = "Se muestran todos los alimentos,sin analizar Hematologias y Ficha medica. La foto de la receta puede incluir alimentos e ingredientes que no forman parte de esta receta y no están incluidos en el análisis nutricional."
    this.arregloMenu = [];
    this.Microservicio.Menu().subscribe((resp: any) => {
      if (resp.msg == true) { 
        for (let MensajeRecibido of resp.info) {
          this.arregloMenu.push( {
            "titulo": MensajeRecibido.Alimento,
            "Calorias": MensajeRecibido.Calorias,
            "Grasa": MensajeRecibido.Grasa,
            "Carbohidratos": MensajeRecibido.Carbohidratos,
            "Azucares": MensajeRecibido.Azucares,
            "Protehina": MensajeRecibido.Proteina,
            "Colesterol": MensajeRecibido.Colesterol,
            "Paso1": MensajeRecibido.Paso1,
            "Paso2": MensajeRecibido.Paso2,
            "Paso3": MensajeRecibido.Paso3,
            "Paso4": MensajeRecibido.Paso4,
            "Ingredientes":MensajeRecibido.Ingredientes,
            "texto":MensajeRecibido.Imagen ,
            "tipo:":MensajeRecibido.Tipo
          });
        }
      }
    });
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
  Recomendar():void{
    this.arregloMenu = [];
    var Info = this.Almacenamiento.ObtenerInformacionLS("Usuario");
    var o = JSON.parse(Info);
    var CodigoUsuarioH = o.user;
    if(this.TipoAlimento == ""){
      this.Alamars.Mensaje_De_Error("Error", "Seleccione el tipo de platico que busca");
    }else{
      this.Microservicio.UltimosRegistrosRecomendaciones(CodigoUsuarioH).subscribe((resp: any) => {
        if (resp.msg == true) {
          this.ParrafoComida = "Se muestran todos los alimentos, analizando tus Hematologias y Ficha medica."
          var ValorCalorias = 500;
          var ValorGrasa = 200;
          var ValorColesterol = 210;
          var ValorCarbohidratos = 50;
          var ValorAzucares = 20;
          for (let HematologiasRecibidas of resp.info) {
            console.log("Heeeeemaaaa1-" + HematologiasRecibidas.Internal_ID_Hematologia )
            console.log("Heeeeemaaaa2-" + HematologiasRecibidas.Cantidad )
              if(HematologiasRecibidas.Internal_ID_Hematologia == 1 &&
                HematologiasRecibidas.Cantidad >= 6.8){
                  ValorCarbohidratos = 25;
                  ValorAzucares = 10;
                  this.ParrafoComida = this.ParrafoComida + " Encontramos que tu HEMOGLOBINA GLICOSILADA no se encuentra en un buen control."
              } 
              else if(HematologiasRecibidas.Internal_ID_Hematologia == 2 &&
                HematologiasRecibidas.Cantidad >=100){
                  ValorCarbohidratos = 25;
                  ValorAzucares = 10;
                  this.ParrafoComida = this.ParrafoComida + " Tu GLUCOSA PRE-PRANDRIAL ha sobrepasado su valor de referencia. "
              }
              else if(HematologiasRecibidas.Internal_ID_Hematologia == 3 &&
                HematologiasRecibidas.Cantidad >=160){
                  ValorCarbohidratos = 25;
                  ValorAzucares = 10;
                  this.ParrafoComida = this.ParrafoComida + " Tu GLUCOSA POST-PRANDRIAL ha sobrepasado su valor de referencia. "
              }
              else if(HematologiasRecibidas.Internal_ID_Hematologia == 5 &&
                HematologiasRecibidas.Cantidad >=200){
                  ValorCalorias = 200;
                  ValorGrasa = 100;
                  ValorColesterol = 100;
                  this.ParrafoComida = this.ParrafoComida + " Tu COLESTEROL TOTAL ha superado el valor de referencia.";
              }
              else if(HematologiasRecibidas.Internal_ID_Hematologia == 8 &&
                HematologiasRecibidas.Cantidad >=170){
                  ValorCalorias = 200;
                  ValorGrasa = 100;
                  ValorColesterol = 100;
                  this.ParrafoComida = this.ParrafoComida + " Tienes TRIGLICERIDOS elavados.";
              }
          }
          this.ParrafoComida = this.ParrafoComida + " La foto de la receta puede incluir alimentos e ingredientes que no forman parte de esta receta y no están incluidos en el análisis nutricional.";
          console.log("Los valores que van en la API");
          console.log(ValorCalorias);
          console.log(ValorGrasa);
          console.log(ValorColesterol);
          console.log(ValorCarbohidratos);
          console.log(ValorAzucares);
          console.log("fin");
          this.Microservicio.MenuRecomendacion(ValorCalorias,ValorGrasa,ValorColesterol,ValorCarbohidratos,ValorAzucares,this.TipoAlimento).subscribe((resp2: any) => {
            if (resp2.msg == true) {   
              for (let MensajeRecibido of resp2.info) {
                this.arregloMenu.push( {
                  "titulo": MensajeRecibido.Alimento,
                  "Calorias": MensajeRecibido.Calorias,
                  "Grasa": MensajeRecibido.Grasa,
                  "Carbohidratos": MensajeRecibido.Carbohidratos,
                  "Azucares": MensajeRecibido.Azucares,
                  "Protehina": MensajeRecibido.Proteina,
                  "Colesterol": MensajeRecibido.Colesterol,
                  "Paso1": MensajeRecibido.Paso1,
                  "Paso2": MensajeRecibido.Paso2,
                  "Paso3": MensajeRecibido.Paso3,
                  "Paso4": MensajeRecibido.Paso4,
                  "Ingredientes":MensajeRecibido.Ingredientes,
                  "texto":MensajeRecibido.Imagen ,
                  "tipo:":MensajeRecibido.Tipo
                });
              }
            }else{
              this.Alamars.Mensaje_De_Error("Advertencia","No tienes ninguna hematologia registrada");
              this.MenuCompleto();
            }
          });
        }else{
          this.Alamars.Mensaje_De_Error("Error","Estamos experimentando errores, intentelo más adelante.")
        }
      });
    }
    
  }
}
