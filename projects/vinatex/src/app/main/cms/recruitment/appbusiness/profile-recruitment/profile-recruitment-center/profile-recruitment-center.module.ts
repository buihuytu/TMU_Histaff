import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileRecruitmentCenterComponent } from './profile-recruitment-center.component';
import { ProfileRecruitmentCenterRoutingModule } from './profile-recruitment-center-routing.module';
import { RecruitmentLeftMenuModule } from './recruitment-left-menu/recruitment-left-menu.module';
import { CorePageHeaderComponent, CoreTabsComponent, TranslatePipe } from 'ngx-histaff-alpha';

@NgModule({
    declarations: [
        ProfileRecruitmentCenterComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        ProfileRecruitmentCenterRoutingModule,
        CorePageHeaderComponent,
        CoreTabsComponent,
        RecruitmentLeftMenuModule,
        TranslatePipe
    ]
})
export class ProfileRecruitmentCenterModule { }
