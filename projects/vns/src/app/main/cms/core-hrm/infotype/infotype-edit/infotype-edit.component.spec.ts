import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfotypeEditComponent } from './infotype-edit.component';

describe('InfotypeEditComponent', () => {
  let component: InfotypeEditComponent;
  let fixture: ComponentFixture<InfotypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfotypeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfotypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
