import { TestBed } from '@angular/core/testing';

import { ShedService } from './shed.service';

describe('ShedService', () => {
  let service: ShedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
