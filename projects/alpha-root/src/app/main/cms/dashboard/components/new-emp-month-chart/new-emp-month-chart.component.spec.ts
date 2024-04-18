import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmpMonthChartComponent } from './new-emp-month-chart.component';

describe('EmpMonthChartComponent', () => {
  let component: NewEmpMonthChartComponent;
  let fixture: ComponentFixture<NewEmpMonthChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewEmpMonthChartComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NewEmpMonthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
