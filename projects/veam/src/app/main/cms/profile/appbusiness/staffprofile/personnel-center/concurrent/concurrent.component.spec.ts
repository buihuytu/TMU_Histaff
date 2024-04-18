import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcurrentComponent } from './concurrent.component';

describe('ConcurrentComponent', () => {
  let component: ConcurrentComponent;
  let fixture: ComponentFixture<ConcurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcurrentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
