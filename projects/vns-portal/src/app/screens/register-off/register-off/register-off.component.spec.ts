import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOffComponent } from './register-off.component';

describe('RegisterOffComponent', () => {
  let component: RegisterOffComponent;
  let fixture: ComponentFixture<RegisterOffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterOffComponent]
    });
    fixture = TestBed.createComponent(RegisterOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
