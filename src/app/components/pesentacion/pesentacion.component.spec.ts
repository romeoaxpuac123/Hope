import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesentacionComponent } from './pesentacion.component';

describe('PesentacionComponent', () => {
  let component: PesentacionComponent;
  let fixture: ComponentFixture<PesentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesentacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PesentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
