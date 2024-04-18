import { Routes } from '@angular/router';

export const ProfessionalEmployeeSettingRoutes: Routes = [
  {
    path: 'pe-employee-assessment',
    loadChildren: () => import('./pe-employee-assessment/pe-employee-assessment.module').then((m) => m.PeEmployeeAssessmentModule),
  },
];