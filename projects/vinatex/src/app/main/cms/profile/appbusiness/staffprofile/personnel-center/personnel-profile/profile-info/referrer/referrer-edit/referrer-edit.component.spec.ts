import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferrerEditComponent } from './referrer-edit.component';

describe('ReferrerEditComponent', () => {
  let component: ReferrerEditComponent;
  let fixture: ComponentFixture<ReferrerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferrerEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferrerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
