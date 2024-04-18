import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryImportAddComponent } from './salary-import-add.component';

describe('SalaryImportAddComponent', () => {
  let component: SalaryImportAddComponent;
  let fixture: ComponentFixture<SalaryImportAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryImportAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryImportAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
