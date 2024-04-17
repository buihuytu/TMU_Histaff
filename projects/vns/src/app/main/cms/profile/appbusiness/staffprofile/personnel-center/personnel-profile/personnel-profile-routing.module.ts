import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonnelProfileComponent } from './personnel-profile.component';
import { BankInfoEditComponent } from './profile-info/bank-info/bank-info-edit/bank-info-edit.component';
import { BasicEditComponent } from './profile-info/basic/basic-edit/basic-edit.component';
import { CvEditComponent } from './profile-info/cv/cv-edit/cv-edit.component';
import { AdditionalInfoEditComponent } from './profile-info/additional-info/additional-info-edit/additional-info-edit.component';
import { PoliticalBackgroundEditComponent } from './profile-info/political-background/political-background-edit/political-background-edit.component';
import { PoliticalOrganizationEditComponent } from './profile-info/political-organization/political-organization-edit/political-organization-edit.component';
import { EducationEditComponent } from './profile-info/education/education-edit/education-edit.component';
import { ReferrerEditComponent } from './profile-info/referrer/referrer-edit/referrer-edit.component';
import { ContactEditComponent } from './profile-info/contact/contact-edit/contact-edit.component';
import { SituationEditComponent } from './profile-info/situation/situation-edit/situation-edit.component';
import { ConcurrentPositionsComponent } from './concurrent-positions/concurrent-positions.component';
import { ConcurrentPositionEditComponent } from './concurrent-positions/concurrent-position-edit/concurrent-position-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: PersonnelProfileComponent,
    children: [
      {
        path: 'bank-info-edit/:id',
        component: BankInfoEditComponent,
        outlet: "personnelProfileAux",
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'basic-edit/:id',
        component: BasicEditComponent,
        outlet: "personnelProfileAux",
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'cv-edit/:id',
        component: CvEditComponent,
        outlet: "personnelProfileAux",
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'additional-info-edit/:id',
        component: AdditionalInfoEditComponent,
        outlet: "personnelProfileAux",
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'political-background-edit/:id',
        component: PoliticalBackgroundEditComponent,
        outlet: "personnelProfileAux",
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'political-organization-edit/:id',
        component: PoliticalOrganizationEditComponent,
        outlet: "personnelProfileAux",
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'education-edit/:id',
        component: EducationEditComponent,
        outlet: "personnelProfileAux",
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'referrer-edit/:id',
        component: ReferrerEditComponent,
        outlet: "personnelProfileAux",
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'contact-edit/:id',
        component: ContactEditComponent,
        outlet: "personnelProfileAux",
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'referrer-edit/:id',
        component: ReferrerEditComponent,
        outlet: "personnelProfileAux",
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'situation-edit/:id',
        component: SituationEditComponent,
        outlet: "personnelProfileAux",
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path : ":id",
        component: ConcurrentPositionEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
      
      
    ]
  },
  
  

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnelProfileRoutingModule { }
