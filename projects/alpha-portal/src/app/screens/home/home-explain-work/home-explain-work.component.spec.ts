import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeExplainWorkComponent } from './home-explain-work.component';

describe('HomeExplainWorkComponent', () => {
  let component: HomeExplainWorkComponent;
  let fixture: ComponentFixture<HomeExplainWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeExplainWorkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeExplainWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
