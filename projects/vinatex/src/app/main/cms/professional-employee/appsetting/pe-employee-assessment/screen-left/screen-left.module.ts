import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScreenLeftComponent } from './screen-left.component';
import { CoreAccordionComponent, CoreOrgTreeComponent, CorePageListComponent } from 'ngx-histaff-alpha';

@NgModule({
  declarations: [
    ScreenLeftComponent
  ],
  imports: [
    CommonModule,
    CorePageListComponent,
    CoreOrgTreeComponent,
    CoreAccordionComponent,
    FormsModule
  ],
  exports: [
    ScreenLeftComponent
  ]
})

export class ScreenLeftModule { }