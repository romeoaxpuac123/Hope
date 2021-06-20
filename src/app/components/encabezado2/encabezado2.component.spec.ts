import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Encabezado2Component } from './encabezado2.component';

describe('Encabezado2Component', () => {
  let component: Encabezado2Component;
  let fixture: ComponentFixture<Encabezado2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Encabezado2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Encabezado2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
