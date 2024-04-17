import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisciplineRoutingModule } from './discipline-routing.module';
import { DisciplineComponent } from './discipline.component';
import { TranslatePipe } from 'ngx-histaff-alpha';


@NgModule({
  declarations: [
    DisciplineComponent
  ],
  imports: [
    CommonModule,
    TranslatePipe,
    DisciplineRoutingModule,
  ]
})
export class DisciplineModule { }
