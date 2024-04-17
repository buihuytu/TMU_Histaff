import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProfileRecruitmentEditComponent } from './profile-recruitment-edit.component';
import { ProfileRecruitmentEditRoutingModule } from './profile-recruitment-edit-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorePageHeaderComponent, CoreAccordionComponent, CoreControlComponent, CoreButtonGroupVnsComponent, FullscreenModalLoaderComponent, CoreFileUploaderComponent, TranslatePipe } from 'ngx-histaff-alpha';

@NgModule({
    declarations: [ProfileRecruitmentEditComponent],
    imports: [
        CommonModule,
        RouterModule,
        ProfileRecruitmentEditRoutingModule,
        CorePageHeaderComponent,
        CoreAccordionComponent,
        FormsModule,
        TranslatePipe,
        ReactiveFormsModule,
        CoreFileUploaderComponent,
        CoreControlComponent,
        CoreButtonGroupVnsComponent,
        FullscreenModalLoaderComponent
    ]
})
export class ProfileRecruitmentEditModule { }
