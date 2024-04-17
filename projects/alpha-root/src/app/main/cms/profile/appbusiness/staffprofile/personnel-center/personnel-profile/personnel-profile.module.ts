import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonnelProfileRoutingModule } from './personnel-profile-routing.module';
import { PersonnelProfileComponent } from './personnel-profile.component';

import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { BasicComponent } from './profile-info/basic/basic.component';
import { CvComponent } from './profile-info/cv/cv.component';
import { AdditionalInfoComponent } from './profile-info/additional-info/additional-info.component';
import { PoliticalBackgroundComponent } from './profile-info/political-background/political-background.component';
import { PoliticalOrganizationComponent } from './profile-info/political-organization/political-organization.component';
import { EducationComponent } from './profile-info/education/education.component';
import { ReferrerComponent } from './profile-info/referrer/referrer.component';
import { BankInfoComponent } from './profile-info/bank-info/bank-info.component';
import { SituationComponent } from './profile-info/situation/situation.component';

import { ConcurrentPositionsComponent } from './concurrent-positions/concurrent-positions.component';
import  { RequiredPapersComponent } from './required-papers/required-papers.component'

import { BankInfoEditComponent } from './profile-info/bank-info/bank-info-edit/bank-info-edit.component';
import { BasicEditComponent } from './profile-info/basic/basic-edit/basic-edit.component';
import { CvEditComponent } from './profile-info/cv/cv-edit/cv-edit.component';
import { AdditionalInfoEditComponent } from './profile-info/additional-info/additional-info-edit/additional-info-edit.component';
import { PoliticalBackgroundEditComponent } from './profile-info/political-background/political-background-edit/political-background-edit.component';
import { PoliticalOrganizationEditComponent } from './profile-info/political-organization/political-organization-edit/political-organization-edit.component';
import { EducationEditComponent } from './profile-info/education/education-edit/education-edit.component';
import { ReferrerEditComponent } from './profile-info/referrer/referrer-edit/referrer-edit.component';
import { ContactComponent } from './profile-info/contact/contact.component';
import { ContactEditComponent } from './profile-info/contact/contact-edit/contact-edit.component';
import { SituationEditComponent } from './profile-info/situation/situation-edit/situation-edit.component';
import { ConcurrentPositionEditComponent } from './concurrent-positions/concurrent-position-edit/concurrent-position-edit.component';
import { CoreTabsComponent, CoreAccordionComponent, CorePageEditComponent, CorePageListComponent, CorePageViewComponent } from 'ngx-histaff-alpha';

@NgModule({
  declarations: [
    PersonnelProfileComponent,
    ProfileInfoComponent,
    BasicComponent,
    AdditionalInfoComponent,
    CvComponent,
    PoliticalBackgroundComponent,
    PoliticalOrganizationComponent,
    EducationComponent,
    BankInfoComponent,
    BankInfoEditComponent,
    ReferrerComponent,
    SituationComponent,
    ConcurrentPositionsComponent,
    RequiredPapersComponent,
    BasicEditComponent,
    CvEditComponent,
    AdditionalInfoEditComponent,
    PoliticalBackgroundEditComponent,
    PoliticalOrganizationEditComponent,
    EducationEditComponent,
    ReferrerEditComponent,
    ContactComponent,
    ContactEditComponent,
    SituationEditComponent,
    ConcurrentPositionEditComponent,
  ],
  imports: [
    CommonModule,
    PersonnelProfileRoutingModule,
    CoreTabsComponent,
    CoreAccordionComponent,
    CorePageViewComponent,
    CorePageEditComponent,
    CorePageListComponent,
  ]
})
export class PersonnelProfileModule { }
