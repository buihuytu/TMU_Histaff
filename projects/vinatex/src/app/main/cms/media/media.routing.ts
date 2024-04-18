import { Routes } from "@angular/router";
import { Error404Component } from "../../errors/404/error-404.component";

export const MediaRoutes: Routes = [
  {
    path: "",
    redirectTo: "./survey/survey.module#SurveyModule",
    pathMatch: "full",
  },
  {
    path: "survey",
    //loadChildren: "./survey/survey.module#SurveyModule",
    loadChildren: () => import("./survey/survey.module").then(m => m.SurveyModule),
  },
  {
    path: "**",
    component: Error404Component,
  },
];
