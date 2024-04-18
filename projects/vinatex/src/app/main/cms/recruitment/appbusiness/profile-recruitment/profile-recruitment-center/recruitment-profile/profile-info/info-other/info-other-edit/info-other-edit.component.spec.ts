import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoOtherEditComponent } from './info-other-edit.component';

describe('InfoOtherEditComponent', () => {
  let component: InfoOtherEditComponent;
  let fixture: ComponentFixture<InfoOtherEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoOtherEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoOtherEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
