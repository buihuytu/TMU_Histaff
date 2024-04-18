import { Routes } from "@angular/router";
import { Error404Component } from "../../errors/404/error-404.component";

export const InsuranceRoutes: Routes = [
  {
    path: "",
    redirectTo: "/cms/insurance/setting/organization",
    pathMatch: "full",
  },
  {
    path: "list",
    loadChildren: () => import("./applist/insurancelist.module").then(m => m.InsuranceListModule),
  },
  {
    path: "setting",
    loadChildren: () => import("./appsetting/insurancesetting.module").then(m => m.InsuranceSettingModule),
  },
  {
    path: "business",
    loadChildren: () => import("./appbusiness/insurancebusiness.module").then(m => m.InsuranceBusinessModule),
  },
];
