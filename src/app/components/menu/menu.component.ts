import { Component, OnInit } from '@angular/core';
import {LocalService} from '../../services/local.service';
import {AlertasComponent} from '../alertas/alertas.component'
@Component({
  selector: 'app-menu',
  templateUrl:  './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public VerMenu:boolean=false;
  public NombreUsuario:string = "";
  public FotoPerfil:string="";
  public EsMedico:boolean = true;
  public Alamars:AlertasComponent = new AlertasComponent;
  constructor(
    private Almacenamiento:LocalService,
  ) 
  {
    
    
    
  }

  ngOnInit(): void {
    this.EsMedico = this.TipoDeMenu();
    var Info = this.Almacenamiento.ObtenerInformacionLS("Usuario");
    var o = JSON.parse(Info);
    this.NombreUsuario = o.name;
    if(this.EsMedico==true){
      this.FotoPerfil = "https://github.com/romeoaxpuac123/MisImagenes/blob/main/Diabetic/Iconos/Perfil.png?raw=true";
    }else{
      this.FotoPerfil = o.Foto;
    }
  }
  ExpandirMenu() {
    let tipo: any = document.getElementById('sidemenu');
    let cuerpo: any = document.getElementById('cuerpo');
    let cabeza: any = document.getElementById('Cabeza');
    let titulo: any = document.getElementById('menu-btn');
    if (tipo.className == "menu-collapsed") {
      tipo.className = "menu-expanded";
      cuerpo.style = "margin-left: 300px;"
      cabeza.firstChild.style = "margin-left: 300px;"
      titulo.title="Esconder Menú";
      this.VerMenu = true;      
    } else {
      tipo.className = "menu-collapsed";
      cuerpo.style = "margin-left: 60px;"
      cabeza.firstChild.style = "margin-left: 60px;"
      titulo.title="Desplegar Menú";
      this.VerMenu = false;
    }
  }
  SesionOff(){
    this.Almacenamiento.LimpiarLS();
    this.Alamars.Mensaje_De_Confirmacion("Fin de sesión","Gracias por utilizar Hope Diabetic")
  }
  TipoDeMenu():boolean{
    var Info = this.Almacenamiento.ObtenerInformacionLS("Tipo");
    
    var o = JSON.parse(Info);
    if(o.TipoUsuario == 'Medico'){
        return true;
    }
    return false;
  }


}
