import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HucommendEditComponent } from './hucommend-edit.component';

describe('HucommendEditComponent', () => {
  let component: HucommendEditComponent;
  let fixture: ComponentFixture<HucommendEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HucommendEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HucommendEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
