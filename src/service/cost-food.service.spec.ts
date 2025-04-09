import { TestBed } from '@angular/core/testing';

import { CostFoodService } from './cost-food.service';

describe('CostFoodService', () => {
  let service: CostFoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostFoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
