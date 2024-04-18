import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrplanComponent } from './trplan.component';

describe('TrplanComponent', () => {
  let component: TrplanComponent;
  let fixture: ComponentFixture<TrplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrplanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
