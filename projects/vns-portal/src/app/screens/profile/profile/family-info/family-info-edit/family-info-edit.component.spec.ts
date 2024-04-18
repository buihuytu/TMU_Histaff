import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyInfoEditComponent } from './family-info-edit.component';

describe('FamilyInfoEditComponent', () => {
  let component: FamilyInfoEditComponent;
  let fixture: ComponentFixture<FamilyInfoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FamilyInfoEditComponent]
    });
    fixture = TestBed.createComponent(FamilyInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
