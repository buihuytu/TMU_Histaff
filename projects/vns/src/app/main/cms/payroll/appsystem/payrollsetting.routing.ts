import { Routes } from "@angular/router";

export const PayrollSettingRoutes: Routes = [
  {
    path: "payrollformula",
    //loadChildren: "./payrollformula/payrollformula.module#PayrollFormulaModule",
    loadChildren: () => import("./payrollformula/payrollformula.module").then(m => m.PayrollFormulaModule),
  },
];
