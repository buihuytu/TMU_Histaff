import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipeDataComponent } from './swipedata.component';

describe('SwipedataComponent', () => {
  let component: SwipeDataComponent;
  let fixture: ComponentFixture<SwipeDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwipeDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwipeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
