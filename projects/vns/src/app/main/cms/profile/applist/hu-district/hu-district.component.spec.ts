import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuDistrictComponent } from './hu-district.component';

describe('HuDistrictComponent', () => {
  let component: HuDistrictComponent;
  let fixture: ComponentFixture<HuDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuDistrictComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
