import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeImportComponent } from './time-import.component';

describe('TimeImportComponent', () => {
  let component: TimeImportComponent;
  let fixture: ComponentFixture<TimeImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
