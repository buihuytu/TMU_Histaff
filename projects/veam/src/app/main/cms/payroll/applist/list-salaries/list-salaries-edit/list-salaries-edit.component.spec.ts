import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSalariesEditComponent } from './list-salaries-edit.component';

describe('ListSalariesEditComponent', () => {
  let component: ListSalariesEditComponent;
  let fixture: ComponentFixture<ListSalariesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSalariesEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSalariesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
