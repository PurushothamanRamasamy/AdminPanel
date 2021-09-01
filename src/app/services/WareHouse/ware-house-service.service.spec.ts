import { TestBed } from '@angular/core/testing';

import { WareHouseServiceService } from './ware-house-service.service';

describe('WareHouseServiceService', () => {
  let service: WareHouseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WareHouseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
