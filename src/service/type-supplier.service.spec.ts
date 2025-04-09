import { TestBed } from '@angular/core/testing';

import { TypeSupplierService } from './type-supplier.service';

describe('TypeSupplierService', () => {
  let service: TypeSupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeSupplierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
