import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeniorityChartComponent } from './seniority-chart.component';

describe('SeniorityChartComponent', () => {
  let component: SeniorityChartComponent;
  let fixture: ComponentFixture<SeniorityChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeniorityChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeniorityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
