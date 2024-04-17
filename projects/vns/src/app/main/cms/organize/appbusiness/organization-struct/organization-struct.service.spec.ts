import { TestBed } from '@angular/core/testing';

import { OrganizationStructService } from './organization-struct.service';

describe('OrganizationStructService', () => {
  let service: OrganizationStructService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizationStructService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
