import { Routes } from '@angular/router';

export const InsuranceBusinessRoutes: Routes = [
  {
    path: '',
    redirectTo: '/cms/insurance/business/ins-arising',
    pathMatch: 'full',
  },
  {
    path: 'ins-arising',
    loadChildren: () => import('./ins-arising/ins-arising.module').then((m) => m.InsArisingModule),
  },
  {
    path: 'insinformation',
    loadChildren: () => import('./insinformation/insinformation.module').then((m) => m.InsInformationModule),
  },
  {
    path: 'insgroup',
    loadChildren: () => import('./insgroup/insgroup.module').then((m) => m.InsGroupModule),
  },
  {
    path: 'insregimes',
    loadChildren: () => import('./ins-regimes/ins-regimes.module').then((m) => m.InsRegimesModule),
  },
  {
    path: 'insregimes-mng',
    loadChildren: () => import('./insregimes-mng/insregimes-mng.module').then((m) => m.InsRegimesMngModule),
  },
  {
    path: 'inschange',
    loadChildren: () => import('./inschange/inschange.module').then((m) => m.InsChangeModule),
  },
  {
    path: 'insregion',
    loadChildren: () => import('./insregion/insregion.module').then((m) => m.InsRegionModule),
  },
  {
    path: 'ins-list-program',
    loadChildren: () => import('./ins-list-program/ins-list-program.module').then((m) => m.InsListProgramModule),
  },
  {
    path: 'ins-health-insurance',
    loadChildren: () => import('./ins-health-insurance/ins-health-insurance.module').then((m) => m.InsHealthInsuranceModule),
  },
  {
    path: 'ins-list-contract',
    loadChildren: () => import('./ins-list-contract/ins-list-contract.module').then((m) => m.InsListContractModule),
  },
  {
    path: 'ins-maternity-mng',
    loadChildren: () => import('./ins-maternity-mng/ins-maternity-mng.routes').then((m) => m.routes),
  },
  {
    path: 'ins-totalsalary',
    loadChildren: () => import('./ins-total-salary/ins-total-salary.routes').then((m) => m.routes),
  },
];
