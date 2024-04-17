import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtotherlistComponent } from './atotherlist.component';

describe('AtotherlistComponent', () => {
  let component: AtotherlistComponent;
  let fixture: ComponentFixture<AtotherlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtotherlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtotherlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
