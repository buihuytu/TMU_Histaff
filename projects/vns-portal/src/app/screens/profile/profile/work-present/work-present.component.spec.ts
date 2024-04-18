import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPresentComponent } from './work-present.component';

describe('WorkPresentComponent', () => {
  let component: WorkPresentComponent;
  let fixture: ComponentFixture<WorkPresentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkPresentComponent]
    });
    fixture = TestBed.createComponent(WorkPresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
