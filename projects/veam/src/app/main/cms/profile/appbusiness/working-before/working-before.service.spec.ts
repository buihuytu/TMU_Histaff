import { TestBed } from '@angular/core/testing';

import { WorkingBeforeService } from './working-before.service';

describe('WorkingBeforeService', () => {
  let service: WorkingBeforeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkingBeforeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
