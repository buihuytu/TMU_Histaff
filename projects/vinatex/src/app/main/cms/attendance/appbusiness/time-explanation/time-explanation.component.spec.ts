import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeExplanationComponent } from './time-explanation.component';

describe('TimeExplanationComponent', () => {
  let component: TimeExplanationComponent;
  let fixture: ComponentFixture<TimeExplanationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeExplanationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
