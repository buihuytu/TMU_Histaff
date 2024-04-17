import { Routes } from "@angular/router";
import { Error404Component } from "../../../../../main/errors/404/error-404.component";

export const Payroll3PListRoutes: Routes = [
  {
    path: "**",
    component: Error404Component,
  },
];
