import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuNationEditComponent } from './hu-nation-edit.component';

describe('HuNationEditComponent', () => {
  let component: HuNationEditComponent;
  let fixture: ComponentFixture<HuNationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuNationEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuNationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
