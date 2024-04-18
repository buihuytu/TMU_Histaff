import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryApproveComponent } from './history-approve.component';

describe('HistoryApproveComponent', () => {
  let component: HistoryApproveComponent;
  let fixture: ComponentFixture<HistoryApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryApproveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
