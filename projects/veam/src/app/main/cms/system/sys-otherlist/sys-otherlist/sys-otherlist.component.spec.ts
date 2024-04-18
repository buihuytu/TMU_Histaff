import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysOtherlistComponent } from './sys-otherlist.component';

describe('SysOtherlistComponent', () => {
  let component: SysOtherlistComponent;
  let fixture: ComponentFixture<SysOtherlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysOtherlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SysOtherlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
