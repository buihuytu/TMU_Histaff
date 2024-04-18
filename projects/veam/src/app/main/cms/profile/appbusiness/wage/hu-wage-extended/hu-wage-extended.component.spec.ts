import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuWageExtendedComponent } from './hu-wage-extended.component';

describe('HuWageExtendedComponent', () => {
  let component: HuWageExtendedComponent;
  let fixture: ComponentFixture<HuWageExtendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuWageExtendedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HuWageExtendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
