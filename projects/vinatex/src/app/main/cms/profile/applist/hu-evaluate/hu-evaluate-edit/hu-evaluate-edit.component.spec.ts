import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuEvaluateEditComponent } from './hu-evaluate-edit.component';

describe('HuEvaluateEditComponent', () => {
  let component: HuEvaluateEditComponent;
  let fixture: ComponentFixture<HuEvaluateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuEvaluateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuEvaluateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
