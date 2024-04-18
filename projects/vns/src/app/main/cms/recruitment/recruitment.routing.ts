import { Routes } from "@angular/router";
import { Error404Component } from "../../errors/404/error-404.component";

export const RecruitmentRoutes: Routes = [
  {
    path: "business",
    loadChildren: () => import("./appbusiness/recruitmentbusiness.module").then(m => m.RecruitmentBusinessModule),
  },
  {
    path: "**",
    component: Error404Component,
  },
];