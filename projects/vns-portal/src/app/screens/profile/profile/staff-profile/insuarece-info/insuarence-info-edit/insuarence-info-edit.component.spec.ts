import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuarenceInfoEditComponent } from './insuarence-info-edit.component';

describe('InsuarenceInfoEditComponent', () => {
  let component: InsuarenceInfoEditComponent;
  let fixture: ComponentFixture<InsuarenceInfoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsuarenceInfoEditComponent]
    });
    fixture = TestBed.createComponent(InsuarenceInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
