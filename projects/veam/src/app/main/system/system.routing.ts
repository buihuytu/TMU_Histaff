import { Routes } from "@angular/router";

export const SystemRoutes: Routes = [
  {
    path: "",
    redirectTo: "/sys/config/account",
    pathMatch: "full",
  },
];
