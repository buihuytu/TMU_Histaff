import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsWherehealthComponent } from './ins-wherehealth.component';

describe('InsWherehealthComponent', () => {
  let component: InsWherehealthComponent;
  let fixture: ComponentFixture<InsWherehealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsWherehealthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsWherehealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
