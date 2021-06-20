import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encabezado1',
  templateUrl: './encabezado1.component.html',
  styleUrls: ['./encabezado1.component.css']
})
export class Encabezado1Component implements OnInit {
  public OnnSesion:boolean = false;
  constructor() { 
    this.OnnSesion = true;
  }

  ngOnInit(): void {
  }

}
