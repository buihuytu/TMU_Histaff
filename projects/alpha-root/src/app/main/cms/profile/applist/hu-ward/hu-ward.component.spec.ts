import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuWardComponent } from './hu-ward.component';

describe('HuWardComponent', () => {
  let component: HuWardComponent;
  let fixture: ComponentFixture<HuWardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuWardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuWardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
