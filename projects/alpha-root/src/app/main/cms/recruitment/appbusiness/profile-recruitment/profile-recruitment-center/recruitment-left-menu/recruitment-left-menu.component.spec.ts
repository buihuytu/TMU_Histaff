import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentLeftMenuComponent } from './recruitment-left-menu.component';

describe('RecruitmentLeftMenuComponent', () => {
  let component: RecruitmentLeftMenuComponent;
  let fixture: ComponentFixture<RecruitmentLeftMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruitmentLeftMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruitmentLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
