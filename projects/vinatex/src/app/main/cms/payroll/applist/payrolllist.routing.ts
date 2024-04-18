import { Routes } from '@angular/router';

export const PayrollListRoutes: Routes = [
  {
    path: 'salarytype',
    loadChildren: () =>
      import('./salarytype/salarytype.module').then((m) => m.SalaryTypeModule),
  },
  {
    path: 'listfund',
    loadChildren: () => import('./listfund/listfund.module').then((m) => m.ListfundModule),
  },
  
  {
    path:'phaseadvance',
    loadChildren:()=>import('./phaseadvance/phaseadvance.module').then((m)=>m.PhaseAdvanceModule),
  },
  {
    path:'periodtax',
    loadChildren:()=>import('./periodtax/periodtax.module').then((m)=>m.PeriodTaxModule),
  },
  {
    path:'listsalary',
    loadChildren:()=>import('./listsalary/listsalary.module').then((m)=>m.ListSalaryModule),
  },
  {
    path: 'listsalaries',
    loadChildren:()=>import('./list-salaries/list-salaries.module').then((m)=>m.ListSalariesModule)
  }
];
