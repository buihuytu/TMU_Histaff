import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysMailTemplateComponent } from './sys-mail-template.component';

describe('SysMailTemplateComponent', () => {
  let component: SysMailTemplateComponent;
  let fixture: ComponentFixture<SysMailTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SysMailTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SysMailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
