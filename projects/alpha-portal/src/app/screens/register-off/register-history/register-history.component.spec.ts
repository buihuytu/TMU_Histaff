import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterHistoryComponent } from './register-history.component';

describe('RegisterHistoryComponent', () => {
  let component: RegisterHistoryComponent;
  let fixture: ComponentFixture<RegisterHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterHistoryComponent]
    });
    fixture = TestBed.createComponent(RegisterHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
