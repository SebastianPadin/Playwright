import { TestBed } from '@angular/core/testing';

import { TypeKardexService } from './type-kardex.service';

describe('TypeKardexService', () => {
  let service: TypeKardexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeKardexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
