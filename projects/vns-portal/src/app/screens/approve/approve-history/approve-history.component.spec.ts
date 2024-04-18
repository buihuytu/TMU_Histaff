import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveHistoryComponent } from './approve-history.component';

describe('ApproveHistoryComponent', () => {
  let component: ApproveHistoryComponent;
  let fixture: ComponentFixture<ApproveHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveHistoryComponent]
    });
    fixture = TestBed.createComponent(ApproveHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
