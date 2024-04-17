import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveStaffProfileEditComponent } from './approve-staff-profile-edit.component';

describe('ApproveStaffProfileEditComponent', () => {
  let component: ApproveStaffProfileEditComponent;
  let fixture: ComponentFixture<ApproveStaffProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveStaffProfileEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveStaffProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
