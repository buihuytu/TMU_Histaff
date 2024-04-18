import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuNationComponent } from './hu-nation.component';

describe('HuNationComponent', () => {
  let component: HuNationComponent;
  let fixture: ComponentFixture<HuNationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuNationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuNationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
