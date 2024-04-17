import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuEvaluateConcurrentImportComponent } from './hu-evaluate-concurrent-import.component';

describe('HuEvaluateConcurrentImportComponent', () => {
  let component: HuEvaluateConcurrentImportComponent;
  let fixture: ComponentFixture<HuEvaluateConcurrentImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuEvaluateConcurrentImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuEvaluateConcurrentImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
