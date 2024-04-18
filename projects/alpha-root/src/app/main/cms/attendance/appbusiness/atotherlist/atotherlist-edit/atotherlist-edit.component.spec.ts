import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtotherlistEditComponent } from './atotherlist-edit.component';

describe('AtotherlistEditComponent', () => {
  let component: AtotherlistEditComponent;
  let fixture: ComponentFixture<AtotherlistEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtotherlistEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtotherlistEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
