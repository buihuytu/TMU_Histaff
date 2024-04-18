import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionWrapperComponent } from './decision-wrapper.component';

describe('DecisionWrapperComponent', () => {
  let component: DecisionWrapperComponent;
  let fixture: ComponentFixture<DecisionWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecisionWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DecisionWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
