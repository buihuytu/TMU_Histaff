import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RcHrYearPlaningEditComponent } from './rc-hr-year-planing-edit.component';

describe('RcHrYearPlaningEditComponent', () => {
  let component: RcHrYearPlaningEditComponent;
  let fixture: ComponentFixture<RcHrYearPlaningEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RcHrYearPlaningEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RcHrYearPlaningEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
