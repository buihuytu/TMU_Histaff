import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveWorkingBeforeComponent } from './approve-working-before.component';

describe('ApproveWorkingBeforeComponent', () => {
  let component: ApproveWorkingBeforeComponent;
  let fixture: ComponentFixture<ApproveWorkingBeforeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveWorkingBeforeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveWorkingBeforeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
