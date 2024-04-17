import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpMonthChartComponent } from './emp-month-chart.component';

describe('EmpMonthChartComponent', () => {
  let component: EmpMonthChartComponent;
  let fixture: ComponentFixture<EmpMonthChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpMonthChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpMonthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
