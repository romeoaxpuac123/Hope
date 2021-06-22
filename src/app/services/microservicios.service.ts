import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
//import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class MicroserviciosService {
  private _refresh$ = new Subject<void>();
  private _refresh2$ = new Subject<void>();
  private _refresh3$ = new Subject<void>();
  constructor(
    private _http:HttpClient, 
  ){ 

  }
  get refresh$(){
    return this._refresh$;
  }
  get refresh2$(){
    return this._refresh2$;
  }
  get refresh3$(){
    return this._refresh3$;
  }
  SesionCliente(correo:string,password:string){
    
    let urlAPI = 'http://localhost:3003/authCliente';
    return this._http.post(urlAPI,{
      "email": correo,
      "pass": password,

    });   
   
  }
  SesionMedico(correo:string,password:string){
    let urlAPI = 'http://localhost:3003/authMedico';
    return this._http.post(urlAPI,{
      "email": correo,
      "pass": password,

    })
  }

  RegistrarMedico(Nombre:string,Apellido:string,password:string, email:string,Chas:string){
    let urlAPI = 'http://localhost:3003/regisMedico';
    return this._http.post(urlAPI,{
      "Nombre": Nombre,
      "Apellido": Apellido,
      "password": password,
      "email": email,
      "Chas": Chas
    })
  }

  registrarCliente(Nombre:string,Apellido:string,password:string, email:string, genero:string, fecha:string,foto:string, Chas:string){
    let urlAPI = 'http://localhost:3003/regisCliente';
    return this._http.post(urlAPI,{
      "Nombre": Nombre,
      "Apellido": Apellido,
      "password": password,
      "email": email,
      "genero": genero,
      "FechaNac": fecha,
      "fotografia": foto,
      "Chas": Chas
    })
  }

  ActivarCuenta(correo:string,codigo:string,tipo:string){
    let urlAPI = 'http://localhost:3003/authCuenta';
    return this._http.post(urlAPI,{
      "email": correo,
      "codigo": codigo,
      "tipo":tipo
    })
  }

  CorreoCuenta(email:string,codigo:string,nombre:string,password:string){
    let urlAPI = 'http://localhost:3003/Correo';
    return this._http.post(urlAPI,{
      "email": email,
      "codigo": codigo,
      "nombre":nombre,
      "password":password,
    })
  }

  Contactanos(nombre:string,asunto:string,correo:string){
    let urlAPI = 'http://localhost:3003/Respuesta';
    return this._http.post(urlAPI,{
      "nombre": nombre,
      "asunto": asunto,
      "correo":correo,
    })
  }

  InfoContacanos(nombre:string,asunto:string,correo:string,mensaje:string){
    let urlAPI = 'http://localhost:3003/MensajeC';
    return this._http.post(urlAPI,{
      "nombre": nombre,
      "asunto": asunto,
      "correo":correo,
      "mensaje":mensaje
    })
  }

  ActualizarCliente(user:number,Nombre:string,Apellido:string,
    password:string,email:string,genero:string,FechaNac:string,fotografia:string){
    let urlAPI = 'http://localhost:3003/UpdateCliente';
    return this._http.post(urlAPI,{
      "user": user,
      "Nombre": Nombre,
      "Apellido":Apellido,
      "password":password,
      "email":email,
      "genero":genero,
      "FechaNac":FechaNac,
      "fotografia":fotografia

    })
  }

  ActualizarMedico(user:number,Nombre:string,Apellido:string,
    password:string,email:string){
    let urlAPI = 'http://localhost:3003/UpdateMedico';
    return this._http.post(urlAPI,{
      "User": user,
      "Nombre": Nombre,
      "Apellido":Apellido,
      "password":password,
      "email":email
    })
  }
  //Servicios para ficha medica
  ObtenerFicha(user:number){
    let urlAPI = 'http://localhost:3003/ExisteFicha';
    return this._http.post(urlAPI,{
      "External_ID_Cliente": user
    })
  }
  RegistrarFicha(External_ID_Cliente:number,Estatura:number,
    Ultimo_Control:string,Peso:number,Grupo_Sanguineo:string,
    Medicamente1:string,Medicamente2:string,Medicamente3:string,
    Medicamente4:string,Medicamente5:string,Intolerancia1:string,
    Intolerancia2:string,Intolerancia3:string,Cirujias:number,
    Enfermedad1:string,Enfermedad2:string,Enfermedad3:string
    ){
    let urlAPI = 'http://localhost:3003/regisFicha';
    return this._http.post(urlAPI,{
      "External_ID_Cliente": External_ID_Cliente,
      "Estatura":Estatura,
      "Ultimo_Control":Ultimo_Control,
      "Peso":Peso,
      "Grupo_Sanguineo":Grupo_Sanguineo,
      "Medicamente1":Medicamente1,
      "Medicamente2":Medicamente2,
      "Medicamente3":Medicamente3,
      "Medicamente4":Medicamente4,
      "Medicamente5":Medicamente5,
      "Intolerancia1":Intolerancia1,
      "Intolerancia2":Intolerancia2,
      "Intolerancia3":Intolerancia3,
      "Cirujias":Cirujias,
      "Enfermedad1":Enfermedad1,
      "Enfermedad2":Enfermedad2,
      "Enfermedad3":Enfermedad3
    })
  }

  ActualizarFicha(External_ID_Ficha:number,External_ID_Cliente:number,Estatura:number,
    Ultimo_Control:string,Peso:number,Grupo_Sanguineo:string,
    Medicamente1:string,Medicamente2:string,Medicamente3:string,
    Medicamente4:string,Medicamente5:string,Intolerancia1:string,
    Intolerancia2:string,Intolerancia3:string,Cirujias:number,
    Enfermedad1:string,Enfermedad2:string,Enfermedad3:string
    ){
    let urlAPI = 'http://localhost:3003/UpdateFicha';
    return this._http.post(urlAPI,{
      "External_ID_Ficha":External_ID_Ficha,
      "External_ID_Cliente": External_ID_Cliente,
      "Estatura":Estatura,
      "Ultimo_Control":Ultimo_Control,
      "Peso":Peso,
      "Grupo_Sanguineo":Grupo_Sanguineo,
      "Medicamente1":Medicamente1,
      "Medicamente2":Medicamente2,
      "Medicamente3":Medicamente3,
      "Medicamente4":Medicamente4,
      "Medicamente5":Medicamente5,
      "Intolerancia1":Intolerancia1,
      "Intolerancia2":Intolerancia2,
      "Intolerancia3":Intolerancia3,
      "Cirujias":Cirujias,
      "Enfermedad1":Enfermedad1,
      "Enfermedad2":Enfermedad2,
      "Enfermedad3":Enfermedad3
    })
  }

  ExisteMedico(email:string){
    let urlAPI = 'http://localhost:6003/CorreoMedico';
    return this._http.post(urlAPI,{
      "email": email
    })
  }
  ExisteCliente(email:string){
    let urlAPI = 'http://localhost:6003/CorreoCliente';
    return this._http.post(urlAPI,{
      "email": email
    })
  }
  ExisteAsignacionMedica(External_ID_Cliente:number,External_ID_Medico:number){
    let urlAPI = 'http://localhost:6003/ExisteAsignacionMedica';
    return this._http.post(urlAPI,{
      "External_ID_Cliente": External_ID_Cliente,
      "External_ID_Medico":External_ID_Medico
    })
  }
  AsignacionMedica(External_ID_Cliente:number,External_ID_Medico:number){
    let urlAPI = 'http://localhost:6003/AsignacionMedica';
    return this._http.post(urlAPI,{
      "External_ID_Cliente": External_ID_Cliente,
      "External_ID_Medico":External_ID_Medico
    })
  }
  GuardarMensaje(Internal_ID_Asignacion:number,Mensaje:string,Emisor:string,EmailEmisor:string,EmailReceptor:string,Asunto:string)
  :Observable<any>{
    let urlAPI = 'http://localhost:6003/AgregarMensaje';
    return this._http.post(urlAPI,{
      "Internal_ID_Asignacion": Internal_ID_Asignacion,
      "Mensaje":Mensaje,
      "Emisor":Emisor,
      "EmailEmisor": EmailEmisor,
      "EmailReceptor":EmailReceptor,
      "Asunto":Asunto

    }).pipe(
      tap(()=>{
        this._refresh$.next();
      })
    )
  }
  Mensajes(Email:string){
    let urlAPI = 'http://localhost:6003/MostrarMensajes';
    return this._http.post(urlAPI,{
      "Email": Email
    })
  }
  IdHematologa(Nombre:string){
    let urlAPI = 'http://localhost:5003/idHematologia';
    return this._http.post(urlAPI,{
      "Nombre": Nombre
    })
  }
  RegistrarHematologa(Internal_ID_Hematologia:number,External_ID_Cliente:number,Cantidad:number,Fecha_Registro:string)
  :Observable<any>{
    let urlAPI = 'http://localhost:5003/RegistrarHematologia';
    return this._http.post(urlAPI,{
      "Internal_ID_Hematologia": Internal_ID_Hematologia,
      "External_ID_Cliente": External_ID_Cliente,
      "Cantidad": Cantidad,
      "Fecha_Registro": Fecha_Registro
    }).pipe(
      tap(()=>{
        this._refresh2$.next();
      })
    )
  }

  ObtenerHematologiasTotales(External_ID_Cliente:number){
    let urlAPI = 'http://localhost:5003/MostrarHematologias';
    return this._http.post(urlAPI,{
      "External_ID_Cliente": External_ID_Cliente
    })
  }

  ObtenerNombreHematologias(){
    let urlAPI = 'http://localhost:5003/Hematologias';
    return this._http.post(urlAPI,{
      "Nombre":"Nombre"
    })
  }

  verHematologias(External_ID_Cliente:number,Internal_ID_Hematologia:number,Fecha_Registro:string,Fecha_Registro2:string){
    let urlAPI = 'http://localhost:5003/BuscarHematologia';
    return this._http.post(urlAPI,{
      "External_ID_Cliente": External_ID_Cliente,
      "Internal_ID_Hematologia":Internal_ID_Hematologia,
      "Fecha_Registro": Fecha_Registro,
      "Fecha_Registro2":Fecha_Registro2
    })
  }

  IdHematologaReporte(Nombre:string){
    let urlAPI = 'http://localhost:8003/idHematologia';
    return this._http.post(urlAPI,{
      "Nombre": Nombre
    })
  }


  verHematologiasReportes(External_ID_Cliente:number,Internal_ID_Hematologia:number,Fecha_Registro:string,Fecha_Registro2:string){
    let urlAPI = 'http://localhost:8003/BuscarHematologia';
    return this._http.post(urlAPI,{
      "External_ID_Cliente": External_ID_Cliente,
      "Internal_ID_Hematologia":Internal_ID_Hematologia,
      "Fecha_Registro": Fecha_Registro,
      "Fecha_Registro2":Fecha_Registro2
    })
  }

  ObtenerNombreHematologiasReportes(){
    let urlAPI = 'http://localhost:8003/Hematologias';
    return this._http.post(urlAPI,{
      "Nombre":"Nombre"
    })
  }

  ObtenerPrePost(External_ID_Cliente:number,Fecha_Registro:string,Fecha_Registro2:string){
    let urlAPI = 'http://localhost:8003/BuscarPrePost';
    return this._http.post(urlAPI,{
      "External_ID_Cliente": External_ID_Cliente,
      "Fecha_Registro": Fecha_Registro,
      "Fecha_Registro2":Fecha_Registro2
    })
  }
  ObtenerTotalGlucosa(External_ID_Cliente:number,Fecha_Registro:string,Fecha_Registro2:string){
    let urlAPI = 'http://localhost:8003/TotalGlucosa';
    return this._http.post(urlAPI,{
      "External_ID_Cliente": External_ID_Cliente,
      "Fecha_Registro": Fecha_Registro,
      "Fecha_Registro2":Fecha_Registro2
    })
  }

  ObtenerDosColesterol(External_ID_Cliente:number,Fecha_Registro:string,Fecha_Registro2:string){
    let urlAPI = 'http://localhost:8003/BuscarColesterol';
    return this._http.post(urlAPI,{
      "External_ID_Cliente": External_ID_Cliente,
      "Fecha_Registro": Fecha_Registro,
      "Fecha_Registro2":Fecha_Registro2
    })
  }
  verHematologiasReportes2(External_ID_Cliente:number,Internal_ID_Hematologia:number){
    let urlAPI = 'http://localhost:8003/BuscarHematologia2';
    return this._http.post(urlAPI,{
      "External_ID_Cliente": External_ID_Cliente,
      "Internal_ID_Hematologia":Internal_ID_Hematologia
    })
  }
  ObtenerPrePost2(External_ID_Cliente:number){
    let urlAPI = 'http://localhost:8003/BuscarPrePost2';
    return this._http.post(urlAPI,{
      "External_ID_Cliente": External_ID_Cliente
    })
  }
  ObtenerTotalGlucosa2(External_ID_Cliente:number){
    let urlAPI = 'http://localhost:8003/TotalGlucosa2';
    return this._http.post(urlAPI,{
      "External_ID_Cliente": External_ID_Cliente
    })
  }
  ObtenerDosColesterol2(External_ID_Cliente:number){
    let urlAPI = 'http://localhost:8003/BuscarColesterol2';
    return this._http.post(urlAPI,{
      "External_ID_Cliente": External_ID_Cliente
    })
  }
 
  //MICROSERVICIO MEDICOS
  ObtenerPacientes(External_ID_Medico:number){
    let urlAPI = 'http://localhost:7003/MisPacientes';
    return this._http.post(urlAPI,{
      "External_ID_Medico": External_ID_Medico
    })
  }
  DatosPaciente(External_ID_Cliente:number){
    let urlAPI = 'http://localhost:7003/DatosPaciente';
    return this._http.post(urlAPI,{
      "External_ID_Cliente": External_ID_Cliente
    })
  }
  Relacion(External_ID_Medico:number,Email:string){
    let urlAPI = 'http://localhost:7003/Relacion';
    return this._http.post(urlAPI,{
      "External_ID_Medico": External_ID_Medico,
      "Email":Email
    })
  }
  CodigoPaciente(Email:string){
    let urlAPI = 'http://localhost:7003/CodigoPaciente';
    return this._http.post(urlAPI,{
      "Email":Email
    })
  }
  Asignacion(External_ID_Cliente:number,External_ID_Medico:number):Observable<any>{
    let urlAPI = 'http://localhost:7003/Asignacion';
    return this._http.post(urlAPI,{
      "External_ID_Cliente":External_ID_Cliente,
      "External_ID_Medico": External_ID_Medico
    }).pipe(
      tap(()=>{
        this._refresh3$.next();
      })
    )
  }
}
