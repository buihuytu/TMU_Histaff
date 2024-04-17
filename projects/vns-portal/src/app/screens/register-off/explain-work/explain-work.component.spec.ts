import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplainWorkComponent } from './explain-work.component';

describe('ExplainWorkComponent', () => {
  let component: ExplainWorkComponent;
  let fixture: ComponentFixture<ExplainWorkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExplainWorkComponent]
    });
    fixture = TestBed.createComponent(ExplainWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
