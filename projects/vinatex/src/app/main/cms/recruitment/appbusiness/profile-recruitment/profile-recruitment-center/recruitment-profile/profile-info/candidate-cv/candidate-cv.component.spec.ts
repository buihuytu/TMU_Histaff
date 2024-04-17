import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateCvComponent } from './candidate-cv.component';

describe('CandidateCvComponent', () => {
  let component: CandidateCvComponent;
  let fixture: ComponentFixture<CandidateCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateCvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandidateCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
