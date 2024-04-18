import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherlistTypeComponent } from './otherlist-type.component';

describe('OtherlistTypeComponent', () => {
  let component: OtherlistTypeComponent;
  let fixture: ComponentFixture<OtherlistTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherlistTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherlistTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
