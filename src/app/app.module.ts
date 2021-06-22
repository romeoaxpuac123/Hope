import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';

import {FormsModule} from '@angular/forms';
import { PortalComponent } from './components/portal/portal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PesentacionComponent } from './components/pesentacion/pesentacion.component';
import { CopyrightComponent } from './components/copyright/copyright.component';
import { Encabezado1Component } from './components/encabezado1/encabezado1.component';
import { MenuComponent } from './components/menu/menu.component';
import { Encabezado2Component } from './components/encabezado2/encabezado2.component';
import { AlertasComponent } from './components/alertas/alertas.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';
import { HematologiaComponent } from './components/hematologia/hematologia.component';
import { FichaComponent } from './components/ficha/ficha.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MicroserviciosService} from './services/microservicios.service';
import { ValidarCuentaComponent } from './components/validar-cuenta/validar-cuenta.component';
// Import pdfmake-wrapper and the fonts to use
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { ReportePacienteComponent } from './components/reporte-paciente/reporte-paciente.component'; // fonts provided for pdfmake

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistroComponent,
    PortalComponent,
    NavbarComponent,
    PesentacionComponent,
    CopyrightComponent,
    Encabezado1Component,
    MenuComponent,
    Encabezado2Component,
    AlertasComponent,
    PerfilComponent,
    MensajesComponent,
    HematologiaComponent,
    FichaComponent,
    ReportesComponent,
    ValidarCuentaComponent,
    PacientesComponent,
    ReportePacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [MicroserviciosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
