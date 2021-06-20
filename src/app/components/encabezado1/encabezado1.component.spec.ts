import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Encabezado1Component } from './encabezado1.component';

describe('Encabezado1Component', () => {
  let component: Encabezado1Component;
  let fixture: ComponentFixture<Encabezado1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Encabezado1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Encabezado1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
