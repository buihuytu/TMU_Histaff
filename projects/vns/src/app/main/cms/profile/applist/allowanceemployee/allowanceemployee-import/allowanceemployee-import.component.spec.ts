import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowanceemployeeImportComponent } from './allowanceemployee-import.component';

describe('AllowanceemployeeImportComponent', () => {
  let component: AllowanceemployeeImportComponent;
  let fixture: ComponentFixture<AllowanceemployeeImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllowanceemployeeImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllowanceemployeeImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
