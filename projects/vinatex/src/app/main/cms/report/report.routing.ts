import { Routes } from "@angular/router";
import { Error404Component } from "../../errors/404/error-404.component";

export const ReportRoutes: Routes = [
  // {
  //   path: "",
  //   redirectTo: "/cms/report/list",
  //   pathMatch: "full",
  // },
  {
    path: "",
    loadChildren: () => import("./applist/report-view.module").then(m => m.ReportViewModule),
    pathMatch: "full",
  },
  {
    path: "**",
    component: Error404Component,
  },
];
