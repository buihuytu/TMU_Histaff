import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogFileListComponent } from './log-file-list.component';

describe('LogFileListComponent', () => {
  let component: LogFileListComponent;
  let fixture: ComponentFixture<LogFileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogFileListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
