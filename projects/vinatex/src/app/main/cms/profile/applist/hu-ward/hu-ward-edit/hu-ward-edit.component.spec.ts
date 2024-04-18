import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuWardEditComponent } from './hu-ward-edit.component';

describe('HuWardEditComponent', () => {
  let component: HuWardEditComponent;
  let fixture: ComponentFixture<HuWardEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuWardEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuWardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
