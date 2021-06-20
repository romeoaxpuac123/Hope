import { Component, OnInit, ɵConsole } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MicroserviciosService } from '../../services/microservicios.service';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';
import { AlertasComponent } from '../alertas/alertas.component';
Chart.register(...registerables);
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  public Alamars: AlertasComponent = new AlertasComponent;
  chart: any = [];
  FechasIndiviaduales: any = [];
  ValoresIndivuales: any = [];
  DatosMinimosIndividuales: any = [];
  DatosMaximosIndividuales: any = [];
  //Para Hemoglobina
  DatosHEMOGLOBINAX: any = [];
  DatosHEMOGLOBINAY: any = [];
  chartHEMOGLOBINA: any = [];
  //PARA CREATININA
  DatosCREATININAX: any = [];
  DatosCREATININAY: any = [];
  chartCREATININA: any = [];
  //Para GLUCOSA PRE-PRANDRIAL
  DatosPRE_PRANDRIALX: any = [];
  DatosPRE_PRANDRIALY: any = [];
  chartPRE_PRANDRIAL: any = [];
  //Para GLUCOSA POST-PRANDRIAL
  DatosPOST_PRANDRIALX: any = [];
  DatosPOST_PRANDRIALY: any = [];
  chartPOST_PRANDRIAL: any = [];
  //Para GLUCOSA POST y PRE -PRANDRIAL
  DatosPOST_PRE_PRANDRIALX: any = [];
  DatosPOST_PRE_PRANDRIALY1: any = [];
  DatosPOST_PRE_PRANDRIALY2: any = [];
  chartPOST_PRE_PRANDRIAL: any = [];
  //Para GLUCOSA POST-PRANDRIAL
  DatosGlucosaTotalX: any = [];
  DatosGlucosaTotalY: any = [];
  chartGlucosaTotal: any = [];
  //Para colesterol totol
  DatosColesterolTotalX: any = [];
  DatosColesterolTotalY: any = [];
  chartColesterolTotal: any = [];
  //Para colesterol HDL y LDL
  DatosColesterolHDLX: any = [];
  DatosColesterolHDLY: any = [];
  DatosColesterolLDLY: any = [];
  chartColesterolHDL: any = [];
  //Para TRIGLICERIDOS
  DatosTRIGLICERIDOSX: any = [];
  DatosTRIGLICERIDOSY: any = [];
  chartTRIGLICERIDOS: any = [];
  //Para LIPIDOS
  DatosLIPIDOSX: any = [];
  DatosLIPIDOSY: any = [];
  chartLIPIDOS: any = [];
  //Para LIPIDOS
  DatosASPARTATOX: any = [];
  DatosASPARTATOY: any = [];
  chartASPARTATO: any = [];
  //Para LIPIDOS
  DatosALANINOX: any = [];
  DatosALANINOY: any = [];
  chartALANINO: any = [];
  //fin variables graficas
  public TipoHemalogias: any = [];
  public RangoDeFechas: any = [];
  //Variables para metodos
  public OnnSesion: boolean = false;
  public EsMedicoA: boolean = false;
  public CodigoUsuarioH: number = 0;
  public HematologiABuscar: string = "";
  public FechaInicio: string = "";
  public FechaFinal: string = "";
  // para grafica grande
  public HematologiABuscarGENERAL: string = "";
  public codigoHematologiaGENERAL: number = 0;
  public FechaInicioGENERAL: string = "";
  public FechaFinalGENERAL: string = "";

  constructor(
    private Microservicio: MicroserviciosService,
    private Almacenamiento: LocalService,
    private navegacion: Router,
  ) {

    this.RangoDeFechas = [
      "Ultimo día", "Ultimos cinco días", "Ultima Semana", "Ultimas dos semanas", "Ultimo mes", "Ultimos tres meses"
    ];
  }

  ngOnInit(): void {
    this.OnnSesion = this.SesionOnn();
    if (this.OnnSesion == false) {
      this.Alamars.Mensaje_De_Error("Usuario sin permisos", "Para hacer uso de esta función inice sesión");
      this.navegacion.navigate(['']);
    } else {
      if (this.EsMedico() == true) {
        this.Alamars.Mensaje_De_Error("Usuario sin permisos", "Para hacer uso de esta función inice sesión");
        this.navegacion.navigate(['']);
      } else {
        //Metodo para ver todas tus hematologias
        this.ObtenerNombreHematologias();

        this.VerReporteIndividualINICIO();
        //Gracias individuales :D
        var Info = this.Almacenamiento.ObtenerInformacionLS("Usuario");
        var o = JSON.parse(Info);
        this.CodigoUsuarioH = o.user
        this.ActualizarHEMOGLOBINAINICIO(this.CodigoUsuarioH);
        this.ActualizarCREATININAINICIO(this.CodigoUsuarioH);
        this.ActualizarGLUCOSAPRE_PRANDRIALINICIO(this.CodigoUsuarioH);
        this.ActualizarGLUCOSAPOST_PRANDRIALINICIO(this.CodigoUsuarioH);
        this.ActualizarGLUCOSAPOST_PESTINICIO(this.CodigoUsuarioH);
        this.ActualizarGLUCOSA_TOTALINICIO(this.CodigoUsuarioH);
        this.ActualizarCOLESTEROL_TOTALINICIO(this.CodigoUsuarioH);
        this.ActualizarCOLESTEROL_HDL_LDLINICIO(this.CodigoUsuarioH);
        this.ActualizarTRIGLICERIDOSINICIO(this.CodigoUsuarioH);
        this.ActualizarLIPIDOSINICIO(this.CodigoUsuarioH);
        this.ActualizarASPARTATOINICIO(this.CodigoUsuarioH);
        this.ActualizarALANINOINICIO(this.CodigoUsuarioH);

      }
    }





  }

  VerReporteIndividual() {
    if (this.HematologiABuscarGENERAL == "" || this.FechaFinalGENERAL == "" || this.FechaInicioGENERAL == "") {
      this.Alamars.Mensaje_De_Error("ERROR", "La fecha inicial debe ser inferior a la final \no la hematología a buscar no se encuentra en nuestro sistema");

    } else {
      this.chart.destroy();
      this.FechasIndiviaduales = [];
      this.ValoresIndivuales = [];
      this.DatosMaximosIndividuales = [];
      this.DatosMinimosIndividuales = [];
      this.Microservicio.IdHematologaReporte(this.HematologiABuscarGENERAL).subscribe((resp: any) => {
        if (resp.msg == true) {
          var identificadorH = resp.info[0].Internal_ID_Hematologia;
          var ValMaximo = resp.info[0].Minimo;
          var ValMinimo = resp.info[0].Maximo;
          var Info = this.Almacenamiento.ObtenerInformacionLS("Usuario");
          var o = JSON.parse(Info);
          this.CodigoUsuarioH = o.user;
          var sexoU = o.Genero;
          if (sexoU.toString() == "Masculino") {
            if (this.HematologiABuscarGENERAL.toString() == "COLESTEROL HDL") {
              ValMaximo = 35;
              ValMinimo = 0;
            } else if (this.HematologiABuscarGENERAL.toString() == "CREATININA") {
              ValMaximo = 1.4;
              ValMinimo = 0.9;
            }
          } else {
            if (this.HematologiABuscarGENERAL.toString() == "COLESTEROL HDL") {
              ValMaximo = 45;
              ValMinimo = 0;
            } else if (this.HematologiABuscarGENERAL.toString() == "CREATININA") {
              ValMaximo = 1.2;
              ValMinimo = 0.8;
            }
          }
          this.Microservicio.verHematologiasReportes(this.CodigoUsuarioH, identificadorH, this.FechaInicioGENERAL, this.FechaFinalGENERAL).subscribe((resp: any) => {
            if (resp.msg == true) {
              let titulo = this.HematologiABuscarGENERAL;
              for (let MensajeRecibido of resp.info) {
                var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
                var ValorNuevo = MensajeRecibido.Cantidad;
                this.FechasIndiviaduales.push(FechaNueva);
                this.ValoresIndivuales.push(ValorNuevo);
                this.DatosMaximosIndividuales.push(ValMaximo);
                this.DatosMinimosIndividuales.push(ValMinimo);
              }


              if (this.DatosMinimosIndividuales[0] == 0) {
                this.chart = new Chart('GraficaIndividual', {
                  type: 'bar',
                  data: {
                    labels: this.FechasIndiviaduales,
                    datasets: [
                      {
                        label: titulo,
                        data: this.ValoresIndivuales,
                        backgroundColor: [
                          '#FDF63E'
                        ],
                        borderColor: [
                          '#FDF63E'
                        ],
                        borderWidth: 1
                      },
                      {
                        label: 'Valor Máximo',
                        data: this.DatosMaximosIndividuales,
                        backgroundColor: [
                          '#27C3E4'
                        ],
                        borderColor: [
                          '#27C3E4'
                        ],
                        borderWidth: 1
                      }


                    ]
                  },
                  options: {
                    responsive: true,
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }
                });
              } else {
                this.chart = new Chart('GraficaIndividual', {
                  type: 'bar',
                  data: {
                    labels: this.FechasIndiviaduales,
                    datasets: [
                      {
                        label: 'Valor Minimo',
                        data: this.DatosMinimosIndividuales,
                        backgroundColor: [
                          '#F95D70'
                        ],
                        borderColor: [
                          '#F95D70'
                        ],
                        borderWidth: 1
                      },
                      {
                        label: titulo,
                        data: this.ValoresIndivuales,
                        backgroundColor: [
                          '#FDF63E'
                        ],
                        borderColor: [
                          '#FDF63E'
                        ],
                        borderWidth: 1
                      },
                      {
                        label: 'Valor Máximo',
                        data: this.DatosMaximosIndividuales,
                        backgroundColor: [
                          '#27C3E4'
                        ],
                        borderColor: [
                          '#27C3E4'
                        ],
                        borderWidth: 1
                      }


                    ]
                  },
                  options: {
                    responsive: true,
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }
                });
              }
            } else {
              let titulo = this.HematologiABuscarGENERAL;
              if (this.DatosMinimosIndividuales[0] == 0) {
                this.chart = new Chart('GraficaIndividual', {
                  type: 'bar',
                  data: {
                    labels: this.FechasIndiviaduales,
                    datasets: [
                      {
                        label: titulo,
                        data: this.ValoresIndivuales,
                        backgroundColor: [
                          '#FDF63E'
                        ],
                        borderColor: [
                          '#FDF63E'
                        ],
                        borderWidth: 1
                      },
                      {
                        label: 'Valor Máximo',
                        data: this.DatosMaximosIndividuales,
                        backgroundColor: [
                          '#27C3E4'
                        ],
                        borderColor: [
                          '#27C3E4'
                        ],
                        borderWidth: 1
                      }


                    ]
                  },
                  options: {
                    responsive: true,
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }
                });
              } else {
                this.chart = new Chart('GraficaIndividual', {
                  type: 'bar',
                  data: {
                    labels: this.FechasIndiviaduales,
                    datasets: [
                      {
                        label: 'Valor Minimo',
                        data: this.DatosMinimosIndividuales,
                        backgroundColor: [
                          '#F95D70'
                        ],
                        borderColor: [
                          '#F95D70'
                        ],
                        borderWidth: 1
                      },
                      {
                        label: titulo,
                        data: this.ValoresIndivuales,
                        backgroundColor: [
                          '#FDF63E'
                        ],
                        borderColor: [
                          '#FDF63E'
                        ],
                        borderWidth: 1
                      },
                      {
                        label: 'Valor Máximo',
                        data: this.DatosMaximosIndividuales,
                        backgroundColor: [
                          '#27C3E4'
                        ],
                        borderColor: [
                          '#27C3E4'
                        ],
                        borderWidth: 1
                      }


                    ]
                  },
                  options: {
                    responsive: true,
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }
                });
              }
            }

          });
        }
      });

    }


  }
  Imprimir() {
    console.log("Codigo para crear PDF");
  }
  ActualizarReprotes() {
    console.log("Codigo actualizar XD");
    let date: Date = new Date("2019-01-16");
    var Fecha1 = new Date(this.FechaInicio);
    var Fecha2 = new Date(this.FechaFinal);
    console.log("HEMATOLOGIAS a buscar BUSCANDO XD->" + Fecha1);
    console.log("HEMATOLOGIAS a buscar BUSCANDO XD->" + Fecha2);
    console.log("HEMATOLOGIAS a buscar BUSCANDO XD->" + this.FechaInicio);
    console.log("HEMATOLOGIAS a buscar BUSCANDO XD->" + this.FechaFinal);
    var Info = this.Almacenamiento.ObtenerInformacionLS("Usuario");
    var o = JSON.parse(Info);
    this.CodigoUsuarioH = o.user;
    if (Fecha1 > Fecha2) {
      this.Alamars.Mensaje_De_Error("Datos incorrectos", "La fecha final debe ser superior o igual a la fecha de inicio");

    } else {
      if (this.FechaInicio == "" || this.FechaFinal == "") {
        this.Alamars.Mensaje_De_Error("Datos incorrectos", "Las fechas de busquedas deben tener un valor");

      } else {
        this.ActualizarHEMOGLOBINA(this.FechaInicio, this.FechaFinal, this.CodigoUsuarioH);
        this.ActualizarCREATININA(this.FechaInicio, this.FechaFinal, this.CodigoUsuarioH);
        this.ActualizarGLUCOSAPRE_PRANDRIAL(this.FechaInicio, this.FechaFinal, this.CodigoUsuarioH);
        this.ActualizarGLUCOSAPOST_PRANDRIAL(this.FechaInicio, this.FechaFinal, this.CodigoUsuarioH);
        this.ActualizarGLUCOSAPOST_PEST(this.FechaInicio, this.FechaFinal, this.CodigoUsuarioH);
        this.ActualizarGLUCOSA_TOTAL(this.FechaInicio, this.FechaFinal, this.CodigoUsuarioH);
        this.ActualizarCOLESTEROL_TOTAL(this.FechaInicio, this.FechaFinal, this.CodigoUsuarioH);
        this.ActualizarCOLESTEROL_HDL_LDL(this.FechaInicio, this.FechaFinal, this.CodigoUsuarioH);
        this.ActualizarTRIGLICERIDOS(this.FechaInicio, this.FechaFinal, this.CodigoUsuarioH);
        this.ActualizarLIPIDOS(this.FechaInicio, this.FechaFinal, this.CodigoUsuarioH);
        this.ActualizarASPARTATO(this.FechaInicio, this.FechaFinal, this.CodigoUsuarioH);
        this.ActualizarALANINO(this.FechaInicio, this.FechaFinal, this.CodigoUsuarioH);
      }

    }

  }
  //Metodos individuales para cada gráfica
  ActualizarHEMOGLOBINA(fecha1: string, fecha2: string, usuario: number) {
    this.chartHEMOGLOBINA.destroy();
    this.DatosHEMOGLOBINAX = [];
    this.DatosHEMOGLOBINAY = [];

    this.Microservicio.verHematologiasReportes(usuario, 1, fecha1, fecha2).subscribe((resp: any) => {
      console.log(resp.info);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorNuevo = MensajeRecibido.Cantidad;
          this.DatosHEMOGLOBINAX.push(FechaNueva);
          this.DatosHEMOGLOBINAY.push(ValorNuevo);
        }
        this.chartHEMOGLOBINA = new Chart('GraficaHEMOGLOBINA', {
          type: "line",
          data: {
            labels: this.DatosHEMOGLOBINAX,
            datasets: [{
              label: 'Hemoglobina',
              backgroundColor: "#F95D70",
              borderColor: "#F95D70",
              data: this.DatosHEMOGLOBINAY
            }]
          },
        });
      } else {
        this.chartHEMOGLOBINA = new Chart('GraficaHEMOGLOBINA', {
          type: "line",
          data: {
            labels: this.DatosHEMOGLOBINAX,
            datasets: [{
              label: 'Hemoglobina',
              backgroundColor: "#F95D70",
              borderColor: "#F95D70",
              data: this.DatosHEMOGLOBINAY
            }]
          },
        });
      }
    });


  }
  ActualizarCREATININA(fecha1: string, fecha2: string, usuario: number) {
    this.chartCREATININA.destroy();
    this.DatosCREATININAX = [];
    this.DatosCREATININAY = [];
    this.Microservicio.verHematologiasReportes(usuario, 4, fecha1, fecha2).subscribe((resp: any) => {
      console.log(resp.info);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorNuevo = MensajeRecibido.Cantidad;
          this.DatosCREATININAX.push(FechaNueva);
          this.DatosCREATININAY.push(ValorNuevo);
        }
        this.chartCREATININA = new Chart('GraficaCREATININA', {
          type: "line",
          data: {
            labels: this.DatosCREATININAX,
            datasets: [{
              label: 'Creatinina',
              backgroundColor: "#69DD4C",
              borderColor: "#69DD4C",
              data: this.DatosCREATININAY
            }]
          },
        });
      } else {
        this.chartCREATININA = new Chart('GraficaCREATININA', {
          type: "line",
          data: {
            labels: this.DatosCREATININAX,
            datasets: [{
              label: 'Creatinina',
              backgroundColor: "#69DD4C",
              borderColor: "#69DD4C",
              data: this.DatosCREATININAY
            }]
          },
        });
      }
    });


  }
  ActualizarGLUCOSAPRE_PRANDRIAL(fecha1: string, fecha2: string, usuario: number) {
    //Acá va la gráfica individual de PREPANDRIAL
    this.chartPRE_PRANDRIAL.destroy();
    this.DatosPRE_PRANDRIALX = [];
    this.DatosPRE_PRANDRIALY = [];
    this.Microservicio.verHematologiasReportes(usuario, 2, fecha1, fecha2).subscribe((resp: any) => {
      console.log(resp.info);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorNuevo = MensajeRecibido.Cantidad;
          this.DatosPRE_PRANDRIALX.push(FechaNueva);
          this.DatosPRE_PRANDRIALY.push(ValorNuevo);
        }
        this.chartPRE_PRANDRIAL = new Chart('GraficaGLUCOSAPRE_PRANDRIAL', {
          type: "line",
          data: {
            labels: this.DatosPRE_PRANDRIALX,
            datasets: [{
              label: 'Glucosa Pre-Prandrial',
              backgroundColor: "#FDF63E",
              borderColor: "#FDF63E",
              data: this.DatosPRE_PRANDRIALY
            }]
          },
        });
      } else {
        this.chartPRE_PRANDRIAL = new Chart('GraficaGLUCOSAPRE_PRANDRIAL', {
          type: "line",
          data: {
            labels: this.DatosPRE_PRANDRIALX,
            datasets: [{
              label: 'Glucosa Pre-Prandrial',
              backgroundColor: "#FDF63E",
              borderColor: "#FDF63E",
              data: this.DatosPRE_PRANDRIALY
            }]
          },
        });
      }
    });

  }
  ActualizarGLUCOSAPOST_PRANDRIAL(fecha1: string, fecha2: string, usuario: number) {
    this.chartPOST_PRANDRIAL.destroy();
    //Acá va la gráfica individual de postPANDRIAL
    this.DatosPOST_PRANDRIALX = [];
    this.DatosPOST_PRANDRIALY = [];
    this.Microservicio.verHematologiasReportes(usuario, 3, fecha1, fecha2).subscribe((resp: any) => {
      console.log(resp.info);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorNuevo = MensajeRecibido.Cantidad;
          this.DatosPOST_PRANDRIALX.push(FechaNueva);
          this.DatosPOST_PRANDRIALY.push(ValorNuevo);
        }
        this.chartPOST_PRANDRIAL = new Chart('GraficaGLUCOSAPOST_PRANDRIAL', {
          type: "line",
          data: {
            labels: this.DatosPOST_PRANDRIALX,
            datasets: [{
              label: 'Glucosa Post-Prandrial',
              backgroundColor: "#8990F8",
              borderColor: "#8990F8",
              data: this.DatosPOST_PRANDRIALY
            }]
          },
        });
      } else {
        this.chartPOST_PRANDRIAL = new Chart('GraficaGLUCOSAPOST_PRANDRIAL', {
          type: "line",
          data: {
            labels: this.DatosPOST_PRANDRIALX,
            datasets: [{
              label: 'Glucosa Post-Prandrial',
              backgroundColor: "#8990F8",
              borderColor: "#8990F8",
              data: this.DatosPOST_PRANDRIALY
            }]
          },
        });
      }
    });


  }
  ActualizarGLUCOSAPOST_PEST(fecha1: string, fecha2: string, usuario: number) {
    this.chartPOST_PRE_PRANDRIAL.destroy();
    //Acá va la gráfica individual de PRE_POST_PANDRIAL
    console.log("GRAFICANDO PEST Y POST");
    this.DatosPOST_PRE_PRANDRIALX = [];
    this.DatosPOST_PRE_PRANDRIALY1 = [];
    this.DatosPOST_PRE_PRANDRIALY2 = [];
    this.Microservicio.ObtenerPrePost(usuario, fecha1, fecha2).subscribe((resp: any) => {
      console.log(resp.info);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha1.substring(0, 10);
          var ValorPRE = MensajeRecibido.Pre;
          var ValorPOST = MensajeRecibido.Post;
          this.DatosPOST_PRE_PRANDRIALX.push(FechaNueva);
          this.DatosPOST_PRE_PRANDRIALY1.push(ValorPRE);
          this.DatosPOST_PRE_PRANDRIALY2.push(ValorPOST);
        }
        this.chartPOST_PRE_PRANDRIAL = new Chart('GraficaGLUCOSAPOST_PEST', {
          type: "line",
          data: {
            labels: this.DatosPOST_PRE_PRANDRIALX,
            datasets: [{
              label: 'Glucosa Post-Prandrial',
              backgroundColor: "#F95D70",
              borderColor: "#F95D70",
              data: this.DatosPOST_PRE_PRANDRIALY2
            },
            {
              label: 'Glucosa Pre-Prandrial',
              backgroundColor: "#69DD4C",
              borderColor: "#69DD4C",
              data: this.DatosPOST_PRE_PRANDRIALY1
            }
            ]
          },
        });
      } else {
        this.chartPOST_PRE_PRANDRIAL = new Chart('GraficaGLUCOSAPOST_PEST', {
          type: "line",
          data: {
            labels: this.DatosPOST_PRE_PRANDRIALX,
            datasets: [{
              label: 'Glucosa Post-Prandrial',
              backgroundColor: "#F95D70",
              borderColor: "#F95D70",
              data: this.DatosPOST_PRE_PRANDRIALY2
            },
            {
              label: 'Glucosa Pre-Prandrial',
              backgroundColor: "#69DD4C",
              borderColor: "#69DD4C",
              data: this.DatosPOST_PRE_PRANDRIALY1
            }
            ]
          },
        });
      }
    });
  }
  ActualizarGLUCOSA_TOTAL(fecha1: string, fecha2: string, usuario: number) {
    this.chartGlucosaTotal.destroy();
    //Acá va la gráfica de todas las glucosas
    this.DatosGlucosaTotalX = [];
    this.DatosGlucosaTotalY = [];
    this.Microservicio.ObtenerTotalGlucosa(usuario, fecha1, fecha2).subscribe((resp: any) => {
      console.log(resp.info);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorPRE = MensajeRecibido.Cantidad;
          this.DatosGlucosaTotalX.push(FechaNueva);
          this.DatosGlucosaTotalY.push(ValorPRE);
        }
        this.chartGlucosaTotal = new Chart('GraficaGLUCOSA_TOTAL', {
          type: "line",
          data: {
            labels: this.DatosGlucosaTotalX,
            datasets: [{
              label: 'Glucosa',
              backgroundColor: "#8990F8",
              borderColor: "#8990F8",
              data: this.DatosGlucosaTotalY
            }]
          },
        });
      } else {
        this.chartGlucosaTotal = new Chart('GraficaGLUCOSA_TOTAL', {
          type: "line",
          data: {
            labels: this.DatosGlucosaTotalX,
            datasets: [{
              label: 'Glucosa',
              backgroundColor: "#8990F8",
              borderColor: "#8990F8",
              data: this.DatosGlucosaTotalY
            }]
          },
        });
      }
    });

  }
  ActualizarCOLESTEROL_TOTAL(fecha1: string, fecha2: string, usuario: number) {
    this.chartColesterolTotal.destroy();
    //Acá va la gráfica individual de Total Colesterol
    this.DatosColesterolTotalX = [];
    this.DatosColesterolTotalY = [];
    this.Microservicio.verHematologiasReportes(usuario, 5, fecha1, fecha2).subscribe((resp: any) => {
      console.log(resp.info);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorNuevo = MensajeRecibido.Cantidad;
          this.DatosColesterolTotalX.push(FechaNueva);
          this.DatosColesterolTotalY.push(ValorNuevo);
        }
        this.chartColesterolTotal = new Chart('GraficaCOLESTEROL_TOTAL', {
          type: "line",
          data: {
            labels: this.DatosColesterolTotalX,
            datasets: [{
              label: 'Colesterol total',
              backgroundColor: "#FDF63E",
              borderColor: "#FDF63E",
              data: this.DatosColesterolTotalY
            }]
          },
        });
      } else {
        this.chartColesterolTotal = new Chart('GraficaCOLESTEROL_TOTAL', {
          type: "line",
          data: {
            labels: this.DatosColesterolTotalX,
            datasets: [{
              label: 'Colesterol total',
              backgroundColor: "#FDF63E",
              borderColor: "#FDF63E",
              data: this.DatosColesterolTotalY
            }]
          },
        });
      }
    });


  }
  ActualizarCOLESTEROL_HDL_LDL(fecha1: string, fecha2: string, usuario: number) {
    this.chartColesterolHDL.destroy();
    //Acá va la gráfica individual de Colesterol HDL Y LDL
    this.DatosColesterolHDLX = [];
    this.DatosColesterolHDLY = [];
    this.DatosColesterolLDLY = [];
    this.Microservicio.ObtenerDosColesterol(usuario, fecha1, fecha2).subscribe((resp: any) => {
      console.log(resp.info);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha1.substring(0, 10);
          var ValorPRE = MensajeRecibido.Pre;
          var ValorPOST = MensajeRecibido.Post;
          this.DatosColesterolHDLX.push(FechaNueva);
          this.DatosColesterolLDLY.push(ValorPRE);
          this.DatosColesterolHDLY.push(ValorPOST);
        }
        this.chartColesterolHDL = new Chart('GraficaCOLESTEROL_HDL_LDL', {
          type: "line",
          data: {
            labels: this.DatosColesterolHDLX,
            datasets: [{
              label: 'Colesterol HDL',
              backgroundColor: "#F95D70",
              borderColor: "#F95D70",
              data: this.DatosColesterolHDLY
            },
            {
              label: 'Colesterol LDL',
              backgroundColor: "#69DD4C",
              borderColor: "#69DD4C",
              data: this.DatosColesterolLDLY
            }
            ]
          },
        });
      } else {
        this.chartColesterolHDL = new Chart('GraficaCOLESTEROL_HDL_LDL', {
          type: "line",
          data: {
            labels: this.DatosColesterolHDLX,
            datasets: [{
              label: 'Colesterol HDL',
              backgroundColor: "#F95D70",
              borderColor: "#F95D70",
              data: this.DatosColesterolHDLY
            },
            {
              label: 'Colesterol LDL',
              backgroundColor: "#69DD4C",
              borderColor: "#69DD4C",
              data: this.DatosColesterolLDLY
            }
            ]
          },
        });
      }
    });

  }
  ActualizarTRIGLICERIDOS(fecha1: string, fecha2: string, usuario: number) {
    this.chartTRIGLICERIDOS.destroy();
    //Acá va la gráfica individual de Triglicerdios
    this.DatosTRIGLICERIDOSX = [];
    this.DatosTRIGLICERIDOSY = [];
    this.Microservicio.verHematologiasReportes(usuario, 8, fecha1, fecha2).subscribe((resp: any) => {
      console.log(resp.info);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorNuevo = MensajeRecibido.Cantidad;
          this.DatosTRIGLICERIDOSX.push(FechaNueva);
          this.DatosTRIGLICERIDOSY.push(ValorNuevo);
        }
        this.chartTRIGLICERIDOS = new Chart('GraficaTRIGLICERIDOS', {
          type: "line",
          data: {
            labels: this.DatosTRIGLICERIDOSX,
            datasets: [{
              label: 'Trigliceridos',
              backgroundColor: "#8990F8",
              borderColor: "#8990F8",
              data: this.DatosTRIGLICERIDOSY
            }]
          },
        });
      } else {
        this.chartTRIGLICERIDOS = new Chart('GraficaTRIGLICERIDOS', {
          type: "line",
          data: {
            labels: this.DatosTRIGLICERIDOSX,
            datasets: [{
              label: 'Trigliceridos',
              backgroundColor: "#8990F8",
              borderColor: "#8990F8",
              data: this.DatosTRIGLICERIDOSY
            }]
          },
        });
      }
    });

  }
  ActualizarLIPIDOS(fecha1: string, fecha2: string, usuario: number) {
    //acá va la grafica indificual de Lipidos
    this.chartLIPIDOS.destroy();
    this.DatosLIPIDOSX = [];
    this.DatosLIPIDOSY = [];
    this.Microservicio.verHematologiasReportes(usuario, 9, fecha1, fecha2).subscribe((resp: any) => {
      console.log(resp.info);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorNuevo = MensajeRecibido.Cantidad;
          this.DatosLIPIDOSX.push(FechaNueva);
          this.DatosLIPIDOSY.push(ValorNuevo);
        }
        this.chartLIPIDOS = new Chart('GraficaLIPIDOS', {
          type: "line",
          data: {
            labels: this.DatosLIPIDOSX,
            datasets: [{
              label: 'Lipidos',
              backgroundColor: "#FDF63E",
              borderColor: "#FDF63E",
              data: this.DatosLIPIDOSY
            }]
          },
        });
      } else {
        this.chartLIPIDOS = new Chart('GraficaLIPIDOS', {
          type: "line",
          data: {
            labels: this.DatosLIPIDOSX,
            datasets: [{
              label: 'Lipidos',
              backgroundColor: "#FDF63E",
              borderColor: "#FDF63E",
              data: this.DatosLIPIDOSY
            }]
          },
        });
      }
    });

  }
  ActualizarASPARTATO(fecha1: string, fecha2: string, usuario: number) {
    this.chartASPARTATO.destroy();
    //Acá va la gráfica individual de ASPARTATO
    this.DatosASPARTATOX = [];
    this.DatosASPARTATOY = [];
    this.Microservicio.verHematologiasReportes(usuario, 10, fecha1, fecha2).subscribe((resp: any) => {
      console.log(resp.info);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorNuevo = MensajeRecibido.Cantidad;
          this.DatosASPARTATOX.push(FechaNueva);
          this.DatosASPARTATOY.push(ValorNuevo);
        }
        this.chartASPARTATO = new Chart('GraficaASPARTATO', {
          type: "line",
          data: {
            labels: this.DatosASPARTATOX,
            datasets: [{
              label: 'ASAT-TGO',
              backgroundColor: "#F95D70",
              borderColor: "#F95D70",
              data: this.DatosASPARTATOY
            }]
          },
        });
      } else {
        this.chartASPARTATO = new Chart('GraficaASPARTATO', {
          type: "line",
          data: {
            labels: this.DatosASPARTATOX,
            datasets: [{
              label: 'ASAT-TGO',
              backgroundColor: "#F95D70",
              borderColor: "#F95D70",
              data: this.DatosASPARTATOY
            }]
          },
        });
      }
    });


  }
  ActualizarALANINO(fecha1: string, fecha2: string, usuario: number) {
    this.chartALANINO.destroy();
    //Acá va la gráfica individual de CREATININA
    this.DatosALANINOX = [];
    this.DatosALANINOY = [];
    this.Microservicio.verHematologiasReportes(usuario, 11, fecha1, fecha2).subscribe((resp: any) => {
      console.log(resp.info);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorNuevo = MensajeRecibido.Cantidad;
          this.DatosALANINOX.push(FechaNueva);
          this.DatosALANINOY.push(ValorNuevo);
        }
        this.chartALANINO = new Chart('GraficaALANINO', {
          type: "line",
          data: {
            labels: this.DatosALANINOX,
            datasets: [{
              label: 'ALAT-TGP',
              backgroundColor: "#69DD4C",
              borderColor: "#69DD4C",
              data: this.DatosALANINOY
            }]
          },
        });
      } else {
        this.chartALANINO = new Chart('GraficaALANINO', {
          type: "line",
          data: {
            labels: this.DatosALANINOX,
            datasets: [{
              label: 'ALAT-TGP',
              backgroundColor: "#69DD4C",
              borderColor: "#69DD4C",
              data: this.DatosALANINOY
            }]
          },
        });
      }
    });

  }

  ObtenerNombreHematologias() {
    console.log("HEMATOLOGIAS");
    this.TipoHemalogias = [];

    this.Microservicio.ObtenerNombreHematologiasReportes().subscribe((resp: any) => {
      console.log("resp->" + resp)
      if (resp.msg == true) {
        const reversed = resp.info;
        for (let MensajeRecibido of reversed) {

          this.TipoHemalogias.push({
            "Nombre": MensajeRecibido.Nombre
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


  //Metodos individuales inicio
  ActualizarHEMOGLOBINAINICIO(usuario: number) {
    //this.chartHEMOGLOBINA.destroy();
    console.log("CREando grafica 1");
    this.DatosHEMOGLOBINAX = [];
    this.DatosHEMOGLOBINAY = [];

    this.Microservicio.verHematologiasReportes2(usuario, 1).subscribe((resp: any) => {
      console.log(resp.info);
      console.log(resp.msg);
      console.log(resp);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorNuevo = MensajeRecibido.Cantidad;
          this.DatosHEMOGLOBINAX.push(FechaNueva);
          this.DatosHEMOGLOBINAY.push(ValorNuevo);
        }
        this.chartHEMOGLOBINA = new Chart('GraficaHEMOGLOBINA', {
          type: "line",
          data: {
            labels: this.DatosHEMOGLOBINAX,
            datasets: [{
              label: 'Hemoglobina',
              backgroundColor: "#F95D70",
              borderColor: "#F95D70",
              data: this.DatosHEMOGLOBINAY
            }]
          },
        });
      } else {
        this.chartHEMOGLOBINA = new Chart('GraficaHEMOGLOBINA', {
          type: "line",
          data: {
            labels: this.DatosHEMOGLOBINAX,
            datasets: [{
              label: 'Hemoglobina',
              backgroundColor: "#F95D70",
              borderColor: "#F95D70",
              data: this.DatosHEMOGLOBINAY
            }]
          },
        });
      }
    });


  }
  ActualizarCREATININAINICIO(usuario: number) {

    this.DatosCREATININAX = [];
    this.DatosCREATININAY = [];
    this.Microservicio.verHematologiasReportes2(usuario, 4).subscribe((resp: any) => {
      console.log(resp.info);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorNuevo = MensajeRecibido.Cantidad;
          this.DatosCREATININAX.push(FechaNueva);
          this.DatosCREATININAY.push(ValorNuevo);
        }
        this.chartCREATININA = new Chart('GraficaCREATININA', {
          type: "line",
          data: {
            labels: this.DatosCREATININAX,
            datasets: [{
              label: 'Creatinina',
              backgroundColor: "#69DD4C",
              borderColor: "#69DD4C",
              data: this.DatosCREATININAY
            }]
          },
        });
      } else {
        this.chartCREATININA = new Chart('GraficaCREATININA', {
          type: "line",
          data: {
            labels: this.DatosCREATININAX,
            datasets: [{
              label: 'Creatinina',
              backgroundColor: "#69DD4C",
              borderColor: "#69DD4C",
              data: this.DatosCREATININAY
            }]
          },
        });
      }
    });


  }
  ActualizarGLUCOSAPRE_PRANDRIALINICIO(usuario: number) {
    //Acá va la gráfica individual de PREPANDRIAL

    this.DatosPRE_PRANDRIALX = [];
    this.DatosPRE_PRANDRIALY = [];
    this.Microservicio.verHematologiasReportes2(usuario, 2).subscribe((resp: any) => {
      console.log(resp.info);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorNuevo = MensajeRecibido.Cantidad;
          this.DatosPRE_PRANDRIALX.push(FechaNueva);
          this.DatosPRE_PRANDRIALY.push(ValorNuevo);
        }
        this.chartPRE_PRANDRIAL = new Chart('GraficaGLUCOSAPRE_PRANDRIAL', {
          type: "line",
          data: {
            labels: this.DatosPRE_PRANDRIALX,
            datasets: [{
              label: 'Glucosa Pre-Prandrial',
              backgroundColor: "#FDF63E",
              borderColor: "#FDF63E",
              data: this.DatosPRE_PRANDRIALY
            }]
          },
        });
      } else {
        this.chartPRE_PRANDRIAL = new Chart('GraficaGLUCOSAPRE_PRANDRIAL', {
          type: "line",
          data: {
            labels: this.DatosPRE_PRANDRIALX,
            datasets: [{
              label: 'Glucosa Pre-Prandrial',
              backgroundColor: "#FDF63E",
              borderColor: "#FDF63E",
              data: this.DatosPRE_PRANDRIALY
            }]
          },
        });
      }
    });

  }
  ActualizarGLUCOSAPOST_PRANDRIALINICIO(usuario: number) {

    //Acá va la gráfica individual de postPANDRIAL
    this.DatosPOST_PRANDRIALX = [];
    this.DatosPOST_PRANDRIALY = [];
    this.Microservicio.verHematologiasReportes2(usuario, 3).subscribe((resp: any) => {
      console.log(resp.info);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorNuevo = MensajeRecibido.Cantidad;
          this.DatosPOST_PRANDRIALX.push(FechaNueva);
          this.DatosPOST_PRANDRIALY.push(ValorNuevo);
        }
        this.chartPOST_PRANDRIAL = new Chart('GraficaGLUCOSAPOST_PRANDRIAL', {
          type: "line",
          data: {
            labels: this.DatosPOST_PRANDRIALX,
            datasets: [{
              label: 'Glucosa Post-Prandrial',
              backgroundColor: "#8990F8",
              borderColor: "#8990F8",
              data: this.DatosPOST_PRANDRIALY
            }]
          },
        });
      } else {
        this.chartPOST_PRANDRIAL = new Chart('GraficaGLUCOSAPOST_PRANDRIAL', {
          type: "line",
          data: {
            labels: this.DatosPOST_PRANDRIALX,
            datasets: [{
              label: 'Glucosa Post-Prandrial',
              backgroundColor: "#8990F8",
              borderColor: "#8990F8",
              data: this.DatosPOST_PRANDRIALY
            }]
          },
        });
      }
    });


  }
  ActualizarGLUCOSAPOST_PESTINICIO(usuario: number) {

    //Acá va la gráfica individual de PRE_POST_PANDRIAL
    console.log("GRAFICANDO PEST Y POST");
    this.DatosPOST_PRE_PRANDRIALX = [];
    this.DatosPOST_PRE_PRANDRIALY1 = [];
    this.DatosPOST_PRE_PRANDRIALY2 = [];
    this.Microservicio.ObtenerPrePost2(usuario).subscribe((resp: any) => {
      console.log(resp.info);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha1.substring(0, 10);
          var ValorPRE = MensajeRecibido.Pre;
          var ValorPOST = MensajeRecibido.Post;
          this.DatosPOST_PRE_PRANDRIALX.push(FechaNueva);
          this.DatosPOST_PRE_PRANDRIALY1.push(ValorPRE);
          this.DatosPOST_PRE_PRANDRIALY2.push(ValorPOST);
        }
        this.chartPOST_PRE_PRANDRIAL = new Chart('GraficaGLUCOSAPOST_PEST', {
          type: "line",
          data: {
            labels: this.DatosPOST_PRE_PRANDRIALX,
            datasets: [{
              label: 'Glucosa Post-Prandrial',
              backgroundColor: "#F95D70",
              borderColor: "#F95D70",
              data: this.DatosPOST_PRE_PRANDRIALY2
            },
            {
              label: 'Glucosa Pre-Prandrial',
              backgroundColor: "#69DD4C",
              borderColor: "#69DD4C",
              data: this.DatosPOST_PRE_PRANDRIALY1
            }
            ]
          },
        });
      } else {
        this.chartPOST_PRE_PRANDRIAL = new Chart('GraficaGLUCOSAPOST_PEST', {
          type: "line",
          data: {
            labels: this.DatosPOST_PRE_PRANDRIALX,
            datasets: [{
              label: 'Glucosa Post-Prandrial',
              backgroundColor: "#F95D70",
              borderColor: "#F95D70",
              data: this.DatosPOST_PRE_PRANDRIALY2
            },
            {
              label: 'Glucosa Pre-Prandrial',
              backgroundColor: "#69DD4C",
              borderColor: "#69DD4C",
              data: this.DatosPOST_PRE_PRANDRIALY1
            }
            ]
          },
        });
      }
    });
  }
  ActualizarGLUCOSA_TOTALINICIO(usuario: number) {

    //Acá va la gráfica de todas las glucosas
    this.DatosGlucosaTotalX = [];
    this.DatosGlucosaTotalY = [];
    this.Microservicio.ObtenerTotalGlucosa2(usuario).subscribe((resp: any) => {
      console.log(resp.info);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorPRE = MensajeRecibido.Cantidad;
          this.DatosGlucosaTotalX.push(FechaNueva);
          this.DatosGlucosaTotalY.push(ValorPRE);
        }
        this.chartGlucosaTotal = new Chart('GraficaGLUCOSA_TOTAL', {
          type: "line",
          data: {
            labels: this.DatosGlucosaTotalX,
            datasets: [{
              label: 'Glucosa',
              backgroundColor: "#8990F8",
              borderColor: "#8990F8",
              data: this.DatosGlucosaTotalY
            }]
          },
        });
      } else {
        this.chartGlucosaTotal = new Chart('GraficaGLUCOSA_TOTAL', {
          type: "line",
          data: {
            labels: this.DatosGlucosaTotalX,
            datasets: [{
              label: 'Glucosa',
              backgroundColor: "#8990F8",
              borderColor: "#8990F8",
              data: this.DatosGlucosaTotalY
            }]
          },
        });
      }
    });

  }
  ActualizarCOLESTEROL_TOTALINICIO(usuario: number) {

    //Acá va la gráfica individual de Total Colesterol
    this.DatosColesterolTotalX = [];
    this.DatosColesterolTotalY = [];
    this.Microservicio.verHematologiasReportes2(usuario, 5).subscribe((resp: any) => {
      console.log("COLESTEROL TOTAL")
      console.log(resp.info);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorNuevo = MensajeRecibido.Cantidad;
          this.DatosColesterolTotalX.push(FechaNueva);
          this.DatosColesterolTotalY.push(ValorNuevo);
        }
        this.chartColesterolTotal = new Chart('GraficaCOLESTEROL_TOTAL', {
          type: "line",
          data: {
            labels: this.DatosColesterolTotalX,
            datasets: [{
              label: 'Colesterol total',
              backgroundColor: "#FDF63E",
              borderColor: "#FDF63E",
              data: this.DatosColesterolTotalY
            }]
          },
        });
      } else {
        this.chartColesterolTotal = new Chart('GraficaCOLESTEROL_TOTAL', {
          type: "line",
          data: {
            labels: this.DatosColesterolTotalX,
            datasets: [{
              label: 'Colesterol total',
              backgroundColor: "#FDF63E",
              borderColor: "#FDF63E",
              data: this.DatosColesterolTotalY
            }]
          },
        });
      }
    });


  }
  ActualizarCOLESTEROL_HDL_LDLINICIO(usuario: number) {

    //Acá va la gráfica individual de Colesterol HDL Y LDL
    this.DatosColesterolHDLX = [];
    this.DatosColesterolHDLY = [];
    this.DatosColesterolLDLY = [];
    this.Microservicio.ObtenerDosColesterol2(usuario).subscribe((resp: any) => {
      console.log(resp.info);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha1.substring(0, 10);
          var ValorPRE = MensajeRecibido.Pre;
          var ValorPOST = MensajeRecibido.Post;
          this.DatosColesterolHDLX.push(FechaNueva);
          this.DatosColesterolLDLY.push(ValorPRE);
          this.DatosColesterolHDLY.push(ValorPOST);
        }
        this.chartColesterolHDL = new Chart('GraficaCOLESTEROL_HDL_LDL', {
          type: "line",
          data: {
            labels: this.DatosColesterolHDLX,
            datasets: [{
              label: 'Colesterol HDL',
              backgroundColor: "#F95D70",
              borderColor: "#F95D70",
              data: this.DatosColesterolHDLY
            },
            {
              label: 'Colesterol LDL',
              backgroundColor: "#69DD4C",
              borderColor: "#69DD4C",
              data: this.DatosColesterolLDLY
            }
            ]
          },
        });
      } else {
        this.chartColesterolHDL = new Chart('GraficaCOLESTEROL_HDL_LDL', {
          type: "line",
          data: {
            labels: this.DatosColesterolHDLX,
            datasets: [{
              label: 'Colesterol HDL',
              backgroundColor: "#F95D70",
              borderColor: "#F95D70",
              data: this.DatosColesterolHDLY
            },
            {
              label: 'Colesterol LDL',
              backgroundColor: "#69DD4C",
              borderColor: "#69DD4C",
              data: this.DatosColesterolLDLY
            }
            ]
          },
        });
      }
    });

  }
  ActualizarTRIGLICERIDOSINICIO(usuario: number) {

    //Acá va la gráfica individual de Triglicerdios
    this.DatosTRIGLICERIDOSX = [];
    this.DatosTRIGLICERIDOSY = [];
    this.Microservicio.verHematologiasReportes2(usuario, 8).subscribe((resp: any) => {
      console.log(resp.info);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorNuevo = MensajeRecibido.Cantidad;
          this.DatosTRIGLICERIDOSX.push(FechaNueva);
          this.DatosTRIGLICERIDOSY.push(ValorNuevo);
        }
        this.chartTRIGLICERIDOS = new Chart('GraficaTRIGLICERIDOS', {
          type: "line",
          data: {
            labels: this.DatosTRIGLICERIDOSX,
            datasets: [{
              label: 'Trigliceridos',
              backgroundColor: "#8990F8",
              borderColor: "#8990F8",
              data: this.DatosTRIGLICERIDOSY
            }]
          },
        });
      } else {
        this.chartTRIGLICERIDOS = new Chart('GraficaTRIGLICERIDOS', {
          type: "line",
          data: {
            labels: this.DatosTRIGLICERIDOSX,
            datasets: [{
              label: 'Trigliceridos',
              backgroundColor: "#8990F8",
              borderColor: "#8990F8",
              data: this.DatosTRIGLICERIDOSY
            }]
          },
        });
      }
    });

  }
  ActualizarLIPIDOSINICIO(usuario: number) {
    //acá va la grafica indificual de Lipidos

    this.DatosLIPIDOSX = [];
    this.DatosLIPIDOSY = [];
    this.Microservicio.verHematologiasReportes2(usuario, 9).subscribe((resp: any) => {
      console.log(resp.info);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorNuevo = MensajeRecibido.Cantidad;
          this.DatosLIPIDOSX.push(FechaNueva);
          this.DatosLIPIDOSY.push(ValorNuevo);
        }
        this.chartLIPIDOS = new Chart('GraficaLIPIDOS', {
          type: "line",
          data: {
            labels: this.DatosLIPIDOSX,
            datasets: [{
              label: 'Lipidos',
              backgroundColor: "#FDF63E",
              borderColor: "#FDF63E",
              data: this.DatosLIPIDOSY
            }]
          },
        });
      } else {
        this.chartLIPIDOS = new Chart('GraficaLIPIDOS', {
          type: "line",
          data: {
            labels: this.DatosLIPIDOSX,
            datasets: [{
              label: 'Lipidos',
              backgroundColor: "#FDF63E",
              borderColor: "#FDF63E",
              data: this.DatosLIPIDOSY
            }]
          },
        });
      }
    });

  }
  ActualizarASPARTATOINICIO(usuario: number) {

    //Acá va la gráfica individual de ASPARTATO
    this.DatosASPARTATOX = [];
    this.DatosASPARTATOY = [];
    this.Microservicio.verHematologiasReportes2(usuario, 10).subscribe((resp: any) => {
      console.log(resp.info);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorNuevo = MensajeRecibido.Cantidad;
          this.DatosASPARTATOX.push(FechaNueva);
          this.DatosASPARTATOY.push(ValorNuevo);
        }
        this.chartASPARTATO = new Chart('GraficaASPARTATO', {
          type: "line",
          data: {
            labels: this.DatosASPARTATOX,
            datasets: [{
              label: 'ASAT-TGO',
              backgroundColor: "#F95D70",
              borderColor: "#F95D70",
              data: this.DatosASPARTATOY
            }]
          },
        });
      } else {
        this.chartASPARTATO = new Chart('GraficaASPARTATO', {
          type: "line",
          data: {
            labels: this.DatosASPARTATOX,
            datasets: [{
              label: 'ASAT-TGO',
              backgroundColor: "#F95D70",
              borderColor: "#F95D70",
              data: this.DatosASPARTATOY
            }]
          },
        });
      }
    });


  }
  ActualizarALANINOINICIO(usuario: number) {

    //Acá va la gráfica individual de CREATININA
    this.DatosALANINOX = [];
    this.DatosALANINOY = [];
    this.Microservicio.verHematologiasReportes2(usuario, 11).subscribe((resp: any) => {
      console.log(resp.info);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorNuevo = MensajeRecibido.Cantidad;
          this.DatosALANINOX.push(FechaNueva);
          this.DatosALANINOY.push(ValorNuevo);
        }
        this.chartALANINO = new Chart('GraficaALANINO', {
          type: "line",
          data: {
            labels: this.DatosALANINOX,
            datasets: [{
              label: 'ALAT-TGP',
              backgroundColor: "#69DD4C",
              borderColor: "#69DD4C",
              data: this.DatosALANINOY
            }]
          },
        });
      } else {
        this.chartALANINO = new Chart('GraficaALANINO', {
          type: "line",
          data: {
            labels: this.DatosALANINOX,
            datasets: [{
              label: 'ALAT-TGP',
              backgroundColor: "#69DD4C",
              borderColor: "#69DD4C",
              data: this.DatosALANINOY
            }]
          },
        });
      }
    });

  }
  VerReporteIndividualINICIO() {


    this.FechasIndiviaduales = [];
    this.ValoresIndivuales = [];
    this.DatosMaximosIndividuales = [];
    this.DatosMinimosIndividuales = [];
    this.HematologiABuscarGENERAL = "GLUCOSA PRE-PRANDRIAL";
    this.Microservicio.IdHematologaReporte(this.HematologiABuscarGENERAL).subscribe((resp: any) => {
      if (resp.msg == true) {
        var identificadorH = resp.info[0].Internal_ID_Hematologia;
        var ValMaximo = resp.info[0].Minimo;
        var ValMinimo = resp.info[0].Maximo;
        var Info = this.Almacenamiento.ObtenerInformacionLS("Usuario");
        var o = JSON.parse(Info);
        this.CodigoUsuarioH = o.user;
        var sexoU = o.Genero;
        if (sexoU.toString() == "Masculino") {
          if (this.HematologiABuscarGENERAL.toString() == "COLESTEROL HDL") {
            ValMaximo = 35;
            ValMinimo = 0;
          } else if (this.HematologiABuscarGENERAL.toString() == "CREATININA") {
            ValMaximo = 1.4;
            ValMinimo = 0.9;
          }
        } else {
          if (this.HematologiABuscarGENERAL.toString() == "COLESTEROL HDL") {
            ValMaximo = 45;
            ValMinimo = 0;
          } else if (this.HematologiABuscarGENERAL.toString() == "CREATININA") {
            ValMaximo = 1.2;
            ValMinimo = 0.8;
          }
        }
        this.Microservicio.verHematologiasReportes2(this.CodigoUsuarioH, identificadorH).subscribe((resp: any) => {
          if (resp.msg == true) {
            let titulo = this.HematologiABuscarGENERAL;
            for (let MensajeRecibido of resp.info) {
              var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
              var ValorNuevo = MensajeRecibido.Cantidad;
              this.FechasIndiviaduales.push(FechaNueva);
              this.ValoresIndivuales.push(ValorNuevo);
              this.DatosMaximosIndividuales.push(ValMaximo);
              this.DatosMinimosIndividuales.push(ValMinimo);
            }


            if (this.DatosMinimosIndividuales[0] == 0) {
              this.chart = new Chart('GraficaIndividual', {
                type: 'bar',
                data: {
                  labels: this.FechasIndiviaduales,
                  datasets: [
                    {
                      label: titulo,
                      data: this.ValoresIndivuales,
                      backgroundColor: [
                        '#FDF63E'
                      ],
                      borderColor: [
                        '#FDF63E'
                      ],
                      borderWidth: 1
                    },
                    {
                      label: 'Valor Máximo',
                      data: this.DatosMaximosIndividuales,
                      backgroundColor: [
                        '#27C3E4'
                      ],
                      borderColor: [
                        '#27C3E4'
                      ],
                      borderWidth: 1
                    }


                  ]
                },
                options: {
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }
              });
            } else {
              this.chart = new Chart('GraficaIndividual', {
                type: 'bar',
                data: {
                  labels: this.FechasIndiviaduales,
                  datasets: [
                    {
                      label: 'Valor Minimo',
                      data: this.DatosMinimosIndividuales,
                      backgroundColor: [
                        '#F95D70'
                      ],
                      borderColor: [
                        '#F95D70'
                      ],
                      borderWidth: 1
                    },
                    {
                      label: titulo,
                      data: this.ValoresIndivuales,
                      backgroundColor: [
                        '#FDF63E'
                      ],
                      borderColor: [
                        '#FDF63E'
                      ],
                      borderWidth: 1
                    },
                    {
                      label: 'Valor Máximo',
                      data: this.DatosMaximosIndividuales,
                      backgroundColor: [
                        '#27C3E4'
                      ],
                      borderColor: [
                        '#27C3E4'
                      ],
                      borderWidth: 1
                    }


                  ]
                },
                options: {
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }
              });
            }
          } else {
            let titulo = this.HematologiABuscarGENERAL;
            if (this.DatosMinimosIndividuales[0] == 0) {
              this.chart = new Chart('GraficaIndividual', {
                type: 'bar',
                data: {
                  labels: this.FechasIndiviaduales,
                  datasets: [
                    {
                      label: titulo,
                      data: this.ValoresIndivuales,
                      backgroundColor: [
                        '#FDF63E'
                      ],
                      borderColor: [
                        '#FDF63E'
                      ],
                      borderWidth: 1
                    },
                    {
                      label: 'Valor Máximo',
                      data: this.DatosMaximosIndividuales,
                      backgroundColor: [
                        '#27C3E4'
                      ],
                      borderColor: [
                        '#27C3E4'
                      ],
                      borderWidth: 1
                    }


                  ]
                },
                options: {
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }
              });
            } else {
              this.chart = new Chart('GraficaIndividual', {
                type: 'bar',
                data: {
                  labels: this.FechasIndiviaduales,
                  datasets: [
                    {
                      label: 'Valor Minimo',
                      data: this.DatosMinimosIndividuales,
                      backgroundColor: [
                        '#F95D70'
                      ],
                      borderColor: [
                        '#F95D70'
                      ],
                      borderWidth: 1
                    },
                    {
                      label: titulo,
                      data: this.ValoresIndivuales,
                      backgroundColor: [
                        '#FDF63E'
                      ],
                      borderColor: [
                        '#FDF63E'
                      ],
                      borderWidth: 1
                    },
                    {
                      label: 'Valor Máximo',
                      data: this.DatosMaximosIndividuales,
                      backgroundColor: [
                        '#27C3E4'
                      ],
                      borderColor: [
                        '#27C3E4'
                      ],
                      borderWidth: 1
                    }


                  ]
                },
                options: {
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }
              });
            }
          }

        });
      }
    });




  }
}
