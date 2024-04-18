import { TestBed } from '@angular/core/testing';

import { OrganizationStructComponentResolver } from './organization-struct-component.resolver';

describe('OrganizationStructComponentResolver', () => {
  let resolver: OrganizationStructComponentResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OrganizationStructComponentResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
