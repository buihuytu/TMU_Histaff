import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPrintChartComponent } from './custom-print-chart.component';

describe('CustomPrintChartComponent', () => {
  let component: CustomPrintChartComponent;
  let fixture: ComponentFixture<CustomPrintChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomPrintChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomPrintChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
