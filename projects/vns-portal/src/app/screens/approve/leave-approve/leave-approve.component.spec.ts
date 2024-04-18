import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApproveComponent } from './leave-approve.component';

describe('LeaveApproveComponent', () => {
  let component: LeaveApproveComponent;
  let fixture: ComponentFixture<LeaveApproveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveApproveComponent]
    });
    fixture = TestBed.createComponent(LeaveApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
