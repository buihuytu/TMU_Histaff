import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SysActionRoutingModule } from './sys-action-routing.module';
import { RouterModule } from '@angular/router';
import { CorePageListComponent, CorePageHeaderComponent, CorePageEditComponent } from 'ngx-histaff-alpha';
@NgModule({

  imports: [
    CommonModule,
    SysActionRoutingModule,
    CorePageListComponent,
    CorePageHeaderComponent,
    RouterModule,
    CorePageEditComponent,
  ]
})
export class SysActionModule { }
