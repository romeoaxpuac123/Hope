import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-encabezado2',
  templateUrl: './encabezado2.component.html',
  styleUrls: ['./encabezado2.component.css']
})
export class Encabezado2Component implements OnInit {
  public cabeza: any = document.getElementById('encabezado');
  constructor() { }

  ngOnInit(): void {
  }

}
