import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public Coleccion: string[] = [];
  public Direcciones:string [] = [];
  public arregloMenu:any = [];
  public i:number = 0;
  constructor() { 
    this.Coleccion = ["https://github.com/romeoaxpuac123/MisImagenes/blob/main/Diabetic/Banner6.jpg?raw=true",
                     "https://github.com/romeoaxpuac123/MisImagenes/blob/main/Diabetic/Banner2.jpg?raw=true",
                     "https://github.com/romeoaxpuac123/MisImagenes/blob/main/Diabetic/DMS.jpg?raw=true",
                     "https://github.com/romeoaxpuac123/MisImagenes/blob/main/Diabetic/Banner1.jpg?raw=true"
                  ]

    this.Direcciones = ["https://www.facebook.com/HopeDiabetic",
                      "",                      
                      "https://www.diainternacionalde.com/ficha/dia-mundial-diabetes",
                      "",
    
    ]
    this.i +=1;
    this.arregloMenu = [{
      "titulo": "Batman v. Superman",
      "texto": "Zack Snider",
      "enlace": "https://open.spotify.com/"
  },
  {
    "titulo": "Batman v. Superman 2",
    "texto": "Zack Snider 2",
    "enlace": "https://www.facebook.com/"
  },
  {
    "titulo": "Batman v. Superman 3",
    "texto": "Zack Snider 3",
    "enlace": "https://web.whatsapp.com/"
  },
]


  }

  ngOnInit(): void {
    setInterval(() => {this.CambiarImagen()}, 6000);
  }
  CambiarImagen(){
    let imagen: any = document.getElementById('slide');
    let ruta: any = document.getElementById('ruta');
    imagen.src = this.Coleccion[this.i];
    ruta.href = this.Direcciones[this.i];
    this.i = (this.i < this.Coleccion.length - 1) ? this.i+1 : 0;
  }

}
