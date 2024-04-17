import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcurrentPositionEditComponent } from './concurrent-position-edit.component';

describe('ConcurrentPositionEditComponent', () => {
  let component: ConcurrentPositionEditComponent;
  let fixture: ComponentFixture<ConcurrentPositionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcurrentPositionEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcurrentPositionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
