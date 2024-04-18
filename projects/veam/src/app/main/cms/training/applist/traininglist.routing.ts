import { Routes } from '@angular/router';

export const TrainingListRoutes: Routes = [
  {
    path: 'tr-lecture',
    loadChildren: () => import('./tr-lecture/tr-lecture.module').then((m) => m.TrLectureModule)
  },
  {
    path:'tr-criteria',
    loadChildren:() => import('./tr-criteria/tr-criteria.routes').then((m) => m.routes),
  },
  {
    path:'tr-classification',
    loadChildren:() => import('./tr-classification/tr-classification.routes').then((m) => m.routes),
  },
  {
    path:'tr-setting-cri-course',
    loadChildren:() => import('./tr-setting-cri-course/tr-setting-cri-course.routes').then((m) => m.routes),
  },
];