import { Routes } from '@angular/router';

export const ProfessionalEmployeeListRoutes: Routes = [
  {
    path: 'hu-list-competency',
    loadChildren: () => import('./list-competency/list-competency.routes').then((m) => m.routes),
  },
  {
    path: "hu-competency-peroid",
    loadChildren: () => import('./hu-competency-peroid/hu-competency-peroid.routes').then(m => m.routes)
  }
];
