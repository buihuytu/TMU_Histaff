import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuProvinceComponent } from './hu-province.component';

describe('HuProvinceComponent', () => {
  let component: HuProvinceComponent;
  let fixture: ComponentFixture<HuProvinceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuProvinceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
