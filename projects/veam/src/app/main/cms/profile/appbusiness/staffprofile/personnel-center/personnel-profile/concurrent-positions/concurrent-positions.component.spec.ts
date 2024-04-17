import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcurrentPositionsComponent } from './concurrent-positions.component';

describe('ConcurrentPositionsComponent', () => {
  let component: ConcurrentPositionsComponent;
  let fixture: ComponentFixture<ConcurrentPositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcurrentPositionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcurrentPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
