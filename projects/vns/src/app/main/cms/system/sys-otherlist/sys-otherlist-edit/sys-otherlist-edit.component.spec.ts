import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysOtherlistEditComponent } from './sys-otherlist-edit.component';

describe('SysOtherlistEditComponent', () => {
  let component: SysOtherlistEditComponent;
  let fixture: ComponentFixture<SysOtherlistEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysOtherlistEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SysOtherlistEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
