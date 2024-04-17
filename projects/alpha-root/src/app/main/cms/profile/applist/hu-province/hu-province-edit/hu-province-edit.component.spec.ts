import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuProvinceEditComponent } from './hu-province-edit.component';

describe('HuProvinceEditComponent', () => {
  let component: HuProvinceEditComponent;
  let fixture: ComponentFixture<HuProvinceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuProvinceEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuProvinceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
