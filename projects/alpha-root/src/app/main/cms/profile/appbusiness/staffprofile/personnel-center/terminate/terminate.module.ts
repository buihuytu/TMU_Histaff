import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerminateRoutingModule } from './terminate-routing.module';
import { TerminateComponent } from './terminate.component';
import { TranslatePipe } from 'ngx-histaff-alpha';


@NgModule({
  declarations: [
    TerminateComponent
  ],
  imports: [
    CommonModule,
    TranslatePipe,
    TerminateRoutingModule,
  ]
})
export class TerminateModule { }
