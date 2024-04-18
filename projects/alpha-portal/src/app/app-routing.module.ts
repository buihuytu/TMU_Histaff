import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './screens/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: "home",
    loadChildren: () => import("./screens/home/home.module").then(m => m.HomeModule)
  },
  {
    path: "register-off",
    loadChildren: () => import("./screens/register-off/register-off.module").then(m => m.RegisterOffModule)
  },
  {
    path: "approve",
    loadChildren: () => import("./screens/approve/approve.module").then(m => m.ApproveModule)
  },
  {
    path: "time-table",
    loadChildren: () => import("./screens/time-table/time-table.module").then(m => m.TimeTableModule)
  },
  {
    path: "payroll-note",
    loadChildren: () => import("./screens/payroll-note/payroll-note.module").then(m => m.PayrollNoteModule)
  },
  {
    path: "profile",
    loadChildren: () => import("./screens/profile/profile.module").then(m => m.ProfileModule)
  },
  {
    path: "contract-list",
    loadChildren: () => import("./screens/contract-list/contract-list.module").then(m => m.ContractListModule)
  },
  {
    path: "notification",
    loadChildren: () => import("./screens/notification/notification.module").then(m => m.NotificationModule)
  },
  {
    path: "change-password",
    loadChildren: () => import("./screens/change-password/change-password.module").then(m => m.ChangePasswordModule)
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "**",
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }