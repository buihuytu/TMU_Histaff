import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommendRoutingModule } from './commend-routing.module';
import { CommendComponent } from './commend.component';
import { TranslatePipe } from 'ngx-histaff-alpha';


@NgModule({
  declarations: [
    CommendComponent
  ],
  imports: [
    CommonModule,
    CommendRoutingModule,
    TranslatePipe,
  ]
})
export class CommendModule { }
