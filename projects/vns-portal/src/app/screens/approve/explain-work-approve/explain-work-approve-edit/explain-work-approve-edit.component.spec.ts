import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplainWorkApproveEditComponent } from './explain-work-approve-edit.component';

describe('ExplainWorkApproveEditComponent', () => {
  let component: ExplainWorkApproveEditComponent;
  let fixture: ComponentFixture<ExplainWorkApproveEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplainWorkApproveEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExplainWorkApproveEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
