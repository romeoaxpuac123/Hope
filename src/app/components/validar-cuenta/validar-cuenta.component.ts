import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CanActivate, Router } from '@angular/router';
import {MicroserviciosService} from '../../services/microservicios.service';
import {AlertasComponent} from '../alertas/alertas.component';
@Component({
  selector: 'app-validar-cuenta',
  templateUrl: './validar-cuenta.component.html',
  styleUrls: ['./validar-cuenta.component.css']
})
export class ValidarCuentaComponent implements OnInit {
  public Alamars:AlertasComponent = new AlertasComponent;
  public informacion:any = [];
  public mensaje:string = "";
  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private Microservicio: MicroserviciosService,
  ) { }

  ngOnInit(): void {
    this.informacion = this.route.snapshot.paramMap.get('info');
    var resultados = this.informacion.split('&&');
    console.log("Correo:" + resultados[0]);
    console.log("CHAS:" + resultados[1]);
    console.log("Tipo:" + resultados[2]);
    console.log("inoffffffffff");
    console.log(this.informacion);
    console.log("Microservicio activacion");
     
    this.Microservicio.ActivarCuenta(resultados[0],resultados[1],resultados[2]).subscribe((resp:any)=>{
      console.log(resp.msg);
     
      if(resp.msg ==true){
        this.mensaje = "Gracias, su cuenta ha sido validada con éxito"       
        
      }else{
        this.mensaje = "Esta cuenta ha sido validada con anterioridad"+ 
      " o los datos de validación son incorrectos"; 
      } 
      
    });
  }
 
  Inicio(){
    this.Alamars.Mensaje_De_Espera();
    window.location.href='http://35.225.195.5:4200/';
  }

}
