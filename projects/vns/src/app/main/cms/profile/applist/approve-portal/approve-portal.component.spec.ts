import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePortalComponent } from './approve-portal.component';

describe('ApprovePortalComponent', () => {
  let component: ApprovePortalComponent;
  let fixture: ComponentFixture<ApprovePortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovePortalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovePortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
