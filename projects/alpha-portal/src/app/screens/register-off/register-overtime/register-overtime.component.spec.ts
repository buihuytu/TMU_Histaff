import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOvertimeComponent } from './register-overtime.component';

describe('RegisterOvertimeComponent', () => {
  let component: RegisterOvertimeComponent;
  let fixture: ComponentFixture<RegisterOvertimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterOvertimeComponent]
    });
    fixture = TestBed.createComponent(RegisterOvertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
