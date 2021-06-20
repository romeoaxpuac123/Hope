import { TestBed } from '@angular/core/testing';

import { MicroserviciosService } from './microservicios.service';

describe('MicroserviciosService', () => {
  let service: MicroserviciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicroserviciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
