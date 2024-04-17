import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationComImportComponent } from './evaluation-com-import.component';

describe('EvaluationComImportComponent', () => {
  let component: EvaluationComImportComponent;
  let fixture: ComponentFixture<EvaluationComImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationComImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationComImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
