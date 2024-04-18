import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkingRoutingModule } from './working-routing.module';
import { WorkingComponent } from './working.component';
import { TranslatePipe } from 'ngx-histaff-alpha';


@NgModule({
  declarations: [
    WorkingComponent
  ],
  imports: [
    CommonModule,
    WorkingRoutingModule,
    TranslatePipe,
  ]
})
export class WorkingModule { }
