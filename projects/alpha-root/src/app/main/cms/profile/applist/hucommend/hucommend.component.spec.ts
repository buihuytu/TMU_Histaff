import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HucommendComponent } from './hucommend.component';

describe('HucommendComponent', () => {
  let component: HucommendComponent;
  let fixture: ComponentFixture<HucommendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HucommendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HucommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
