import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelInfoEditComponent } from './level-info-edit.component';

describe('LevelInfoEditComponent', () => {
  let component: LevelInfoEditComponent;
  let fixture: ComponentFixture<LevelInfoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelInfoEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LevelInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
