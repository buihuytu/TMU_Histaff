import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConcurrentRoutingModule } from './concurrent-routing.module';
import { ConcurrentComponent } from './concurrent.component';


@NgModule({
  declarations: [
    ConcurrentComponent
  ],
  imports: [
    CommonModule,
    ConcurrentRoutingModule
  ]
})
export class ConcurrentModule { }
