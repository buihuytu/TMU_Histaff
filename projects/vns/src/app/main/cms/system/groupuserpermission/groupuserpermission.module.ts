import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { GroupUserPermissionComponent } from "./groupuserpermission.component";
import { CanDeactivateGuard, CorePermissionComponent } from "ngx-histaff-alpha";

const routes: Routes = [
  {
    path: ":id",
    component: GroupUserPermissionComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: "",
    redirectTo: "0",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CorePermissionComponent
  ],
  declarations: [GroupUserPermissionComponent],
})
export class GroupUserPermissionModule {}
