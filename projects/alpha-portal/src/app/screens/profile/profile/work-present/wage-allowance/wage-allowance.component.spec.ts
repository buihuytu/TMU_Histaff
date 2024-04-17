import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WageAllowanceComponent } from './wage-allowance.component';

describe('WageAllowanceComponent', () => {
  let component: WageAllowanceComponent;
  let fixture: ComponentFixture<WageAllowanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WageAllowanceComponent]
    });
    fixture = TestBed.createComponent(WageAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
