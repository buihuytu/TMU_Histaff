import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeFamilyPortalComponent } from './change-family-portal.component';
import { RouterModule } from '@angular/router';
import { ChangeInfoRoutingModule } from '../../staffprofile/change-info/change-info-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorePageHeaderComponent, CoreAccordionComponent, CoreFileUploaderComponent, CoreControlComponent, CoreButtonGroupVnsComponent } from 'ngx-histaff-alpha';

@NgModule({
  declarations: [
    ChangeFamilyPortalComponent
  ],
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
  ]
})
export class ChangeFamilyPortalModule { }
