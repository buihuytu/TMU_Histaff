import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCompetencyEditComponent } from './group-competency-edit.component';

describe('GroupCompetencyEditComponent', () => {
  let component: GroupCompetencyEditComponent;
  let fixture: ComponentFixture<GroupCompetencyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupCompetencyEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupCompetencyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
