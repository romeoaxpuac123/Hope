import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarCuentaComponent } from './validar-cuenta.component';

describe('ValidarCuentaComponent', () => {
  let component: ValidarCuentaComponent;
  let fixture: ComponentFixture<ValidarCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidarCuentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
