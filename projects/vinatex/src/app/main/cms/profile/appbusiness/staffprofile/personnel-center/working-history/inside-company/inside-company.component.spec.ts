import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideCompanyComponent } from './inside-company.component';

describe('InsideCompanyComponent', () => {
  let component: InsideCompanyComponent;
  let fixture: ComponentFixture<InsideCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsideCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsideCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
