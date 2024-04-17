import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicEditComponent } from './basic-edit.component';

describe('BasicEditComponent', () => {
  let component: BasicEditComponent;
  let fixture: ComponentFixture<BasicEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
