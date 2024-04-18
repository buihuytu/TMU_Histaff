import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommendComponent } from './commend.component';

describe('CommendComponent', () => {
  let component: CommendComponent;
  let fixture: ComponentFixture<CommendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommendComponent]
    });
    fixture = TestBed.createComponent(CommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
