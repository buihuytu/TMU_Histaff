import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HucommendImportComponent } from './hucommend-import.component';

describe('HucommendImportComponent', () => {
  let component: HucommendImportComponent;
  let fixture: ComponentFixture<HucommendImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HucommendImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HucommendImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
