import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterHistoryEditComponent } from './register-history-edit.component';

describe('RegisterHistoryEditComponent', () => {
  let component: RegisterHistoryEditComponent;
  let fixture: ComponentFixture<RegisterHistoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterHistoryEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterHistoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
