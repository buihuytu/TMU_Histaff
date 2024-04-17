import { Routes } from '@angular/router';

export const PayrollBusinessRoutes: Routes = [
  {
    path: 'calculatepayroll',
    //loadChildren: "./calculatepayroll/calculatepayroll.module#CalculatePayrollModule",
    loadChildren: () => import('./calculatepayroll/calculatepayroll.module').then((m) => m.CalculatePayrollModule),
  },
  {
    path: 'calculatepayrollsub',
    //loadChildren: "./calculatepayrollsub/calculatepayrollsub.module#CalculatePayrollSubModule",
    loadChildren: () => import('./calculatepayrollsub/calculatepayrollsub.module').then((m) => m.CalculatePayrollSubModule),
  },
  {
    path: 'calculatepayroll-backdate',
    //loadChildren: "./calculatepayroll-backdate/calculatepayroll-backdate.module#CalculatePayrollBackdateModule",
    loadChildren: () => import('./calculatepayroll-backdate/calculatepayroll-backdate.module').then((m) => m.CalculatePayrollBackdateModule),
  },
  {
    path: 'payrollfund',
    //loadChildren: "./importmachines/importmachines.module#ImportMachinesModule",
    loadChildren: () => import('./payroll-fund/payroll-fund.module').then((m) => m.PayrollFundModule),
  },
  {
    path: 'salary-import',
    //loadChildren: "./declareleave/declareleave.module#DeclareleaveModule",
    loadChildren: () => import('./salary-import/salary-import.module').then((m) => m.SalaryImportModule),
  },
  {
    path: 'import-salary-backdate',
    loadChildren: () =>
      import('./import-salary-backdate/import-salary-backdate.module').then((m) => m.ImportSalaryBackdateModule),
  },
  {
    path: 'import-add',
    loadChildren: () => import('./salary-import-add/salary-import-add.module').then((m) => m.SalaryImportAddModule),
  },
  {
    path: 'import-monthly-tax',
    loadChildren: () => import('./import-monthly-tax/import-monthly-tax.module').then((m) => m.ImportMonthlyTaxModule),
  },
  {
    path: 'import-tax-annual',
    loadChildren: () => import('./import-tax-annual/import-tax-annual.module').then((m) => m.ImportTaxAnnualModule),
  },
  {
    path: 'calculate-tax-month',
    loadChildren: () =>
      import('./calculate-tax-month/calculate-tax-month.module').then((m) => m.CalculateTaxMonthModule),
  },
  {
    path: 'calculate-tax-year',
    loadChildren: () =>
      import('./calculate-tax-year/calculate-tax-year.module').then((m) => m.CalculateTaxYearlModule),
  },
  {
    path: 'authority-tax-year',
    loadChildren: () =>
      import('./authority-tax-year/authority-tax-year.module').then((m) => m.AuthorityTaxYearModule),
  },
];
