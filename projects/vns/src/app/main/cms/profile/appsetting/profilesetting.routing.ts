import { Routes } from "@angular/router";

export const ProfileSettingRoutes: Routes = [
  {
    path: "",
    redirectTo: "/cms/profile/setting/orgchart",
    pathMatch: "full",
  },
  // {
  //   path: "organization",
  //   //loadChildren: "./organization/organization.module#OrganizationModule",
  // },
  {
    path: "orgchart",
    //loadChildren: "./orgchart/orgchart.module#OrgChartModule",
    loadChildren: () => import("./orgchart/orgchart.module").then(m => m.OrgChartModule),
  },
];
