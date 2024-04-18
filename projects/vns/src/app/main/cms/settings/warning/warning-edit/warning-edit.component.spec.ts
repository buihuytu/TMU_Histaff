import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningEditComponent } from './warning-edit.component';

describe('WarningEditComponent', () => {
  let component: WarningEditComponent;
  let fixture: ComponentFixture<WarningEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarningEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarningEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
