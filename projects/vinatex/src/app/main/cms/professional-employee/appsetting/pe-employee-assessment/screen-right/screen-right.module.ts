import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenRightComponent } from './screen-right.component';
import { FormsModule } from '@angular/forms';
import { CoreAccordionComponent, CorePageListComponent, TranslatePipe } from 'ngx-histaff-alpha';
@NgModule({
  declarations: [
    ScreenRightComponent
  ],
  imports: [
    CommonModule,
    TranslatePipe,
    CorePageListComponent,
    CoreAccordionComponent,
    FormsModule
  ],
  exports: [
    ScreenRightComponent
  ]
})

export class ScreenRightModule { }