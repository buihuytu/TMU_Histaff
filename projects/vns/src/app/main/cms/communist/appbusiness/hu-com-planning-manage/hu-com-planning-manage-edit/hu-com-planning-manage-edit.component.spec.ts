import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuComPlanningManageEditComponent } from './hu-com-planning-manage-edit.component';

describe('HuComPlanningManageEditComponent', () => {
  let component: HuComPlanningManageEditComponent;
  let fixture: ComponentFixture<HuComPlanningManageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuComPlanningManageEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HuComPlanningManageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
