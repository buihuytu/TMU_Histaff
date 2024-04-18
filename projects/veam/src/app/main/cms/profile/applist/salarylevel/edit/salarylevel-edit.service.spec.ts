/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SalaryLevelEditService } from './salarylevel-edit.service';

describe('Service: SalarylevelEdit', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalaryLevelEditService]
    });
  });

  it('should ...', inject([SalaryLevelEditService], (service: SalaryLevelEditService) => {
    expect(service).toBeTruthy();
  }));
});
