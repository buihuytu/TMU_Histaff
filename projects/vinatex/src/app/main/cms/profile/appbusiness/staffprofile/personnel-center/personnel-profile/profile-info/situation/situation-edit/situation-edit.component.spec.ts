import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituationEditComponent } from './situation-edit.component';

describe('SituationEditComponent', () => {
  let component: SituationEditComponent;
  let fixture: ComponentFixture<SituationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SituationEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SituationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
