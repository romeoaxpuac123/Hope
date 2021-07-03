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
  public arregloRutina:any = [];
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
  public VerComida = false;
  public VerEjercicio = false;
  public ParrafoEjercicio:string = "";
  public DescripcionEjercicio = "";
  public Duracion = "";
  public Series = "";
  public Repeticiones = "";
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
         this.RutinaCompleta();
      }
    }
  }
  VerAlimentacion(){
    this.VerComida = true;
    this.VerEjercicio = false;
    this.ParrafoEjercicio = "";
    this.DescripcionEjercicio = "";
    this.Duracion = "";
    this.Series = "";
    this.Repeticiones = "";
    this.ver = false;
    this.ParrafoComida = "";
    this.subtitulo = "";
    this.subtitulo2 = "";
    this.subtitulo3 = "";
    this.Nombre = "";
    this.imagenComida = "";
    this.Paso1 = "";
    this.Paso2 = "";
    this.Paso3 = "";
    this.Paso4 = "";
    this.Ingredientes = [];
  }
  VerRutinas(){
    this.VerComida = false;
    this.VerEjercicio = true;
    this.ParrafoEjercicio = "";
    this.DescripcionEjercicio = "";
    this.Duracion = "";
    this.Series = "";
    this.Repeticiones = "";
    this.ver = false;
    this.ParrafoComida = "";
    this.subtitulo = "";
    this.subtitulo2 = "";
    this.subtitulo3 = "";
    this.Nombre = "";
    this.imagenComida = "";
    this.Paso1 = "";
    this.Paso2 = "";
    this.Paso3 = "";
    this.Paso4 = "";
    this.Ingredientes = [];
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
    this.subtitulo = "";
    this.subtitulo2 = "";
    this.subtitulo3 = "";
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
  RutinaCompleta(){
    this.subtitulo = "";
    this.subtitulo2 = "";
    this.subtitulo3 = "";
    this.ParrafoEjercicio = "Se muestran todas las rutinas de ejercicios que se encuentran en nuestro sistema, cada una indicando el nivel de dificultad que posee";
    this.arregloRutina = [];
    this.Microservicio.Rutinas().subscribe((resp: any) => {
      if (resp.msg == true) { 
        for (let MensajeRecibido of resp.info) {
          this.arregloRutina.push( {
            "Nombre": MensajeRecibido.Nombre,
            "Duracion": MensajeRecibido.Duracion,
            "Series": MensajeRecibido.Series,
            "Repeticiones": MensajeRecibido.Repeticiones,
            "Imagen": MensajeRecibido.Imagen,
            "Nivel": MensajeRecibido.Nivel,
            "Descripcion": MensajeRecibido.Descripcion
          });
        }
      }
    });
  }
  InformacionEjercicio(NombreEjercicio:string,Nivel:string,Descripcion:string,
    DuracionE:string,SeriesE:string,RepeticionesE:string,ImagenEjercicio:string): void {
    this.ver = true;
    this.Nombre = NombreEjercicio;
    this.subtitulo = "NIVEL " + Nivel;
    this.subtitulo2 = "DESCRIPCION";
    this.DescripcionEjercicio = Descripcion;
    this.subtitulo3 = "INFORMACION";
    this.Duracion = DuracionE;
    this.Series = SeriesE;
    this.Repeticiones = RepeticionesE;
    this.imagenComida = ImagenEjercicio;
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
              this.Microservicio.MenuIntolerancias(CodigoUsuarioH).subscribe((resp3: any) => {
                
                var Alergia1 = "Romeo";
                var Alergia2 = "Romeo";
                var Alergia3 = "Romeo";
                var Alergia4 = "Romeo";
                var Alergia5 = "Romeo";
                var Alergia6 = "Romeo";
                var Alergia7 = "Romeo";
                var Alergia8 = "Romeo";
                var Alergia9 = "Romeo";
                var Alergia10 = "Romeo";
                var Alergia11 = "Romeo";
                var Alergia12 = "Romeo";
                if(resp3.msg == true){
                  console.log("SNK-1-" + resp3.info[0].Intolerancia1+"-")
                  console.log("SNK-1-" + resp3.info[0].Intolerancia2+"-")
                  console.log("SNK-1-" + resp3.info[0].Intolerancia3+"-")
                  if(resp3.info[0].Intolerancia1 != null && resp3.info[0].Intolerancia1 != "" && resp3.info[0].Intolerancia1.length >= 0){
                    Alergia1 = resp3.info[0].Intolerancia1.toUpperCase();
                  }
                  if(resp3.info[0].Intolerancia2 != null && resp3.info[0].Intolerancia2 != "" && resp3.info[0].Intolerancia2.length >= 0){
                    Alergia2 = resp3.info[0].Intolerancia2.toUpperCase();
                  }
                  if(resp3.info[0].Intolerancia3 != null && resp3.info[0].Intolerancia3 != "" && resp3.info[0].Intolerancia3.length >= 0){
                    Alergia3 = resp3.info[0].Intolerancia3.toUpperCase();
                  }                                
                }
                switch(Alergia1){
                  case "LACTOSA":
                    Alergia1 = "LECHE";
                    Alergia4 = "YOGUR";
                    Alergia10 = "QUESO";
                    break;
                  case "GLUTEN":
                    Alergia1 = "TORTILLA";
                    Alergia4 = "PAN";
                    break;
                  case "HISTAMINA":
                    Alergia1 = "FRESA";
                    Alergia4 = "HUEVO";
                    Alergia5 = "FRUTA";
                }
                switch(Alergia2){
                  case "LACTOSA":
                    Alergia2 = "LECHE";
                    Alergia6 = "YOGUR";
                    Alergia11 = "QUESO";
                    break;
                  case "GLUTEN":
                    Alergia2 = "TORTILLA";
                    Alergia6 = "PAN";
                    break;
                  case "HISTAMINA":
                    Alergia2 = "FRESA";
                    Alergia6 = "HUEVO";
                    Alergia7 = "FRUTA";
                }
                switch(Alergia3){
                  case "LACTOSA":
                    Alergia3 = "LECHE";
                    Alergia8 = "YOGUR";
                    Alergia12 = "QUESO";
                    break;
                  case "GLUTEN":
                    Alergia3 = "TORTILLA";
                    Alergia8 = "PAN";
                    break;
                  case "HISTAMINA":
                    Alergia3 = "FRESA";
                    Alergia8 = "HUEVO";
                    Alergia9 = "FRUTA";
                }
                console.log("ALERGIA -" + Alergia1+"-");
                console.log("ALERGIA -" + Alergia2+"-");
                console.log("ALERGIA -" + Alergia3+"-");
                console.log("ALERGIA -" + Alergia4+"-");
                console.log("ALERGIA -" + Alergia5+"-");
                console.log("ALERGIA -" + Alergia6+"-");
                console.log("ALERGIA -" + Alergia7+"-");
                console.log("ALERGIA -" + Alergia8+"-");
                console.log("ALERGIA -" + Alergia9+"-");
                console.log("ALERGIA -" + Alergia10+"-");
                console.log("ALERGIA -" + Alergia11+"-");
                console.log("ALERGIA -" + Alergia12+"-");
                
                for (let MensajeRecibido of resp2.info) {
                  var Existe1  = MensajeRecibido.Alimento.toUpperCase().indexOf(Alergia1);
                  var Existe2  = MensajeRecibido.Alimento.toUpperCase().indexOf(Alergia2);
                  var Existe3  = MensajeRecibido.Alimento.toUpperCase().indexOf(Alergia3);
                  var Existe4  = MensajeRecibido.Alimento.toUpperCase().indexOf(Alergia4);
                  var Existe5  = MensajeRecibido.Alimento.toUpperCase().indexOf(Alergia5);
                  var Existe6  = MensajeRecibido.Alimento.toUpperCase().indexOf(Alergia6);
                  var Existe7  = MensajeRecibido.Alimento.toUpperCase().indexOf(Alergia7);
                  var Existe8  = MensajeRecibido.Alimento.toUpperCase().indexOf(Alergia8);
                  var Existe9  = MensajeRecibido.Alimento.toUpperCase().indexOf(Alergia9);
                  var Existe24  = MensajeRecibido.Alimento.toUpperCase().indexOf(Alergia10);
                  var Existe25  = MensajeRecibido.Alimento.toUpperCase().indexOf(Alergia11);
                  var Existe26  = MensajeRecibido.Alimento.toUpperCase().indexOf(Alergia12);
                  var Existe11  = MensajeRecibido.Ingredientes.toUpperCase().indexOf(Alergia1);
                  var Existe12  = MensajeRecibido.Ingredientes.toUpperCase().indexOf(Alergia2);
                  var Existe13  = MensajeRecibido.Ingredientes.toUpperCase().indexOf(Alergia3);
                  var Existe14  = MensajeRecibido.Ingredientes.toUpperCase().indexOf(Alergia4);
                  var Existe15  = MensajeRecibido.Ingredientes.toUpperCase().indexOf(Alergia5);
                  var Existe16  = MensajeRecibido.Ingredientes.toUpperCase().indexOf(Alergia6);
                  var Existe17  = MensajeRecibido.Ingredientes.toUpperCase().indexOf(Alergia7);
                  var Existe18  = MensajeRecibido.Ingredientes.toUpperCase().indexOf(Alergia8);
                  var Existe19  = MensajeRecibido.Ingredientes.toUpperCase().indexOf(Alergia9);
                  var Existe21  = MensajeRecibido.Ingredientes.toUpperCase().indexOf(Alergia10);
                  var Existe22  = MensajeRecibido.Ingredientes.toUpperCase().indexOf(Alergia11);
                  var Existe23  = MensajeRecibido.Ingredientes.toUpperCase().indexOf(Alergia12);
                  
                  if(Existe1>= 0 || Existe2>= 0 || Existe3>= 0 || Existe4>= 0
                  || Existe5>= 0 || Existe6>= 0 || Existe7>= 0 || Existe8>= 0
                  || Existe9>= 0 || Existe11>= 0 || Existe12>= 0 || Existe13>= 0
                  || Existe14>= 0 || Existe15>= 0 || Existe16>= 0 || Existe17>= 0
                  || Existe18>= 0 || Existe19>= 0 || Existe21>= 0 || Existe22>= 0
                  || Existe23>= 0 || Existe24>= 0 || Existe25>= 0 || Existe26>= 0){
                    console.log("NO se agrega");
                  }else{
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
                if(this.arregloMenu.length == 0){
                  this.Alamars.Mensaje_De_Error("NO SE ENCONTRO RECOMENDACION","Debido a tus intolerancias, no te podemos recomendar un alimetno en especifico. Pero puedes visualizar todas neustras opciones");
                  this.MenuCompleto();
                }
              });   
              
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
  MiRutina():void{
    this.arregloRutina = [];
    var Info = this.Almacenamiento.ObtenerInformacionLS("Usuario");
    var o = JSON.parse(Info);
    var CodigoUsuarioH = o.user;
    var FechaNac = o.Nacimiento.substring(0,10);
    console.log("aaaaaaaaaaaaaa-" + FechaNac);
    var FechaOficial:Date = new Date(FechaNac);
    var today = new Date();
    var yyyy = today.getFullYear();
    this.Microservicio.FichaRutina(CodigoUsuarioH).subscribe((resp: any) => {
      if (resp.msg == true) { 
        var Estatura = 0;
        var Peso = 0;
        var IMC = 0;
        var Edad = yyyy - FechaOficial.getFullYear();
        console.log("Sonreir-1"+resp.info[0].Estatura);
        console.log("Sonreir-1"+resp.info[0].Peso);
        if(resp.info[0].Estatura != null && resp.info[0].Peso != null &&
          resp.info[0].Estatura != 0  && resp.info[0].Peso != 0){
            Peso = resp.info[0].Peso * 0.453592;
            Estatura = resp.info[0].Estatura;
            IMC = Peso / (Estatura * Estatura);
            console.log("aaaaaaaaaPESO.a-" + Peso);
            console.log("aaaaaaaaaESTATURA.a-" + Estatura);
            console.log("aaaaaaaaaIMC.a-" + IMC);
            console.log("aaaaaaaaaEDAD.a-" + Edad);
            this.ParrafoEjercicio = "Se muestran todas las rutinas de ejercicios que se encuentran en nuestro sistema, cada una indicando el nivel de dificultad que posee, estos datos son obtenidos por tu Indice de Masa Corporal IMC, el cual tiene un valor de " + IMC.toFixed(2) + " y tu edad de " + Edad + " años.";
            if(IMC <= 18.5){
              this.ParrafoEjercicio =  this.ParrafoEjercicio  + " Tu IMC indica que tienes un peso inferior al normal, por lo cual te recomendamos visitar un nutriologo o especialista, para llegar a tu peso ideal. Tambien te recomendamos estos ejercicios para ganar peso muscular."
              this.Microservicio.RutinasNivel("1").subscribe((resp2: any) => {
                if (resp2.msg == true) { 
                  for (let MensajeRecibido of resp2.info) {
                    this.arregloRutina.push( {
                      "Nombre": MensajeRecibido.Nombre,
                      "Duracion": MensajeRecibido.Duracion,
                      "Series": MensajeRecibido.Series,
                      "Repeticiones": MensajeRecibido.Repeticiones,
                      "Imagen": MensajeRecibido.Imagen,
                      "Nivel": MensajeRecibido.Nivel,
                      "Descripcion": MensajeRecibido.Descripcion
                    });
                  }
                }
              });
            }else if(IMC > 18.5 && IMC <=24.9){
              this.ParrafoEjercicio =  this.ParrafoEjercicio  + " Tu IMC indica que tienes un peso Normal, te recomendamos los siguientes ejercicios."
              this.Microservicio.RutinasNivel("2").subscribe((resp2: any) => {
                if (resp2.msg == true) { 
                  for (let MensajeRecibido of resp2.info) {
                    this.arregloRutina.push( {
                      "Nombre": MensajeRecibido.Nombre,
                      "Duracion": MensajeRecibido.Duracion,
                      "Series": MensajeRecibido.Series,
                      "Repeticiones": MensajeRecibido.Repeticiones,
                      "Imagen": MensajeRecibido.Imagen,
                      "Nivel": MensajeRecibido.Nivel,
                      "Descripcion": MensajeRecibido.Descripcion
                    });
                  }
                  this.Microservicio.RutinasNivel("3").subscribe((resp3: any) => {
                    if (resp3.msg == true) { 
                      for (let MensajeRecibido of resp3.info) {
                        this.arregloRutina.push( {
                          "Nombre": MensajeRecibido.Nombre,
                          "Duracion": MensajeRecibido.Duracion,
                          "Series": MensajeRecibido.Series,
                          "Repeticiones": MensajeRecibido.Repeticiones,
                          "Imagen": MensajeRecibido.Imagen,
                          "Nivel": MensajeRecibido.Nivel,
                          "Descripcion": MensajeRecibido.Descripcion
                        });
                      }
                    }
                  });
                }
              });
            }else if(IMC > 24.9 && IMC <=29.9){
              this.ParrafoEjercicio =  this.ParrafoEjercicio  + " Tu IMC indica que tienes un peso superior a lo normal, por lo cual te recomendamos los siguientes ejercicios"
              this.Microservicio.RutinasNivel("2").subscribe((resp2: any) => {
                if (resp2.msg == true) { 
                  for (let MensajeRecibido of resp2.info) {
                    this.arregloRutina.push( {
                      "Nombre": MensajeRecibido.Nombre,
                      "Duracion": MensajeRecibido.Duracion,
                      "Series": MensajeRecibido.Series,
                      "Repeticiones": MensajeRecibido.Repeticiones,
                      "Imagen": MensajeRecibido.Imagen,
                      "Nivel": MensajeRecibido.Nivel,
                      "Descripcion": MensajeRecibido.Descripcion
                    });
                  }
                }
              });
            }else if(IMC > 29.9){
              this.ParrafoEjercicio =  this.ParrafoEjercicio  + " Tu IMC indica que tienes sobrepeso, por lo cual te recomendamos los siguientes ejercios."
              this.Microservicio.RutinasNivel("1").subscribe((resp2: any) => {
                if (resp2.msg == true) { 
                  for (let MensajeRecibido of resp2.info) {
                    this.arregloRutina.push( {
                      "Nombre": MensajeRecibido.Nombre,
                      "Duracion": MensajeRecibido.Duracion,
                      "Series": MensajeRecibido.Series,
                      "Repeticiones": MensajeRecibido.Repeticiones,
                      "Imagen": MensajeRecibido.Imagen,
                      "Nivel": MensajeRecibido.Nivel,
                      "Descripcion": MensajeRecibido.Descripcion
                    });
                  }
                }
              });
            }
        }else{
          this.Alamars.Mensaje_De_Error("DATOS NO ENCONTRADOS","Usted no tiene registrado Estatura, peso o fecha de nacimiento en el sistema.")
        }
      }else{
        this.Alamars.Mensaje_De_Error("FICHA NO ENCONTRADA","No logramos encontrar registros de una ficha medica, por lo cual no podemos recomendarte una rutina especifica.");
        this.RutinaCompleta();
      }
    });
  }
}
