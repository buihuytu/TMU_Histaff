import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecruitmentProfileComponent } from './recruitment-profile.component';
import { CandidateCvEditComponent } from './profile-info/candidate-cv/candidate-cv-edit/candidate-cv-edit.component';
import { LevelInfoEditComponent } from './profile-info/level-info/level-info-edit/level-info-edit.component';
import { WishEditComponent } from './profile-info/wish/wish-edit/wish-edit.component';
import { InfoOtherEditComponent } from './profile-info/info-other/info-other-edit/info-other-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: RecruitmentProfileComponent,
    children: [
      {
        path: 'candidate-cv-edit/:id',
        component: CandidateCvEditComponent,
        outlet: "candidateProfileAux",
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'level-info-edit/:id',
        component: LevelInfoEditComponent,
        outlet: "candidateProfileAux",
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'wish-edit/:id',
        component: WishEditComponent,
        outlet: "candidateProfileAux",
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'info-other-edit/:id',
        component: InfoOtherEditComponent,
        outlet: "candidateProfileAux",
        canDeactivate: [CanDeactivateGuard]
      },
    ]
  },
  
  

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruitmentProfileRoutingModule { }
