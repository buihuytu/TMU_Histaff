import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencyDictEditComponent } from './competency-dict-edit.component';

describe('CompetencyDictEditComponent', () => {
  let component: CompetencyDictEditComponent;
  let fixture: ComponentFixture<CompetencyDictEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetencyDictEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetencyDictEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
