import { TestBed } from '@angular/core/testing';

import { InsArisingService } from './ins-arising.service';

describe('InsArisingService', () => {
  let service: InsArisingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsArisingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
