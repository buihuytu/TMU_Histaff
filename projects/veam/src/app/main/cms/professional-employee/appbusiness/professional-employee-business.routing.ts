import { Routes } from '@angular/router';

export const ProfessionalEmployeeBusinessRoutes: Routes = [
  {
    path: 'pe-capacity-framework',
    loadChildren: () => import('./pe-capacity-framework/pe-capacity-framework.module').then((m) => m.PeCapacityFrameworkModule),
  },
];