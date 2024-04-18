import { TestBed } from '@angular/core/testing';

import { MlsResolver } from './mls.resolver';

describe('MlsResolver', () => {
  let resolver: MlsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MlsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
