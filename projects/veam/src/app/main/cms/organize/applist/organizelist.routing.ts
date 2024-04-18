import { Routes } from "@angular/router";

export const OrganizeListRoutes: Routes = [
  {
    path: "company",
    loadChildren: () => import("./company/company.module").then(m => m.CompanyModule),
  },
  {
    path: "groupposition",
    loadChildren: () => import("./groupposition/groupposition.module").then(m => m.GroupPositionModule),
  },
  {
    path: 'org-hoang',
    loadChildren:() => import('./org-hoang/org-hoang.routes').then((m) => m.routes),
  }
];
