import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionImportComponent } from './decision-import.component';

describe('DecisionImportComponent', () => {
  let component: DecisionImportComponent;
  let fixture: ComponentFixture<DecisionImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecisionImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecisionImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
