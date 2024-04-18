import { ComponentFixture, TestBed } from '@angular/core/testing';

import InsWherehealthEditComponent from './ins-wherehealth-edit.component';

describe('InsWherehealthEditComponent', () => {
  let component: InsWherehealthEditComponent;
  let fixture: ComponentFixture<InsWherehealthEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsWherehealthEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InsWherehealthEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
