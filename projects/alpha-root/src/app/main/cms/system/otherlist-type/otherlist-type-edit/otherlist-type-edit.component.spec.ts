import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherlistTypeEditComponent } from './otherlist-type-edit.component';

describe('OtherlistTypeEditComponent', () => {
  let component: OtherlistTypeEditComponent;
  let fixture: ComponentFixture<OtherlistTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherlistTypeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherlistTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
