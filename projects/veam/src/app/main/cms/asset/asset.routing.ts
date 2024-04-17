import { Routes } from "@angular/router";
import { Error404Component } from "../../errors/404/error-404.component";

export const AssetRoutes: Routes = [
  {
    path: "list",
    loadChildren: () => import("./applist/asset-list.module").then(m => m.AssetListModule),
  },
  {
    path: "**",
    component: Error404Component,
  }
];