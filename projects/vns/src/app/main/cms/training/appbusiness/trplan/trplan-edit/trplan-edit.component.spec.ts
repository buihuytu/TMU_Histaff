import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrplanEditComponent } from './trplan-edit.component';

describe('TrplanEditComponent', () => {
  let component: TrplanEditComponent;
  let fixture: ComponentFixture<TrplanEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrplanEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrplanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
