import { Routes } from '@angular/router';

export const TrainingBusinessRoutes: Routes = [
  {
    path: 'center',
    loadChildren: () => import('./trainingcenter/trainingcenter.module').then((m) => m.TrainingCenterModule),
  },
  {
    path: 'trcourse',
    loadChildren: () =>
      import('./trainingcourse/trainingcourse.module').then((m) => m.TrainingCourseModule),
  },
  {
    path: 'tr-plan',
    loadChildren: () => import('./trplan/trplan.module').then((m) => m.TrplanModule)
  },
  {
    path: 'tr-program',
    loadChildren: () => import('./tr-program/tr-program.routes').then((m) => m.routes)
  },
  {
    path: 'tr-tranning-record',
    loadChildren: () => import('./tr-tranning-record/tr-tranning-record.module').then((m) => m.TrTranningRecordModule)
  },
  {
    path: 'tr-request',
    loadChildren:() => import('./tr-request/tr-request.routes').then((m) => m.routes),
  },
  {
    path: 'tr-reimbursement',
    loadChildren:() => import('./tr-reimbursement/tr-reimbursement.routes').then((m) => m.routes)
  },
  {
    path: 'tr-assessment-result',
    loadChildren:() => import('./tr-assessment-result/tr-assessment-result.module').then((m) => m.TrAssessmentResultModule),
  },
  {
    path: 'tr-request-year',
    loadChildren:() => import('./tr-request-year/tr-request-year.routes').then((m) => m.routes),
  }
];
