import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveEducationComponent } from './approve-education.component';

describe('ApproveEducationComponent', () => {
  let component: ApproveEducationComponent;
  let fixture: ComponentFixture<ApproveEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveEducationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
