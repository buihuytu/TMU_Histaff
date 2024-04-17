import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsTypeEditComponent } from './ins-type-edit.component';

describe('InsTypeEditComponent', () => {
  let component: InsTypeEditComponent;
  let fixture: ComponentFixture<InsTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsTypeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
