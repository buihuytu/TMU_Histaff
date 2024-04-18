import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeApproveEditComponent } from './overtime-approve-edit.component';

describe('OvertimeApproveEditComponent', () => {
  let component: OvertimeApproveEditComponent;
  let fixture: ComponentFixture<OvertimeApproveEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OvertimeApproveEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OvertimeApproveEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
