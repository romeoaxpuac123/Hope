import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePacienteComponent } from './reporte-paciente.component';

describe('ReportePacienteComponent', () => {
  let component: ReportePacienteComponent;
  let fixture: ComponentFixture<ReportePacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportePacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportePacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
