import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsideCompanyComponent } from './outside-company.component';

describe('OutsideCompanyComponent', () => {
  let component: OutsideCompanyComponent;
  let fixture: ComponentFixture<OutsideCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutsideCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutsideCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
