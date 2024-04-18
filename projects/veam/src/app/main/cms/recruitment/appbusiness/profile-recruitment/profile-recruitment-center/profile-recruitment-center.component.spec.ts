import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRecruitmentCenterComponent } from './profile-recruitment-center.component';

describe('ProfileRecruitmentCenterComponent', () => {
  let component: ProfileRecruitmentCenterComponent;
  let fixture: ComponentFixture<ProfileRecruitmentCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileRecruitmentCenterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileRecruitmentCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
