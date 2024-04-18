import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcurrentlyComponent } from './concurrently.component';

describe('ConcurrentlyComponent', () => {
  let component: ConcurrentlyComponent;
  let fixture: ComponentFixture<ConcurrentlyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConcurrentlyComponent]
    });
    fixture = TestBed.createComponent(ConcurrentlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
