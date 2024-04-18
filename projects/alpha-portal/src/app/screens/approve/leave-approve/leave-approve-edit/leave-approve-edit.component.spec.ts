import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApproveEditComponent } from './leave-approve-edit.component';

describe('LeaveApproveEditComponent', () => {
  let component: LeaveApproveEditComponent;
  let fixture: ComponentFixture<LeaveApproveEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveApproveEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaveApproveEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
