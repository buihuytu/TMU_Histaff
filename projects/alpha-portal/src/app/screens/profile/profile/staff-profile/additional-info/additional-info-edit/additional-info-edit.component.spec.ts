import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalInfoEditComponent } from './additional-info-edit.component';

describe('AdditionalInfoEditComponent', () => {
  let component: AdditionalInfoEditComponent;
  let fixture: ComponentFixture<AdditionalInfoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalInfoEditComponent]
    });
    fixture = TestBed.createComponent(AdditionalInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
