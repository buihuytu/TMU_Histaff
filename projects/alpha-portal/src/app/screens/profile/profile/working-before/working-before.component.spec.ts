import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingBeforeComponent } from './working-before.component';

describe('WorkingBeforeComponent', () => {
  let component: WorkingBeforeComponent;
  let fixture: ComponentFixture<WorkingBeforeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkingBeforeComponent]
    });
    fixture = TestBed.createComponent(WorkingBeforeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
