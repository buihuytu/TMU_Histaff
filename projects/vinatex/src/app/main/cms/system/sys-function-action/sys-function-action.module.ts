import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SysFunctionActionRoutingModule } from './sys-function-action-routing.module';

import { RouterModule } from '@angular/router';
import { CorePageListComponent, CorePageHeaderComponent, CorePageEditComponent } from 'ngx-histaff-alpha';


@NgModule({

  imports: [
    CommonModule,
    SysFunctionActionRoutingModule,
    CorePageListComponent,
    CorePageHeaderComponent,
    RouterModule,
    CorePageEditComponent,
  ]
})
export class SysFunctionActionModule { }
