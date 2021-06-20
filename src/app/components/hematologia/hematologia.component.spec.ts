import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HematologiaComponent } from './hematologia.component';

describe('HematologiaComponent', () => {
  let component: HematologiaComponent;
  let fixture: ComponentFixture<HematologiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HematologiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HematologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
