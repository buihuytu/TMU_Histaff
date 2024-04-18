import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfotypeComponent } from './infotype.component';

describe('InfotypeComponent', () => {
  let component: InfotypeComponent;
  let fixture: ComponentFixture<InfotypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfotypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfotypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
