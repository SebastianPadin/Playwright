import { TestBed } from '@angular/core/testing';

import { MovementKardexService } from './movement-kardex.service';

describe('MovementKardexService', () => {
  let service: MovementKardexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovementKardexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
