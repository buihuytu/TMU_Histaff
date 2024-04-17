import { Routes } from '@angular/router';

export const RecruitmentBusinessRoutes: Routes = [
  {
    path: 'rc-exams',
    loadChildren: () => import('./rc-exams/rc-exams.module').then((m) => m.RcExamsModule),
  },
  {
    path: 'rc-request',
    loadChildren: () => import('./rc-request/rc-request.module').then((m) => m.RcRequestModule),
  },
  {
    path: 'rc-year-plaining',
    loadChildren: () => import('./rc-hr-year-planing/rc-hr-year-plaining.module').then((m) => m.RcHrYearPlainingModule),
  },
  {
    path: 'rc-candidate',
    loadChildren: () => import('./profile-recruitment/profile-recruitment.module').then((m) => m.ProfileRecruitmentModule)
  }
];