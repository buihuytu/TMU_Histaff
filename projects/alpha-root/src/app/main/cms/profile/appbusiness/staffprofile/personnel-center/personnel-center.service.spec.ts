import { TestBed } from '@angular/core/testing';

import { PersonnelCenterService } from './personnel-center.service';

describe('PersonnelCenterService', () => {
  let service: PersonnelCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonnelCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
