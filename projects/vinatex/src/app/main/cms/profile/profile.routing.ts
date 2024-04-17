import { Routes } from "@angular/router";
import { Error404Component } from "../../errors/404/error-404.component";

export const ProfileRoutes: Routes = [
  {
    path: "",
    redirectTo: "/cms/profile/setting/organization",
    pathMatch: "full",
  },
  {
    path: "list",
    loadChildren: () => import("./applist/applist.module").then(m => m.ProfileListModule),
  },
  {
    path: "setting",
    loadChildren: () => import("./appsetting/profilesetting.module").then(m => m.ProfileSettingModule),
  },
  {
    path: "business",
    loadChildren: () => import("./appbusiness/profilebusiness.module").then(m => m.ProfileBusinessModule),
  },
  {
    path: "**",
    component: Error404Component,
  },
];
