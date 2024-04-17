import { TestBed } from '@angular/core/testing';

import { TimeTypeService } from './timetype.service';

describe('TimeTypeService', () => {
  let service: TimeTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
