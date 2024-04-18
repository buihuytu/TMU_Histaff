import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommendComponent } from './commend.component';

describe('CommendComponent', () => {
  let component: CommendComponent;
  let fixture: ComponentFixture<CommendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
