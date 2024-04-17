import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RecruitmentLeftMenuComponent } from './recruitment-left-menu.component';
import { CoreFileUploaderComponent, CoreLineComponent, NormalizeHumanNamePipe, TranslatePipe } from 'ngx-histaff-alpha';

@NgModule({
  declarations: [
    RecruitmentLeftMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CoreFileUploaderComponent,
    CoreLineComponent,
    TranslatePipe,
    NormalizeHumanNamePipe,
  ],
  exports: [RecruitmentLeftMenuComponent]
})
export class RecruitmentLeftMenuModule { }
