import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuEvaluateImportComponent } from './hu-evaluate-import.component';

describe('HuEvaluateImportComponent', () => {
  let component: HuEvaluateImportComponent;
  let fixture: ComponentFixture<HuEvaluateImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuEvaluateImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuEvaluateImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
