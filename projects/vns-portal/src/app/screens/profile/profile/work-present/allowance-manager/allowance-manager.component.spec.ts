import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowanceManagerComponent } from './allowance-manager.component';

describe('AllowanceManagerComponent', () => {
  let component: AllowanceManagerComponent;
  let fixture: ComponentFixture<AllowanceManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllowanceManagerComponent]
    });
    fixture = TestBed.createComponent(AllowanceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
