import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBarsComponent } from './activity-bars.component';

describe('ActivityBarsComponent', () => {
  let component: ActivityBarsComponent;
  let fixture: ComponentFixture<ActivityBarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityBarsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
