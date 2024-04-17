import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOffEditComponent } from './register-off-edit.component';

describe('RegisterOffEditComponent', () => {
  let component: RegisterOffEditComponent;
  let fixture: ComponentFixture<RegisterOffEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterOffEditComponent]
    });
    fixture = TestBed.createComponent(RegisterOffEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
