import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangeInfoComponent } from './change-info.component';
import { ChangeInfoRoutingModule } from './change-info-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorePageHeaderComponent, CoreAccordionComponent, CoreControlComponent, CoreButtonGroupVnsComponent, CoreFileUploaderComponent } from 'ngx-histaff-alpha';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CorePageHeaderComponent,
    CoreAccordionComponent,
    FormsModule,
    ReactiveFormsModule,
    CoreFileUploaderComponent,
    CoreControlComponent,
    CoreButtonGroupVnsComponent,
    ChangeInfoRoutingModule
  ],
  declarations: [ChangeInfoComponent]
})
export class ChangeInfoModule { }
