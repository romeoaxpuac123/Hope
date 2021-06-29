import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {RegistroComponent} from './components/registro/registro.component';
import {PortalComponent} from './components/portal/portal.component';
import {PerfilComponent} from './components/perfil/perfil.component';
import {MensajesComponent} from './components/mensajes/mensajes.component';
import {HematologiaComponent} from './components/hematologia/hematologia.component';
import {FichaComponent} from './components/ficha/ficha.component';
import {ReportesComponent} from './components/reportes/reportes.component';
import {ValidarCuentaComponent} from './components/validar-cuenta/validar-cuenta.component';
import {PacientesComponent} from './components/pacientes/pacientes.component';
import {ReportePacienteComponent} from './components/reporte-paciente/reporte-paciente.component';
import {RecomendacionesComponent} from './components/recomendaciones/recomendaciones.component';
const routes: Routes = [
  {
    path:'',
    component: PortalComponent
  }, 
  {
    path:'Portal',
    component: PortalComponent
  }, 
  {
    path:'Login',
    component: LoginComponent  
  },
  {
    path:'Home',
    component: HomeComponent  
  },
  {
    path:'Registro',
    component: RegistroComponent 
  },
  {
    path:'Perfil',
    component: PerfilComponent 
  },
  {
    path:'Mensaje',
    component: MensajesComponent 
  },
  {
    path:'Hematologia',
    component: HematologiaComponent 
  },
  {
    path:'Ficha',
    component: FichaComponent 
  },
  {
    path:'Reportes',
    component: ReportesComponent 
  },
  {
    path:'Cuenta/:info',
    component: ValidarCuentaComponent
  },
  {
    path:'Pacientes',
    component: PacientesComponent 
  },
  { 
    path:'ReportePaciente',
    component: ReportePacienteComponent
  },
  { 
    path:'Recomendaciones',
    component: RecomendacionesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


