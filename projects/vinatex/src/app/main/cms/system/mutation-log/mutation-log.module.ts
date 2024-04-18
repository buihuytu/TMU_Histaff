import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MutationLogRoutingModule } from './mutation-log-routing.module';
import { CorePageListComponent } from 'ngx-histaff-alpha';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MutationLogRoutingModule,
    CorePageListComponent
  ]
})
export class MutationLogModule { }
