import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileRecruitmentCenterComponent } from './profile-recruitment-center.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: ProfileRecruitmentCenterComponent,
    canDeactivate: [CanDeactivateGuard],
    children: [
      {
        // RC_CANDIDATE_CV || RC_CANDIDATE
        // Hồ sơ ứng viên
        path: "candidate-profile",
        loadChildren: () => import('./recruitment-profile/recruitment-profile.module').then(m => m.RecruitmentProfileModule)
      },
      {
        // Quá trình công tác
        path: "candidate-profile",
        loadChildren: () => import('./recruitment-profile/recruitment-profile.module').then(m => m.RecruitmentProfileModule)
      },
      {
        // Người tham chiếu
        path: "candidate-profile",
        loadChildren: () => import('./recruitment-profile/recruitment-profile.module').then(m => m.RecruitmentProfileModule)
      },
      {
        path: "",
        redirectTo: "candidate-profile",
        pathMatch: "full"
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRecruitmentCenterRoutingModule { }
