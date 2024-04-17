import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruitmentProfileRoutingModule } from './recruitment-profile-routing.module';
import { RecruitmentProfileComponent } from './recruitment-profile.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { CandidateCvComponent } from './profile-info/candidate-cv/candidate-cv.component';
import { LevelInfoComponent } from './profile-info/level-info/level-info.component';
import { WishComponent } from './profile-info/wish/wish.component';
import { InfoOtherComponent } from './profile-info/info-other/info-other.component';
import { CandidateCvEditComponent } from './profile-info/candidate-cv/candidate-cv-edit/candidate-cv-edit.component';
import { LevelInfoEditComponent } from './profile-info/level-info/level-info-edit/level-info-edit.component';
import { WishEditComponent } from './profile-info/wish/wish-edit/wish-edit.component';
import { InfoOtherEditComponent } from './profile-info/info-other/info-other-edit/info-other-edit.component';
import { CoreTabsComponent, CoreAccordionComponent, CorePageViewComponent, CorePageEditComponent, CorePageListComponent } from 'ngx-histaff-alpha';

@NgModule({
  declarations: [
    RecruitmentProfileComponent,
    ProfileInfoComponent,
    CandidateCvComponent,
    LevelInfoComponent,
    WishComponent,
    InfoOtherComponent,
    CandidateCvEditComponent,
    LevelInfoEditComponent,
    WishEditComponent,
    InfoOtherEditComponent
  ],
  imports: [
    CommonModule,
    RecruitmentProfileRoutingModule,
    CoreTabsComponent,
    CoreAccordionComponent,
    CorePageViewComponent,
    CorePageEditComponent,
    CorePageListComponent,
  ]
})
export class RecruitmentProfileModule { }
