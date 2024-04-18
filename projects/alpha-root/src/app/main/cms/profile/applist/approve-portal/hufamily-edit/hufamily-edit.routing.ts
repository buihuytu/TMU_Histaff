import { RouterModule, Routes } from "@angular/router";
import { HufamilyEditComponent } from "./hufamily-edit.component";
import { NgModule } from "@angular/core";
import { HufamilyEditDetailComponent } from "./hufamily-edit-detail/hufamily-edit-detail.component";
import { CanDeactivateGuard } from "ngx-histaff-alpha";

const routes: Routes = [
  {
    path: "",
    component: HufamilyEditComponent,
    children: [
      {
        path: ":id",
        component: HufamilyEditDetailComponent,
        outlet:"corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
  // {
  //   path: ":id",
  //   component: HufamilyEditDetailComponent,
  //   canActivate: [CanDeactivateGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HuFamilyEditRoutingModule { }