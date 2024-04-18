import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateCvEditComponent } from './candidate-cv-edit.component';

describe('CandidateCvEditComponent', () => {
  let component: CandidateCvEditComponent;
  let fixture: ComponentFixture<CandidateCvEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateCvEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandidateCvEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
