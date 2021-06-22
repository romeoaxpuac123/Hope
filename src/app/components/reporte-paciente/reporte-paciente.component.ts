import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MicroserviciosService } from '../../services/microservicios.service';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';
import { AlertasComponent } from '../alertas/alertas.component';
import { PdfMakeWrapper, Txt, Img, Table } from 'pdfmake-wrapper';
@Component({
  selector: 'app-reporte-paciente',
  templateUrl: './reporte-paciente.component.html',
  styleUrls: ['./reporte-paciente.component.css']
})
export class ReportePacienteComponent implements OnInit {
  public Alamars: AlertasComponent = new AlertasComponent;
  public OnnSesion: boolean = false;
  public lista: any = [];
  public correo: string = "";
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
  //Para colesterol HDL y LDL INDIVIDUALES
  DatosColesterolHXindividual: any = [];
  DatosColesterolHYindividual: any = [];
  DatosColesteroDLYindividual: any = [];
  chartColesteroDLindividual: any = [];
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
  public FechaInicio: string = "";
  public FechaFinal: string = "";
  public CodigoUsuarioH: number = 0;
  public NombreDocumento:string = "";
  public ApellidoDocumento:string = "";
  public GeneroDocumento:string = ""; 
  public CorreoDocumento:string = "";
  constructor(
    private Microservicio: MicroserviciosService,
    private Almacenamiento: LocalService,
    private navegacion: Router,

  ) { }

  ngOnInit(): void {
    this.OnnSesion = this.SesionOnn();
    if (this.OnnSesion == false) {
      this.Alamars.Mensaje_De_Error("Usuario sin permisos", "Para hacer uso de esta función inice sesión");
      this.navegacion.navigate(['']);
    } else {
      if (this.EsMedico() == false) {
        this.Alamars.Mensaje_De_Error("Usuario sin permisos", "Para hacer uso de esta función inice sesión");
        this.navegacion.navigate(['']);
      } else {
        this.CodigoUsuarioH = 0;
        //Acciones de inicio para un medico
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
        this.ColesterolesIndividualesINICIO(this.CodigoUsuarioH);
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
  Imprimir() {
    if(this.CodigoUsuarioH == 0){
      this.Alamars.Mensaje_De_Error("ERROR", "Debe realizar previamente una busqueda");
    }else{
      const pdf = new PdfMakeWrapper();
      new Img('./assets/a.png').height(80).width(50).alignment('center').build().then(img => {
  
        pdf.add(img);
        pdf.add(new Txt('HOPE DIABETIC®').alignment('center').bold().fontSize(12).end)
        pdf.add(new Txt('Reporte Hematologías').alignment('center').bold().fontSize(18).end)
        pdf.add(pdf.ln(1));
        //Información paciente//
        ;
        this.CodigoUsuarioH = this.CodigoUsuarioH;
        var today = new Date();
        pdf.add(new Table([
          ["Paciente:", this.NombreDocumento + " " + this.ApellidoDocumento],
          ["Sexo:", this.GeneroDocumento],
          ["Correo:", this.CorreoDocumento],
          ["Fecha de Impresion", today.toString()]
        ]).widths([140, 180]).layout("noBorders").fontSize(10).alignment('left').end
        );
        pdf.add(pdf.ln(1));
        var Encabezado = ['Hematología', 'Valor', 'Valor de Referencia', 'Fecha de Registro'];
        //Agregando Hemoglobina
        //this.DatosHEMOGLOBINAX = [];
        //this.DatosHEMOGLOBINAY
        pdf.add(new Txt('HEMOGLOBINA GLICOSILADA').alignment('center').italics().fontSize(18).end)
        pdf.add(pdf.ln(1));
        pdf.add(new Table([
          Encabezado
        ]).widths([120, 120, 120, 120]).layout("noBorders").fontSize(14).alignment('center').end
        );
        for (var i = 0; i < this.DatosHEMOGLOBINAX.length; i++) {
          pdf.add(new Table([
            ["HEMOGLOBINA GLICOSILADA", this.DatosHEMOGLOBINAY[i], "DIABETES BUEN CONTROL 5.5 - 6.8%", this.DatosHEMOGLOBINAX[i]]
          ]).widths([120, 120, 120, 120]).layout("noBorders").fontSize(10).alignment('center').end
          );
        }
        //Agregando CREATININA
        // this.DatosCREATININAX = [];
        //this.DatosCREATININAY = [];
        pdf.add(pdf.ln(1));
        pdf.add(new Txt('CREATININA').alignment('center').italics().fontSize(18).end)
        pdf.add(pdf.ln(1));
        pdf.add(new Table([
          ['Hematología', 'Valor', 'Valor de Referencia', 'Fecha de Registro']
        ]).widths([120, 120, 120, 120]).layout("noBorders").fontSize(14).alignment('center').end
        );
        for (var i = 0; i < this.DatosCREATININAY.length; i++) {
          pdf.add(new Table([
            ["CREATININA", this.DatosCREATININAY[i], "MUJERES 0.8-1.2 mg/dl\nHOMBRES 0.9-1.4 mg/dl", this.DatosCREATININAX[i]]
          ]).widths([120, 120, 120, 120]).layout("noBorders").fontSize(10).alignment('center').end
          );
        }
        //Agregando PRE PRANDIAL
        //this.DatosPRE_PRANDRIALX = [];
        //this.DatosPRE_PRANDRIALY = [];
        pdf.add(pdf.ln(1));
        pdf.add(new Txt('GLUCOSA PRE-PRANDRIAL').alignment('center').italics().fontSize(18).end)
        pdf.add(pdf.ln(1));
        pdf.add(new Table([
          ['Hematología', 'Valor', 'Valor de Referencia', 'Fecha de Registro']
        ]).widths([120, 120, 120, 120]).layout("noBorders").fontSize(14).alignment('center').end
        );
        for (var i = 0; i < this.DatosPRE_PRANDRIALX.length; i++) {
          pdf.add(new Table([
            ["PRE-PRANDRIAL", this.DatosPRE_PRANDRIALY[i], "65 - 110 mg/dl", this.DatosPRE_PRANDRIALX[i]]
          ]).widths([120, 120, 120, 120]).layout("noBorders").fontSize(10).alignment('center').end
          );
        }
        //Agregando POST PRANDIAL
        //this.DatosPOST_PRANDRIALX = [];
        //this.DatosPOST_PRANDRIALY = [];
        pdf.add(pdf.ln(1));
        pdf.add(new Txt('GLUCOSA POST-PRANDRIAL').alignment('center').italics().fontSize(18).end)
        pdf.add(pdf.ln(1));
        pdf.add(new Table([
          ['Hematología', 'Valor', 'Valor de Referencia', 'Fecha de Registro']
        ]).widths([120, 120, 120, 120]).layout("noBorders").fontSize(14).alignment('center').end
        );
        for (var i = 0; i < this.DatosPOST_PRANDRIALX.length; i++) {
          pdf.add(new Table([
            ["POST-PRANDRIAL", this.DatosPOST_PRANDRIALY[i], "80 - 160 mg/dl", this.DatosPOST_PRANDRIALX[i]]
          ]).widths([120, 120, 120, 120]).layout("noBorders").fontSize(10).alignment('center').end
          );
        }
  
        //Agregando colesterol total
        //this.DatosColesterolTotalX = [];
        //this.DatosColesterolTotalY = [];
        pdf.add(pdf.ln(1));
        pdf.add(new Txt('COLESTEROL TOTAL').alignment('center').italics().fontSize(18).end)
        pdf.add(pdf.ln(1));
        pdf.add(new Table([
          ['Hematología', 'Valor', 'Valor de Referencia', 'Fecha de Registro']
        ]).widths([120, 120, 120, 120]).layout("noBorders").fontSize(14).alignment('center').end
        );
        for (var i = 0; i < this.DatosColesterolTotalX.length; i++) {
          pdf.add(new Table([
            ["Colesterol total", this.DatosColesterolTotalY[i], "Hasta 200 mg/dl", this.DatosColesterolTotalX[i]]
          ]).widths([120, 120, 120, 120]).layout("noBorders").fontSize(10).alignment('center').end
          );
        }
        //COLESTEROL HDL
        //this.DatosColesterolHXindividual = [];
        //this.DatosColesterolHYindividual = [];
        pdf.add(pdf.ln(1));
        pdf.add(new Txt('COLESTEROL HDL').alignment('center').italics().fontSize(18).end)
        pdf.add(pdf.ln(1));
        pdf.add(new Table([
          ['Hematología', 'Valor', 'Valor de Referencia', 'Fecha de Registro']
        ]).widths([120, 120, 120, 120]).layout("noBorders").fontSize(14).alignment('center').end
        );
        for (var i = 0; i < this.DatosColesterolHYindividual.length; i++) {
          pdf.add(new Table([
            ["Colesterol HDL", this.DatosColesterolHYindividual[i], "Mujeres Mayor a 45\nHombres Mayores a 35", this.DatosColesterolHXindividual[i]]
          ]).widths([120, 120, 120, 120]).layout("noBorders").fontSize(10).alignment('center').end
          );
        }
        //COLESTEROL LDL
        //this.DatosColesteroDLYindividual = [];
        //this.chartColesteroDLindividual= [];
        pdf.add(pdf.ln(1));
        pdf.add(new Txt('COLESTEROL LDL').alignment('center').italics().fontSize(18).end)
        pdf.add(pdf.ln(1));
        pdf.add(new Table([
          ['Hematología', 'Valor', 'Valor de Referencia', 'Fecha de Registro']
        ]).widths([120, 120, 120, 120]).layout("noBorders").fontSize(14).alignment('center').end
        );
        for (var i = 0; i < this.DatosColesteroDLYindividual.length; i++) {
          pdf.add(new Table([
            ["Colesterol LDL", this.DatosColesteroDLYindividual[i], "Hasta 130 mg/dl", this.chartColesteroDLindividual[i]]
          ]).widths([120, 120, 120, 120]).layout("noBorders").fontSize(10).alignment('center').end
          );
        }
        //TRIGLICERIDOS
        // this.DatosTRIGLICERIDOSX = [];
        //this.DatosTRIGLICERIDOSY = [];
        pdf.add(pdf.ln(1));
        pdf.add(new Txt('TRIGLICÉRIDOS').alignment('center').italics().fontSize(18).end)
        pdf.add(pdf.ln(1));
        pdf.add(new Table([
          ['Hematología', 'Valor', 'Valor de Referencia', 'Fecha de Registro']
        ]).widths([120, 120, 120, 120]).layout("noBorders").fontSize(14).alignment('center').end
        );
        for (var i = 0; i < this.DatosTRIGLICERIDOSY.length; i++) {
          pdf.add(new Table([
            ["Triglicéridos", this.DatosTRIGLICERIDOSY[i], "70 – 170 mg/dl", this.DatosTRIGLICERIDOSX[i]]
          ]).widths([120, 120, 120, 120]).layout("noBorders").fontSize(10).alignment('center').end
          );
        }
        //LÍPIDOS TOTALES
        //this.DatosLIPIDOSX = [];
        //this.DatosLIPIDOSY = [];
        pdf.add(pdf.ln(1));
        pdf.add(new Txt('LÍPIDOS TOTALES').alignment('center').italics().fontSize(18).end)
        pdf.add(pdf.ln(1));
        pdf.add(new Table([
          ['Hematología', 'Valor', 'Valor de Referencia', 'Fecha de Registro']
        ]).widths([120, 120, 120, 120]).layout("noBorders").fontSize(14).alignment('center').end
        );
        for (var i = 0; i < this.DatosLIPIDOSY.length; i++) {
          pdf.add(new Table([
            ["Lípidos totales", this.DatosLIPIDOSY[i], "400-1000 mg/dl", this.DatosLIPIDOSX[i]]
          ]).widths([120, 120, 120, 120]).layout("noBorders").fontSize(10).alignment('center').end
          );
        }
        //ASPARTATO AMINO TRANSFERASA --- ASAT-TGO
        ////Acá va la gráfica individual de ASPARTATO
        //this.DatosASPARTATOX = [];
        //this.DatosASPARTATOY = [];
        pdf.add(pdf.ln(1));
        pdf.add(new Txt('ASPARTATO AMINO TRANSFERASA').alignment('center').italics().fontSize(18).end)
        pdf.add(pdf.ln(1));
        pdf.add(new Table([
          ['Hematología', 'Valor', 'Valor de Referencia', 'Fecha de Registro']
        ]).widths([120, 120, 120, 120]).layout("noBorders").fontSize(14).alignment('center').end
        );
        for (var i = 0; i < this.DatosASPARTATOY.length; i++) {
          pdf.add(new Table([
            ["ASAT-TGO", this.DatosASPARTATOY[i], "Hasta 40 UI/L", this.DatosASPARTATOX[i]]
          ]).widths([120, 120, 120, 120]).layout("noBorders").fontSize(10).alignment('center').end
          );
        }
        //ALANINO AMINO TRANSFERASA ALAT-TGP)
        //   this.DatosALANINOX = [];
        //this.DatosALANINOY = [];
        pdf.add(pdf.ln(1));
        pdf.add(new Txt('ALANINO AMINO TRANSFERASA').alignment('center').italics().fontSize(18).end)
        pdf.add(pdf.ln(1));
        pdf.add(new Table([
          ['Hematología', 'Valor', 'Valor de Referencia', 'Fecha de Registro']
        ]).widths([120, 120, 120, 120]).layout("noBorders").fontSize(14).alignment('center').end
        );
        for (var i = 0; i < this.DatosALANINOY.length; i++) {
          pdf.add(new Table([
            ["ALAT-TGP", this.DatosALANINOY[i], "Hasta 40 UI/L", this.DatosALANINOX[i]]
          ]).widths([120, 120, 120, 120]).layout("noBorders").fontSize(10).alignment('center').end
          );
        }
        pdf.create().download("Reporte " + this.NombreDocumento + " " + this.ApellidoDocumento);
      });
    }
   

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

    this.CodigoUsuarioH = 4000;
    if (Fecha1 > Fecha2) {
      this.Alamars.Mensaje_De_Error("Datos incorrectos", "La fecha final debe ser superior o igual a la fecha de inicio");

    } else {
      if (this.FechaInicio == "" || this.FechaFinal == "" || this.correo == "") {
        this.Alamars.Mensaje_De_Error("Datos incorrectos", "Las fechas de busquedas o el correo del usuario deben tener un valor");

      } else {
        var Info = this.Almacenamiento.ObtenerInformacionLS("Usuario");
        var o = JSON.parse(Info);
        var usuario = o.user
        this.Microservicio.Relacion(usuario, this.correo).subscribe((resp: any) => {
          if (resp.msg == true) {
            this.Microservicio.CodigoPaciente(this.correo).subscribe((resp2: any) => {
              if (resp2.msg == true) {
                console.log("ASIGNAR AL PACIENTE->" + resp2.info[0].External_ID_Cliente);
                console.log("ASIGNAR AL MEDICO->" + o.user);
                this.CodigoUsuarioH = resp2.info[0].External_ID_Cliente;
                this.NombreDocumento = resp2.info[0].Nombre;
                this.ApellidoDocumento = resp2.info[0].Apellido;
                this.GeneroDocumento = resp2.info[0].Genero;
                this.CorreoDocumento = resp2.info[0].Email;
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
                this.ColesterolesIndividuales(this.FechaInicio, this.FechaFinal, this.CodigoUsuarioH);
                this.Alamars.Mensaje_De_Confirmacion("Reportes correctos","En la parte inferior puede observar los resultados");
              } else {
                this.Alamars.Mensaje_De_Error("Datos incorrectos", "El correo ingresado no se encuentra registrado");
              }
            });
          } else {
            this.Alamars.Mensaje_De_Error("Error en Busqueda", "El paciente no ha sido asignado a sus registros");

          }
        });

      }

    }

  }
  //Metodos individuales para cada gráfica
  ColesterolesIndividuales(fecha1: string, fecha2: string, usuario: number) {
    this.DatosColesterolHXindividual = [];
    this.DatosColesterolHYindividual = [];
    this.DatosColesteroDLYindividual = [];
    this.chartColesteroDLindividual = [];

    this.Microservicio.verHematologiasReportes(usuario, 6, fecha1, fecha2).subscribe((resp: any) => {
      console.log(resp.info);
      console.log(resp.msg);
      console.log(resp);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorNuevo = MensajeRecibido.Cantidad;
          this.DatosColesterolHXindividual.push(FechaNueva);
          this.DatosColesterolHYindividual.push(ValorNuevo);
        }
      }
    });

    this.Microservicio.verHematologiasReportes(usuario, 7, fecha1, fecha2).subscribe((resp: any) => {
      console.log(resp.info);
      console.log(resp.msg);
      console.log(resp);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorNuevo = MensajeRecibido.Cantidad;
          this.chartColesteroDLindividual.push(FechaNueva);
          this.DatosColesteroDLYindividual.push(ValorNuevo);
        }
      }
    });
  }
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

  //INICIO
  ColesterolesIndividualesINICIO(usuario: number) {
    this.DatosColesterolHXindividual = [];
    this.DatosColesterolHYindividual = [];
    this.DatosColesteroDLYindividual = [];
    this.chartColesteroDLindividual = [];

    this.Microservicio.verHematologiasReportes2(usuario, 6).subscribe((resp: any) => {
      console.log(resp.info);
      console.log(resp.msg);
      console.log(resp);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorNuevo = MensajeRecibido.Cantidad;
          this.DatosColesterolHXindividual.push(FechaNueva);
          this.DatosColesterolHYindividual.push(ValorNuevo);
        }
      }
    });

    this.Microservicio.verHematologiasReportes2(usuario, 7).subscribe((resp: any) => {
      console.log(resp.info);
      console.log(resp.msg);
      console.log(resp);
      if (resp.msg == true) {
        for (let MensajeRecibido of resp.info) {
          var FechaNueva = MensajeRecibido.Fecha_Registro.substring(0, 10);
          var ValorNuevo = MensajeRecibido.Cantidad;
          this.chartColesteroDLindividual.push(FechaNueva);
          this.DatosColesteroDLYindividual.push(ValorNuevo);
        }
      }
    });
  }
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


}
