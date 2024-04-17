import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnningChartComponent } from './learnning-chart.component';

describe('LearnningChartComponent', () => {
  let component: LearnningChartComponent;
  let fixture: ComponentFixture<LearnningChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnningChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnningChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
