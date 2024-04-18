import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsTypeComponent } from './ins-type.component';

describe('InsTypeComponent', () => {
  let component: InsTypeComponent;
  let fixture: ComponentFixture<InsTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
