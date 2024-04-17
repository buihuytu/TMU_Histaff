import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogFileListRoutingModule } from './log-file-list-routing.module';
import { LogFileListComponent } from './log-file-list.component';
import { CorePageHeaderComponent } from 'ngx-histaff-alpha';


@NgModule({
  declarations: [
    LogFileListComponent
  ],
  imports: [
    CommonModule,
    LogFileListRoutingModule,
    CorePageHeaderComponent,
  ]
})
export class LogFileListModule { }
