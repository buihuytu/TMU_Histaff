import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuDistrictEditComponent } from './hu-district-edit.component';

describe('HuDistrictEditComponent', () => {
  let component: HuDistrictEditComponent;
  let fixture: ComponentFixture<HuDistrictEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuDistrictEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuDistrictEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
