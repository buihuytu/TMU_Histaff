import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuEvaluateComponent } from './hu-evaluate.component';

describe('HuEvaluateComponent', () => {
  let component: HuEvaluateComponent;
  let fixture: ComponentFixture<HuEvaluateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuEvaluateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuEvaluateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
