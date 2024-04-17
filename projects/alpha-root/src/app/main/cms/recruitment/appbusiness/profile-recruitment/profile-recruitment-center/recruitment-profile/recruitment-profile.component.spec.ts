import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentProfileComponent } from './recruitment-profile.component';

describe('RecruitmentProfileComponent', () => {
  let component: RecruitmentProfileComponent;
  let fixture: ComponentFixture<RecruitmentProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruitmentProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruitmentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
