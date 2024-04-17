import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollNoteComponent } from './payroll-note.component';

describe('PayrollNoteComponent', () => {
  let component: PayrollNoteComponent;
  let fixture: ComponentFixture<PayrollNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayrollNoteComponent]
    });
    fixture = TestBed.createComponent(PayrollNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
