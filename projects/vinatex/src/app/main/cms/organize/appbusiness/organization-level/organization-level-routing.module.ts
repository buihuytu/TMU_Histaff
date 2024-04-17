import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OrganizationLevelComponent } from "./organization-level/organization-level.component";
import { OrganizationLevelEditComponent } from "./organization-level-edit/organization-level-edit.component";
import { CanDeactivateGuard } from "ngx-histaff-alpha";


const routes: Routes = [
  {
    path: "",
    component: OrganizationLevelComponent,
    children: [
      {
        path: ":id",
        component: OrganizationLevelEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationLevelRoutingModule { }
