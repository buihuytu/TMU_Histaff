import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupuserCloneComponent } from './groupuser-clone.component';

describe('GroupuserCloneComponent', () => {
  let component: GroupuserCloneComponent;
  let fixture: ComponentFixture<GroupuserCloneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupuserCloneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupuserCloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
