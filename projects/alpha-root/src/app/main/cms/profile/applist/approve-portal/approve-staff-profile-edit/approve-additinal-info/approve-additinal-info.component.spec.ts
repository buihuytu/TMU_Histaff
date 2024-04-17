import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAdditinalInfoComponent } from './approve-additinal-info.component';

describe('ApproveAdditinalInfoComponent', () => {
  let component: ApproveAdditinalInfoComponent;
  let fixture: ComponentFixture<ApproveAdditinalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveAdditinalInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveAdditinalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
