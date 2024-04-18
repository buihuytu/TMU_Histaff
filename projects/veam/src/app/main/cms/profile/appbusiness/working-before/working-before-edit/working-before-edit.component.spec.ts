import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingBeforeEditComponent } from './working-before-edit.component';

describe('WorkingBeforeEditComponent', () => {
  let component: WorkingBeforeEditComponent;
  let fixture: ComponentFixture<WorkingBeforeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingBeforeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkingBeforeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
