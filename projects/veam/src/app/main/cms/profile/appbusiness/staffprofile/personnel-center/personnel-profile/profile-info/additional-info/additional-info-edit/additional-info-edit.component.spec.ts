import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalInfoEditComponent } from './additional-info-edit.component';

describe('AdditionalInfoEditComponent', () => {
  let component: AdditionalInfoEditComponent;
  let fixture: ComponentFixture<AdditionalInfoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalInfoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
