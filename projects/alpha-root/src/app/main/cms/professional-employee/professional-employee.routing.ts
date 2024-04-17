import { Routes } from "@angular/router";
import { Error404Component } from "../../errors/404/error-404.component";

export const ProfessionalEmployeeRoutes: Routes = [
  {
    path: "business",
    loadChildren: () => import("./appbusiness/professional-employee-business.module").then(m => m.ProfessionalEmployeeBusinessModule),
  },
  {
    path: "list",
    loadChildren: () => import("./applist/professional-list.module").then(m => m.ProfessionalEmployeeListModule),
  },
  {
    path: "setting",
    loadChildren: () => import("./appsetting/professional-employee-setting.module").then(m => m.ProfessionalEmployeeSettingModule),
  },
  {
    path: "**",
    component: Error404Component,
  },
];