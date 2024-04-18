import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencyEditComponent } from './competency-edit.component';

describe('CompetencyEditComponent', () => {
  let component: CompetencyEditComponent;
  let fixture: ComponentFixture<CompetencyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetencyEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetencyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
