import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectEditComponent } from './object-edit.component';

describe('ObjectEditComponent', () => {
  let component: ObjectEditComponent;
  let fixture: ComponentFixture<ObjectEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
