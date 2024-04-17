import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveOvertimeComponent } from './approve-overtime.component';

describe('ApproveOvertimeComponent', () => {
  let component: ApproveOvertimeComponent;
  let fixture: ComponentFixture<ApproveOvertimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveOvertimeComponent]
    });
    fixture = TestBed.createComponent(ApproveOvertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
