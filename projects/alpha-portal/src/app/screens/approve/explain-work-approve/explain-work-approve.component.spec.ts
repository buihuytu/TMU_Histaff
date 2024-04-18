import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplainWorkApproveComponent } from './explain-work-approve.component';

describe('ExplainWorkApproveComponent', () => {
  let component: ExplainWorkApproveComponent;
  let fixture: ComponentFixture<ExplainWorkApproveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExplainWorkApproveComponent],
    });
    fixture = TestBed.createComponent(ExplainWorkApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
