import { Component, OnInit } from '@angular/core';
import { AlertasComponent } from '../alertas/alertas.component';
import { MicroserviciosService } from '../../services/microservicios.service';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {
  public Alamars: AlertasComponent = new AlertasComponent;
  public OnnSesion: boolean = false;
  public Medico: boolean = true;
  //Variables Perfil
  public Nombre:string = "";
  public Apellido:string = "";
  public Usuario:string = "";
  public Foto:string = "";
  //Variables Ficha
  public External_ID_Ficha:number = 0;
  public External_ID_Cliente:number = 0;
  public Estatura:number = 0;
  public Ultimo_Control: string = "2021-01-01" ;
  public Peso:number = 0;
  public Grupo_Sanguineo:string = "";
  public Medicamente1:string = "";
  public Medicamente2:string = "";
  public Medicamente3:string = "";
  public Medicamente4:string = "";
  public Medicamente5:string = "";
  public Intolerancia1:string = "";
  public Intolerancia2:string = "";
  public Intolerancia3:string = "";
  public Cirujias:number = 0;
  public CirucijaTexto:string = ""
  public CirN:boolean=true;
  public CirS:boolean=false;
  public Enfermedad1:string = "";
  public Enfermedad2:string = "";
  public Enfermedad3:string = "";


  constructor(
    private navegacion: Router,
    private Microservicio: MicroserviciosService,
    private Almacenamiento: LocalService,
  ) { }

  ngOnInit(): void {
    this.OnnSesion = this.SesionOnn();
    
    console.log("Ssss");
    console.log(this.Ultimo_Control);
    console.log(this.OnnSesion);
    console.log(this.Medico);
    if (this.OnnSesion == false) {
      this.Alamars.Mensaje_De_Error("Usuario sin permisos", "Para hacer uso de esta función inice sesión");
      this.navegacion.navigate(['']);
    }else{
      this.Medico = this.EsMedico();
      if(this.Medico == true){
        this.Alamars.Mensaje_De_Error("Usuario sin permisos", "Para hacer uso de esta función inice sesión como paciente");
      this.navegacion.navigate(['']);
      }else{
        this.TieneFicha();
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
  TieneFicha():void{
    var Info = this.Almacenamiento.ObtenerInformacionLS("Usuario");
    console.log("hooooooooooolaXD");
    console.log("-" + Info + "-")
    var o = JSON.parse(Info);
    this.Nombre = o.name;
    this.Apellido = o.apellido;
    this.Usuario = "@"+ this.Nombre+ this.Apellido;
    this.Foto = o.Foto;
    this.External_ID_Cliente = o.user;
    this.Microservicio.ObtenerFicha(o.user).subscribe((resp:any)=>{
      if(resp.msg ==true){
        console.log("Tiene Ficha");
        console.log(resp.info[0]);
        //Asignando valores
        this.External_ID_Ficha = resp.info[0].External_ID_Ficha;
        this.External_ID_Cliente = resp.info[0].External_ID_Cliente;
        this.Estatura = resp.info[0].Estatura;
        this.Ultimo_Control = resp.info[0].Ultimo_Control.substring(0, 10);
        this.Peso = resp.info[0].Peso;   
        this.Grupo_Sanguineo = resp.info[0].Grupo_Sanguineo;
        this.Medicamente1 = resp.info[0].Medicamente1;
        this.Medicamente2 = resp.info[0].Medicamente2;
        this.Medicamente3 = resp.info[0].Medicamente3;
        this.Medicamente4 = resp.info[0].Medicamente4;
        this.Medicamente5 = resp.info[0].Medicamente5;
        this.Intolerancia1 = resp.info[0].Intolerancia1;
        this.Intolerancia2 = resp.info[0].Intolerancia2;
        this.Intolerancia3 = resp.info[0].Intolerancia3;
        this.Cirujias = resp.info[0].Cirujias;
        this.Cirujias = 1;
        if(this.Cirujias == 0){
          this.CirN = true;
          this.CirS = false;
        }else{
          this.CirS = true;
          this.CirN = false;
        }
        this.Enfermedad1 = resp.info[0].Enfermedad1;
        this.Enfermedad2 = resp.info[0].Enfermedad2;
        this.Enfermedad3 = resp.info[0].Enfermedad3;


        this.Alamars.Mensaje_De_Confirmacion("En Hora buena","Hemos obtenido tu información, te recomendamos actualizarla")
        
      }else{
        console.log("No Ficha");
        this.Alamars.Mensaje_De_Error("Advertencia","Aun no tienes una ficha de salud, te recomendamos brindarnos tu información para obtener recomendaciones");  
      } 
    });
  }

  ActualizarFicha(){
    console.log("ESTAturaFICHA->" + this.External_ID_Ficha);
    console.log("ESTAturaCLIENTE->" + this.External_ID_Cliente);
    if(this.Medicamente1 == null){
      this.Medicamente1 = "";
    }
    if(this.Medicamente2 == null){
      this.Medicamente2 = "";
    }
    if(this.Medicamente3 == null){
      this.Medicamente3 = "";
    }
    if(this.Medicamente4 == null){
      this.Medicamente4 = "";
    }
    if(this.Medicamente5 == null){
      this.Medicamente5 = "";
    }
    if(this.Enfermedad1 == null){
      this.Enfermedad1 = "";
    }
    if(this.Enfermedad2 == null){
      this.Enfermedad2 = "";
    }
    if(this.Enfermedad3 == null){
      this.Enfermedad3 = "";
    }
    if(this.Intolerancia1 == null){
      this.Intolerancia1 = "";
    }
    if(this.Intolerancia2 == null){
      this.Intolerancia2 = "";
    }
    if(this.Intolerancia3 == null){
      this.Intolerancia3 = "";
    }
    if(this.IgualMedicamento(this.Medicamente1,this.Medicamente2,this.Medicamente3,this.Medicamente4,this.Medicamente5)==false){
      if(this.IgualEnfermedad(this.Enfermedad1,this.Enfermedad2,this.Enfermedad3)==false){
        if(this.IgualAlergia(this.Intolerancia1,this.Intolerancia2,this.Intolerancia3)==false){
          //Actualizar o registrar
          if(this.External_ID_Ficha > 0){
            //Actualizamos
            this.Microservicio.ActualizarFicha(this.External_ID_Ficha,
              this.External_ID_Cliente,this.Estatura,this.Ultimo_Control,this.Peso,
              this.Grupo_Sanguineo,this.Medicamente1,this.Medicamente2,this.Medicamente3,
              this.Medicamente4,this.Medicamente5,this.Intolerancia1,this.Intolerancia2,
              this.Intolerancia3,0,this.Enfermedad1,this.Enfermedad2,this.Enfermedad3        
              ) 
            
            .subscribe((resp:any)=>{
              console.log(resp);
              if(resp.msg ==true){
                console.log("Actualizacion");
                console.log(resp.info[0]);
                console.log("ESTAtura->" + this.Estatura);
                //Asignando valores
                this.External_ID_Ficha = resp.info[0].External_ID_Ficha;
                this.External_ID_Cliente = resp.info[0].External_ID_Cliente;
                this.Estatura = resp.info[0].Estatura;
                this.Ultimo_Control = resp.info[0].Ultimo_Control.substring(0, 10);
                this.Peso = resp.info[0].Peso;   
                this.Grupo_Sanguineo = resp.info[0].Grupo_Sanguineo;
                this.Medicamente1 = resp.info[0].Medicamente1;
                this.Medicamente2 = resp.info[0].Medicamente2;
                this.Medicamente3 = resp.info[0].Medicamente3;
                this.Medicamente4 = resp.info[0].Medicamente4;
                this.Medicamente5 = resp.info[0].Medicamente5;
                this.Intolerancia1 = resp.info[0].Intolerancia1;
                this.Intolerancia2 = resp.info[0].Intolerancia2;
                this.Intolerancia3 = resp.info[0].Intolerancia3;
                this.Cirujias = resp.info[0].Cirujias;
                this.Cirujias = 1;
                if(this.Cirujias == 0){
                  this.CirN = true;
                  this.CirS = false;
                }else{
                  this.CirS = true;
                  this.CirN = false;
                }
                this.Enfermedad1 = resp.info[0].Enfermedad1;
                this.Enfermedad2 = resp.info[0].Enfermedad2;
                this.Enfermedad3 = resp.info[0].Enfermedad3;
        
        
                this.Alamars.Mensaje_De_Confirmacion("En Hora buena","Hemos actualizado tu información")
                
              }else{
                console.log("No Ficha");
                this.Alamars.Mensaje_De_Error("Intente más tarde","Tenemos problemas con nuestro servidor, disculpe las molestias.");  
              } 
            });
          }else{
            //Registramos
            
            this.Microservicio.RegistrarFicha(
              this.External_ID_Cliente,this.Estatura,this.Ultimo_Control,this.Peso,
              this.Grupo_Sanguineo,this.Medicamente1,this.Medicamente2,this.Medicamente3,
              this.Medicamente4,this.Medicamente5,this.Intolerancia1,this.Intolerancia2,
              this.Intolerancia3,0,this.Enfermedad1,this.Enfermedad2,this.Enfermedad3        
              ) 
            
            .subscribe((resp:any)=>{
              console.log(resp);
              if(resp.msg ==true){
                console.log("Nuevo");
                console.log(resp)
                console.log(resp.info[0]);
                console.log("ESTAtura->" + this.Estatura);
                //Asignando valores
                this.External_ID_Ficha = resp.info[0].External_ID_Ficha;
                this.External_ID_Cliente = resp.info[0].External_ID_Cliente;
                this.Estatura = resp.info[0].Estatura;
                this.Ultimo_Control = resp.info[0].Ultimo_Control.substring(0, 10);
                this.Peso = resp.info[0].Peso;   
                this.Grupo_Sanguineo = resp.info[0].Grupo_Sanguineo;
                this.Medicamente1 = resp.info[0].Medicamente1;
                this.Medicamente2 = resp.info[0].Medicamente2;
                this.Medicamente3 = resp.info[0].Medicamente3;
                this.Medicamente4 = resp.info[0].Medicamente4;
                this.Medicamente5 = resp.info[0].Medicamente5;
                this.Intolerancia1 = resp.info[0].Intolerancia1;
                this.Intolerancia2 = resp.info[0].Intolerancia2;
                this.Intolerancia3 = resp.info[0].Intolerancia3;
                this.Cirujias = resp.info[0].Cirujias;
                this.Cirujias = 1;
                if(this.Cirujias == 0){
                  this.CirN = true;
                  this.CirS = false;
                }else{
                  this.CirS = true;
                  this.CirN = false;
                }
                this.Enfermedad1 = resp.info[0].Enfermedad1;
                this.Enfermedad2 = resp.info[0].Enfermedad2;
                this.Enfermedad3 = resp.info[0].Enfermedad3;
        
        
                this.Alamars.Mensaje_De_Confirmacion("En Hora buena","Hemos registrado tu información")
                
              }else{
                console.log("No Ficha");
                this.Alamars.Mensaje_De_Error("Intente más tarde","Tenemos problemas con nuestro servidor, disculpe las molestias.");  
              } 
            });
      
          }
        }else{
          //Alergias iguales
          this.Alamars.Mensaje_De_Error("Datos repetidos", "Las intolerancias deben ser distintas");
        }
      }else{
        //Enfermedades iguales
        this.Alamars.Mensaje_De_Error("Datos repetidos", "Las Enfermedades deben ser distintas");
      }
    }else{
      //medicamentos iguales
      this.Alamars.Mensaje_De_Error("Datos repetidos", "Los medicamentos deben ser distintas");
    }

   
  }

  IgualMedicamento(Med1:string,Med2:string,Med3:string,Med4:string,Med5:string):boolean{
    if(Med1.length>0){
      if(Med1 == Med2 || Med1 == Med3 || Med1 == Med4 || Med1 == Med5 ){
        console.log("Medicamentos iguales 1")
        return true;
      }
    }
    if(Med2.length>0){
      if(Med2 == Med3 || Med2 == Med4 || Med2 == Med5 ){
        console.log("Medicamentos iguales 2")
        return true;
      }
    }
    if(Med3.length>0){
      if(Med3 == Med4 || Med3 == Med5 ){
        console.log("Medicamentos iguales 3")
        return true;
      }
    }
    if(Med4.length>0){
      if(Med4 == Med5){
        console.log("Medicamentos iguales 4")
        return true;
      }
    }
    return false;
  }
  IgualAlergia(Med1:string,Med2:string,Med3:string):boolean{
    if(Med1.length>0){
      if(Med1 == Med2 || Med1 == Med3){
        return true;
      }
    }
    if(Med2.length>0){
      if(Med2 == Med3 ){
        return true;
      }
    }
    return false;
  }
  IgualEnfermedad(Med1:string,Med2:string,Med3:string):boolean{
    if(Med1.length>0){
      if(Med1 == Med2 || Med1 == Med3){
        return true;
      }
    }
    if(Med2.length>0){
      if(Med2 == Med3 ){
        return true;
      }
    }
    return false;
  }

}
