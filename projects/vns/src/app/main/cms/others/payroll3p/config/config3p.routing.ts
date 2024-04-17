import { Routes } from "@angular/router";
import { Error404Component } from "../../../../../main/errors/404/error-404.component";

export const Config3PRoutes: Routes = [
  {
    path: "**",
    component: Error404Component,
  },
];
