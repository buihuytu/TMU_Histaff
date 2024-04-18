import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeProcessApproveComponent } from './se-processapprove.component';

describe('SeProcessApproveComponent', () => {
  let component: SeProcessApproveComponent;
  let fixture: ComponentFixture<SeProcessApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeProcessApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeProcessApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
