import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCompetencyComponent } from './group-competency.component';

describe('GroupCompetencyComponent', () => {
  let component: GroupCompetencyComponent;
  let fixture: ComponentFixture<GroupCompetencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupCompetencyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupCompetencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
